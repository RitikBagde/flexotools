import { NextRequest, NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";
import { randomUUID } from "crypto";
import { Document, Packer, Paragraph } from "docx";

// pdf2json uses CommonJS, so we require it
// eslint-disable-next-line @typescript-eslint/no-var-requires
const PDFParser = require("pdf2json");

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  let tempFilePath: string | null = null;

  try {
    const format = request.nextUrl.searchParams.get("format") || "json";

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Invalid file type. Please upload a PDF file." },
        { status: 400 }
      );
    }

    const baseName =
      file.name.replace(/\.pdf$/i, "") || "document";

    // Save PDF to temp file
    const buffer = Buffer.from(await file.arrayBuffer());
    tempFilePath = join(tmpdir(), `${randomUUID()}.pdf`);
    await writeFile(tempFilePath, buffer);

    let pageCount = 0;

    // Extract text using pdf2json
    const extractedText: string = await new Promise((resolve, reject) => {
      const parser = new (PDFParser as any)();
      let fullText = "";

      parser.on("pdfParser_dataError", (err: any) => {
        reject(err.parserError || err);
      });

      parser.on("pdfParser_dataReady", (pdfData: any) => {
        try {
          pageCount = pdfData.Pages?.length || 0;

          pdfData.Pages.forEach((page: any) => {
            page.Texts.forEach((text: any) => {
              text.R.forEach((r: any) => {
                try {
                  const decoded = decodeURIComponent(r.T);
                  fullText += decoded + " ";
                } catch {
                  fullText += r.T + " ";
                }
              });
            });
            fullText += "\n\n";
          });

          resolve(fullText.trim());
        } catch (err) {
          reject(err);
        }
      });

      parser.loadPDF(tempFilePath as string);
    });

    // Cleanup temp file
    if (tempFilePath) {
      await unlink(tempFilePath).catch(() => {});
    }

    // 1. JSON (default)
    if (format === "json") {
      const avgCharsPerPage =
        extractedText.length / Math.max(pageCount, 1);
      const isLikelyScanned = avgCharsPerPage < 200;

      return NextResponse.json({
        success: true,
        data: {
          fileName: file.name,
          fileSize: file.size,
          numPages: pageCount,
          fullText: extractedText,
          extractedAt: new Date().toISOString(),
          isLikelyScanned,
        },
      });
    }

    // 2. TXT output
    if (format === "txt") {
      return new NextResponse(extractedText, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Content-Disposition": `attachment; filename="${baseName}.txt"`,
        },
      });
    }

    // 3. DOCX output (Word file)
    if (format === "docx") {
      const doc = new Document({
        sections: [
          {
            children: [new Paragraph(extractedText)],
          },
        ],
      });

      const docBuffer = await Packer.toBuffer(doc);

      return new NextResponse(docBuffer as any, {
        headers: {
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "Content-Disposition": `attachment; filename="${baseName}.docx"`,
        },
      });
    }

    // Unknown format
    return NextResponse.json(
      {
        error: "Unknown format. Use ?format=json | txt | docx",
      },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("PDF extraction error:", error);

    if (tempFilePath) {
      try {
        await unlink(tempFilePath);
      } catch {
        // ignore
      }
    }

    return NextResponse.json(
      {
        error: "Failed to extract text",
        details: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "PDF Text Extractor API running",
    usage: "POST a PDF with ?format=json | txt | docx",
  });
}
