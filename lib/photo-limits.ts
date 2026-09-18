/** Shared browser/server limits. The compressed request stays below the hosting payload limit. */
export const MAX_PHOTOS = 3;
export const MAX_SOURCE_PHOTO_BYTES = 10 * 1024 * 1024;
export const MAX_PHOTO_BYTES = 700 * 1024;
export const MAX_CONTACT_BYTES = 3 * 1024 * 1024;
export const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
