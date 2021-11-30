import { isMissingProtocol, isURLWithoutProtocol } from "../../../deserializers/url/transforms/isUrl";

export const formatLinkUrl = (url) => {
  if (!url || url === null) {
    return '';
  }
  if (isMissingProtocol(url)) {
    return `https://${url}`;
  }
  return url;
};
