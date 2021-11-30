import { apiHost } from "../../../../../../../../../../App";
import { FROM_UNSPLASH } from "../components/ImageEditorElement";
import { FROM_UPLOAD } from "./insertImage";
import { downloadUrl } from "./downloadUrl";

const IMAGE_API_PREFIX = '/assets';

export const getImageUrl = (node, deckId, thumbnail = false) => {
  let url;
  if (node === undefined || node.settings === undefined) {
    return undefined;
  }
  const { settings } = node;
  const { from } = settings;
  if (settings.url) {
    url = settings.url;
  } else if (deckId && settings.name && from === FROM_UPLOAD) {
    url = downloadUrl(deckId, settings.name);
  }

  // Thumbnails
  if (thumbnail) {
    if (url !== undefined && from === FROM_UNSPLASH) {
      url = `${url}&crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100`;
    } else if (settings.thumbnail) {
      url = settings.thumbnail;
    }
  }

  // Legacy: Interpret relative URLs relative to the API service.
  if (url !== undefined && (typeof url === 'string') && url.startsWith(`${IMAGE_API_PREFIX}/`)) {
    url = `${apiHost()}${url}`;
  }

  return url;
};

export const getLabel = (node) => {
  if (node === undefined || node.settings === undefined) {
    return undefined;
  }
  const { settings } = node;
  if (settings.label) {
    return settings.label;
  }
  return 'image.png';
};

export const getColors = (node) => {
  if (node === undefined || node.settings === undefined) {
    return undefined;
  }
  const { settings } = node;
  let colors = {};
  if (settings.bgColor) {
    colors.bgColor = settings.bgColor;
  }
  if (settings.colors) {
    colors = { ...colors, ...settings.colors };
  }
  return colors;
};

export const getIsWhiteOnTransparent = (node) => {
  if (node === undefined || node.settings === undefined) {
    return undefined;
  }
  const { settings } = node;
  if (settings.whiteOnTransparent) {
    return settings.whiteOnTransparent;
  }
  return false;
};
