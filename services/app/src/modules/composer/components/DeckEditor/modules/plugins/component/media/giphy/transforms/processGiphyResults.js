import { giphyBuilder } from "../giphyBuilder";

const FROM_GIPHY = "giphy";

export const processGiphyResults = (results, query) => Promise.all(results.map(async (image) => giphyBuilder({
  from: FROM_GIPHY,
  url: image.images['480w_still'].url,
  gif: image.images.downsized.url,
  description: image.alt_description,
  label: query,
  swatch: [],
})));
