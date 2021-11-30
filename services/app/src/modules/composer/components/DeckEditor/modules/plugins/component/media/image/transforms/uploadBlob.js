import { uploadFiles } from "./uploadFiles";

const fileSuffix = (mimeType) => {
  if (mimeType === undefined) {
    return "tiff";
  }
  switch (mimeType.toLowerCase()) {
    case "image/jpeg": return "jpeg";
    case "image/png": return "png";
    case "image/tiff": return "tiff";
    case "image/gif": return "gif";
  }
  return "png";
};

export async function uploadBlob(deckId, blobUrl, process) {
  const blob = await fetch(blobUrl).then((r) => r.blob());
  const files = [new File([blob], `screengrab.${fileSuffix(blob.type)}`)];
  uploadFiles(deckId, files, { process });
}
