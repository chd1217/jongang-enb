import { MAX_PHOTO_BYTES, MAX_SOURCE_PHOTO_BYTES, PHOTO_TYPES } from "./photo-limits";

/** Resize locally before upload; canvas export also removes GPS/EXIF metadata. */
export async function preparePhoto(file: File): Promise<File> {
  if (!(PHOTO_TYPES as readonly string[]).includes(file.type)) {
    throw new Error("JPG, PNG, WEBP 사진만 첨부할 수 있습니다. HEIC 사진은 JPG로 변환해 주십시오.");
  }
  if (!file.size || file.size > MAX_SOURCE_PHOTO_BYTES) {
    throw new Error("사진은 원본 1장당 10MB 이하로 선택해 주십시오.");
  }
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    const ratio = Math.min(1, 1600 / Math.max(img.naturalWidth, img.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(img.naturalWidth * ratio));
    canvas.height = Math.max(1, Math.round(img.naturalHeight * ratio));
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("사진을 준비하지 못했습니다. 다른 사진을 선택해 주십시오.");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    for (const quality of [0.82, 0.68, 0.5]) {
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
      if (blob && blob.size <= MAX_PHOTO_BYTES) {
        return new File([blob], `${file.name.replace(/\.[^.]+$/, "").slice(0, 80)}.jpg`, { type: "image/jpeg" });
      }
    }
    throw new Error("사진 용량을 줄이지 못했습니다. 더 작은 사진을 선택해 주십시오.");
  } finally {
    URL.revokeObjectURL(url);
  }
}
