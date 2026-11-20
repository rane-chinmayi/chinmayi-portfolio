import fs from "node:fs";

export interface ImageSize {
  width: number;
  height: number;
}

/**
 * Pixel size of a PNG, JPEG, GIF or WebP file, read from its header, so
 * next/image can reserve the right space (no layout shift) without a
 * dependency. Returns null for anything else. Build-time/server-only.
 */
export function readImageSize(file: string): ImageSize | null {
  let buf: Buffer;
  try {
    buf = fs.readFileSync(file);
  } catch {
    return null;
  }
  if (buf.length < 30) return null;

  // PNG: IHDR holds big-endian width/height at bytes 16 and 20.
  if (buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }

  // GIF: little-endian width/height at bytes 6 and 8.
  if (buf.toString("ascii", 0, 3) === "GIF") {
    return { width: buf.readUInt16LE(6), height: buf.readUInt16LE(8) };
  }

  // JPEG: walk the segments to the first start-of-frame marker.
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let offset = 2;
    while (offset + 9 < buf.length) {
      if (buf[offset] !== 0xff) {
        offset += 1;
        continue;
      }
      const marker = buf[offset + 1];
      const isFrame =
        marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
      if (isFrame) {
        return { height: buf.readUInt16BE(offset + 5), width: buf.readUInt16BE(offset + 7) };
      }
      offset += 2 + buf.readUInt16BE(offset + 2);
    }
    return null;
  }

  // WebP: lossy (VP8 ), lossless (VP8L) or extended (VP8X).
  if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const kind = buf.toString("ascii", 12, 16);
    if (kind === "VP8 ") {
      return {
        width: buf.readUInt16LE(26) & 0x3fff,
        height: buf.readUInt16LE(28) & 0x3fff,
      };
    }
    if (kind === "VP8L") {
      const bits = buf.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
    if (kind === "VP8X") {
      return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
    }
  }

  return null;
}
