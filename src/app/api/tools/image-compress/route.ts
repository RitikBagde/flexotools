import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export const runtime = "nodejs"; // sharp is Node-only

type OutputFormat = "jpeg" | "png" | "webp" | "avif";

function getField(formData: FormData, name: string): string {
  const v = formData.get(name);
  if (v == null) return "";
  if (typeof v === "string") return v;
  return "";
}

async function compressToTargetSize(
  input: Buffer,
  format: OutputFormat,
  targetBytes: number
): Promise<Buffer> {
  let quality = 90;
  const minQuality = 40;
  let buffer: Buffer;

  const encode = async (q: number) => {
    if (format === "png") {
      return sharp(input).png({ quality: q }).toBuffer();
    }
    if (format === "webp") {
      return sharp(input).webp({ quality: q }).toBuffer();
    }
    if (format === "avif") {
      return sharp(input).avif({ quality: q }).toBuffer();
    }
    return sharp(input).jpeg({ quality: q }).toBuffer();
  };

  buffer = await encode(quality);

  if (buffer.length <= targetBytes) return buffer;

  while (buffer.length > targetBytes && quality > minQuality) {
    quality -= 5;
    buffer = await encode(quality);
  }

  return buffer;
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

    // Decide base format from input
    const defaultFormat: OutputFormat =
      metadata.format === "png" ? "png" : "jpeg";

    // Final output format
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

    let pipeline = sharp(input);

    let width: number | undefined = widthField > 0 ? widthField : undefined;
    let height: number | undefined = heightField > 0 ? heightField : undefined;
    let quality = qualityField || 80;

    if (mode === "preset") {
      if (preset === "small") {
        width = 1280;
        height = undefined;
        quality = 60;
      } else if (preset === "medium") {
        width = 1920;
        height = undefined;
        quality = 75;
      } else if (preset === "large") {
        width = undefined;
        height = undefined;
        quality = 85;
      }
    }

    if (width || height) {
      pipeline = pipeline.resize({
        width,
        height,
        fit: "inside",
      });
    }

    let outputBuffer: Buffer;

    if (mode === "target" && targetSizeKBField > 0) {
      const targetBytes = targetSizeKBField * 1024;
      const resizedInput = await pipeline.toBuffer();
      outputBuffer = await compressToTargetSize(
        resizedInput,
        finalFormat,
        targetBytes
      );
    } else {
      if (finalFormat === "png") {
        outputBuffer = await pipeline.png({ quality }).toBuffer();
      } else if (finalFormat === "webp") {
        outputBuffer = await pipeline.webp({ quality }).toBuffer();
      } else if (finalFormat === "avif") {
        outputBuffer = await pipeline.avif({ quality }).toBuffer();
      } else {
        outputBuffer = await pipeline.jpeg({ quality }).toBuffer();
      }
    }

    const contentType =
      finalFormat === "png"
        ? "image/png"
        : finalFormat === "webp"
        ? "image/webp"
        : finalFormat === "avif"
        ? "image/avif"
        : "image/jpeg";

    const uint8 = new Uint8Array(outputBuffer);
    return new NextResponse(uint8, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": outputBuffer.length.toString(),
        "Content-Disposition": 'inline; filename="compressed.' + finalFormat + '"',
      },
    });
  } catch (outerErr) {
    console.error("image-compress route error", outerErr);
    return NextResponse.json(
      { error: "server setup error" },
      { status: 500 }
    );
  }
}
