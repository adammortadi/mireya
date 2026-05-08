import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const contentTypes: Record<string, string> = {
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path: segments } = await params;
  const uploadsRoot = path.resolve(process.cwd(), "public", "uploads");
  const filePath = path.resolve(uploadsRoot, ...segments);

  if (!filePath.startsWith(`${uploadsRoot}${path.sep}`)) {
    return new NextResponse("Not found", { status: 404 });
  }

  try {
    const file = await readFile(filePath);
    return new NextResponse(file, {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Type": contentTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
