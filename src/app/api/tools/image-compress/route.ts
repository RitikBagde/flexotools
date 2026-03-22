import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export const runtime = "nodejs";

type OutputFormat = "jpeg" | "png" | "webp" | "avif";

function getField(formData: FormData, name: string): string {
  const v = formData.get(name);
  if (v == null) return "";
  if (typeof v === "string") return v;
  return "";
}

async function encodeBuffer(
  input: Buffer,
  format: OutputFormat,
  quality: number
): Promise<Buffer> {
  // PNG: use both compressionLevel + effort, and also try converting to
  // a palette for huge reductions on graphics/logos.
  if (format === "png") {
    return sharp(input)
      .png({ compressionLevel: 9, effort: 10, adaptiveFiltering: true })
      .toBuffer();
  }
  if (format === "webp") return sharp(input).webp({ quality }).toBuffer();
  if (format === "avif") return sharp(input).avif({ quality, effort: 4 }).toBuffer();
  return sharp(input).jpeg({ quality, mozjpeg: true }).toBuffer();
}

async function compressToTargetSize(
  input: Buffer,
  format: OutputFormat,
  targetBytes: number
): Promise<Buffer> {
  // PNG is lossless — we can't arbitrarily reduce it via quality.
  // Resize-down approach: shrink dimensions until under target.
  if (format === "png") {
    let buf = await encodeBuffer(input, "png", 80);
    if (buf.length <= targetBytes) return buf;

    // Progressive downscale
    const meta = await sharp(input).metadata();
    let scale = 0.9;
    while (buf.length > targetBytes && scale > 0.2) {
      const w = Math.max(1, Math.round((meta.width ?? 800) * scale));
      buf = await sharp(input)
        .resize({ width: w, withoutEnlargement: true })
        .png({ compressionLevel: 9, effort: 10 })
        .toBuffer();
      scale -= 0.1;
    }
    return buf;
  }

  // Lossy formats: binary-search quality between 10–90
  let lo = 10,
    hi = 90,
    best: Buffer = await encodeBuffer(input, format, 80);

  // Fast path: already under target at max quality
  const hiBuffer = await encodeBuffer(input, format, hi);
  if (hiBuffer.length <= targetBytes) return hiBuffer;

  // Binary search
  while (lo <= hi) {
    const mid = Math.round((lo + hi) / 2);
    const buf = await encodeBuffer(input, format, mid);
    if (buf.length <= targetBytes) {
      best = buf;
      lo = mid + 1; // try higher quality
    } else {
      hi = mid - 1; // need lower quality
    }
  }

  // If even quality=10 is too large, shrink dimensions as last resort
  const minBuf = await encodeBuffer(input, format, 10);
  if (minBuf.length > targetBytes) {
    const meta = await sharp(input).metadata();
    let scale = 0.8;
    let buf = minBuf;
    while (buf.length > targetBytes && scale > 0.15) {
      const w = Math.max(1, Math.round((meta.width ?? 800) * scale));
      const resized = await sharp(input)
        .resize({ width: w, withoutEnlargement: true })
        .toBuffer();
      buf = await encodeBuffer(resized, format, 10);
      if (buf.length <= targetBytes) return buf;
      scale -= 0.1;
    }
    return buf; // best effort
  }

  return best;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const fileEntry = formData.get("file");
    if (!fileEntry || typeof fileEntry === "string") {
      return NextResponse.json(
        { error: 'No file uploaded (field name should be "file")' },
        { status: 400 }
      );
    }

    const file = fileEntry as File;
    const mode = getField(formData, "mode") as "preset" | "target" | "custom";
    const preset = getField(formData, "preset") as "small" | "medium" | "large";
    const outputFormatField = getField(formData, "outputFormat") as
      | "auto"
      | OutputFormat
      | "";

    const qualityField = parseInt(getField(formData, "quality") || "80", 10);
    const widthField = parseInt(getField(formData, "width") || "0", 10);
    const heightField = parseInt(getField(formData, "height") || "0", 10);
    const targetSizeKBField = parseInt(
      getField(formData, "targetSizeKB") || "0",
      10
    );

    const arrayBuffer = await file.arrayBuffer();
    const input = Buffer.from(arrayBuffer);
    const metadata = await sharp(input).metadata();

    // Determine output format
    const defaultFormat: OutputFormat =
      metadata.format === "png" ? "png" : "jpeg";
    let finalFormat: OutputFormat;
    if (
      outputFormatField &&
      outputFormatField !== "auto" &&
      ["jpeg", "png", "webp", "avif"].includes(outputFormatField)
    ) {
      finalFormat = outputFormatField as OutputFormat;
    } else {
      finalFormat = defaultFormat;
    }

    // Resolve dimensions and quality per mode
    let resizeWidth: number | undefined;
    let resizeHeight: number | undefined;
    let quality = 80;

    if (mode === "preset") {
      if (preset === "small") {
        resizeWidth = 1280;
        quality = 60;
      } else if (preset === "medium") {
        resizeWidth = 1920;
        quality = 75;
      } else {
        // large: no resize, just quality reduction
        quality = 85;
      }
    } else if (mode === "custom") {
      resizeWidth = widthField > 0 ? widthField : undefined;
      resizeHeight = heightField > 0 ? heightField : undefined;
      quality = isNaN(qualityField) || qualityField <= 0 ? 80 : qualityField;
    } else if (mode === "target") {
      // Optional: user may have also set width/height in the form
      resizeWidth = widthField > 0 ? widthField : undefined;
      resizeHeight = heightField > 0 ? heightField : undefined;
    }

    // Build resize pipeline if needed
    let pipeline = sharp(input);
    if (resizeWidth || resizeHeight) {
      pipeline = pipeline.resize({
        width: resizeWidth,
        height: resizeHeight,
        fit: "inside",
        withoutEnlargement: true,
      });
    }

    let outputBuffer: Buffer;

    if (mode === "target" && targetSizeKBField > 0) {
      const targetBytes = targetSizeKBField * 1024;
      // Apply resize first, then compress to target
      const resizedInput = await pipeline.toBuffer();
      outputBuffer = await compressToTargetSize(resizedInput, finalFormat, targetBytes);
    } else {
      // Preset and custom modes
      if (finalFormat === "png") {
        outputBuffer = await pipeline.png({ compressionLevel: 9, adaptiveFiltering: true }).toBuffer();
      } else if (finalFormat === "webp") {
        outputBuffer = await pipeline.webp({ quality }).toBuffer();
      } else if (finalFormat === "avif") {
        outputBuffer = await pipeline.avif({ quality, effort: 4 }).toBuffer();
      } else {
        outputBuffer = await pipeline.jpeg({ quality, mozjpeg: true }).toBuffer();
      }
    }

    const contentTypeMap: Record<OutputFormat, string> = {
      png: "image/png",
      webp: "image/webp",
      avif: "image/avif",
      jpeg: "image/jpeg",
    };

    const uint8 = new Uint8Array(outputBuffer);
    return new NextResponse(uint8, {
      status: 200,
      headers: {
        "Content-Type": contentTypeMap[finalFormat],
        "Content-Length": outputBuffer.length.toString(),
        "Content-Disposition": `inline; filename="compressed.${finalFormat}"`,
      },
    });
  } catch (err) {
    console.error("image-compress route error", err);
    return NextResponse.json({ error: "server setup error" }, { status: 500 });
  }
}