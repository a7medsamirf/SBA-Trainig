import { ENDPOINT } from "@/constant";
import { fetcher } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const fileId = req.nextUrl.searchParams.get("fileId");

  if (!fileId) {
    return new Response('Missing "fileId" query parameter', { status: 400 });
  }

  try {
    // Step 1: Fetch metadata (to get the content type)
    const metaRes = await fetcher({
      url: "file url",
    });

    if (!metaRes.ok) {
      const errorText = await metaRes.text();
      console.error("🚀 ~ GET ~ metaRes error:", {
        status: metaRes.status,
        statusText: metaRes.statusText,
        errorText,
      });

      return NextResponse.json(
        {
          message: "Failed to fetch file metadata",
          status: metaRes.status,
          details: errorText,
        },
        {
          status: metaRes.status,
        }
      );
    }

    const metaDataResponse = await metaRes.json();
    const metaData = metaDataResponse?.data;

    if (!metaData) {
      return NextResponse.json(
        {
          message: "No metadata found for file",
          fileId,
        },
        { status: 404 }
      );
    }

    const newExtention = metaData.fileExtention.replace(".", "");

    // Map file extensions to proper MIME types
    const getMimeType = (extension: string): string => {
      const mimeTypes: Record<string, string> = {
        // Images
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        gif: "image/gif",
        webp: "image/webp",
        svg: "image/svg+xml",
        bmp: "image/bmp",
        ico: "image/x-icon",

        // Documents
        pdf: "application/pdf",
        doc: "application/msword",
        docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        xls: "application/vnd.ms-excel",
        xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ppt: "application/vnd.ms-powerpoint",
        pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",

        // Text
        txt: "text/plain",
        html: "text/html",
        css: "text/css",
        js: "application/javascript",
        json: "application/json",
        xml: "application/xml",

        // Video
        mp4: "video/mp4",
        avi: "video/x-msvideo",
        mov: "video/quicktime",
        wmv: "video/x-ms-wmv",

        // Audio
        mp3: "audio/mpeg",
        wav: "audio/wav",
        ogg: "audio/ogg",

        // Archives
        zip: "application/zip",
        rar: "application/x-rar-compressed",
        "7z": "application/x-7z-compressed",
      };

      return mimeTypes[extension.toLowerCase()] || "application/octet-stream";
    };

    const contentType = getMimeType(newExtention);

    // Step 2: Fetch the actual file
    const fileRes = await fetcher({
      url: "file url",
    });

    if (!fileRes.ok) {
      const errorText = await fileRes.text();
      console.error("🚀 ~ GET ~ fileRes error:", {
        status: fileRes.status,
        statusText: fileRes.statusText,
        errorText,
      });

      return NextResponse.json(
        {
          message: "Failed to fetch file data",
          status: fileRes.status,
          details: errorText,
        },
        { status: fileRes.status }
      );
    }

    const buffer = await fileRes.arrayBuffer();

    // For images, we can omit Content-Disposition to let browser handle it naturally
    const isImage = contentType.startsWith("image/");

    const headers: Record<string, string> = {
      "Content-Type": contentType,
      "Cache-Control": "no-store",
      "Content-Length": buffer.byteLength.toString(),
    };

    // Only add Content-Disposition for non-images or when specifically needed
    if (!isImage) {
      headers["Content-Disposition"] = `inline; filename="${
        metaData.fileName || `file-${fileId}.${newExtention}`
      }"`;
    }

    return new Response(buffer, { headers });
  } catch (error) {
    console.error("🚀 ~ GET ~ Proxy error:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
        fileId,
      },
      { status: 500 }
    );
  }
}
