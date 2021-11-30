import { IMAGE } from "../type";
import { browserExtractImageColorsWorker } from "../../../../../../../../../../common/slide/analysis/analyzers/ColorSwatch/BrowserExtractImageColors.worker";

const FROM_UNSPLASH = "unsplash";

export const processUnsplashResults = (results, query) => Promise.all(results.map(async (img) => ({
  type: IMAGE,
  settings: {
    from: FROM_UNSPLASH,
    url: img.urls.raw,
    links: img.links,
    preview: img.urls.small,
    title: img.description,
    description: img.alt_description,
    label: query,
    swatch: await browserExtractImageColorsWorker(img.urls.small),
    author: {
      name: img.user.name,
      url: img.user.url,
      profile_image: img.user.profile_image
    }
  },
  children: [{ text: '' }],
})));
