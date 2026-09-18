import sharp from "sharp";
import { MAX_PHOTOS, MAX_PHOTO_BYTES, PHOTO_TYPES } from "./photo-limits";

export type InquiryPhoto = { filename: string; content: Buffer; contentType: "image/jpeg" };

/** Decode actual bytes, reject disguised/non-image files, normalize and strip metadata. */
export async function validatePhotos(files: File[]): Promise<InquiryPhoto[]> {
  if (files.length > MAX_PHOTOS) throw new Error(`사진은 최대 ${MAX_PHOTOS}장까지 첨부할 수 있습니다.`);
  const photos: InquiryPhoto[] = [];
  for (const [index, file] of files.entries()) {
    if (!(PHOTO_TYPES as readonly string[]).includes(file.type) || !file.size || file.size > MAX_PHOTO_BYTES) {
      throw new Error("첨부 사진의 형식 또는 용량이 올바르지 않습니다. 사진을 다시 선택해 주십시오.");
    }
    try {
      const source = sharp(Buffer.from(await file.arrayBuffer()), { limitInputPixels: 24_000_000 });
      const metadata = await source.metadata();
      if (!["jpeg", "png", "webp"].includes(metadata.format || "") || (metadata.pages || 1) > 1) throw new Error("format");
      const content = await source.rotate().resize(1600, 1600, { fit: "inside", withoutEnlargement: true })
        .flatten({ background: "#fff" }).jpeg({ quality: 78 }).toBuffer();
      if (content.length > MAX_PHOTO_BYTES) throw new Error("size");
      photos.push({ filename: `photo-${index + 1}.jpg`, content, contentType: "image/jpeg" });
    } catch {
      throw new Error("열 수 없는 사진이 포함되어 있습니다. JPG, PNG, WEBP 사진을 다시 선택해 주십시오.");
    }
  }
  return photos;
}
