export type FileType = {
  [mimeType: string]: string;
};

export const pdfExtensions: FileType = {
  "application/pdf": ".pdf",
};

export const imageExtensions: FileType = {
  "image/jpeg": ".jpeg",
  "image/jpg": ".jpg",
  "image/png": ".png",
};

export const extensions: FileType = { ...pdfExtensions, ...imageExtensions };
