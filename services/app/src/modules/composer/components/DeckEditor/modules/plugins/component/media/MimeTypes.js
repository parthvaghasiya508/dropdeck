export default class MimeTypes {

  constructor(contentType) {
    this.contentType = contentType;
  }

  mimeType = {
    PNG: "image/png",
    JPEG: "image/jpeg",
    WEBP: "image/webp",
    GIF: "image/gif",
    MP4: "video/mp4",
    MPEG: "video/mpeg",
    TEXT_HTML: "text/html",
  };

  isImage = () => this.contentType === this.mimeType.PNG ||
    this.contentType === this.mimeType.JPEG ||
    this.contentType === this.mimeType.GIF ||
    this.contentType === this.mimeType.WEBP;

  isVideo = () => this.contentType === this.mimeType.MP4 || this.contentType === this.mimeType.MPEG;

  isTextHtml = () => {
    if (!this.contentType) return false;

    if (this.canSplit(this.contentType, ";")) {
      const [first ,] = this.contentType.split(";");
      this.contentType = first;
    }

    return this.contentType === this.mimeType.TEXT_HTML;
  };

  /**
   *
   * Helper function that determines if an input can be split by a given delimiter
   * @param input
   * @param delimeter
   * @returns {Boolean}
   *
   */
  canSplit = (input, delimeter) => {
    const [, output] = input.split(delimeter) || "";
    return output !== undefined;
  };
}
