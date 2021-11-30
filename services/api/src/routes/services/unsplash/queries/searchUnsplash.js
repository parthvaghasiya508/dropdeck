import { logger } from "../../../../util/logger";
import { UnsplashService } from "../../../../services/media/UnsplashService";

/*
 * Only return the following fields in the payload to the client:
 * - id
 * - urls
 * - alt_description
 * - user.username
 * - user.name
 * - user.url
 * - user.profile_image
 */
const mapToImage = (img, label) => ({
  id: img.id,
  urls: img.urls,
  alt_description: img.alt_description,
  links: {
    download_location: img.links?.download_location,
  },
  label,
  user: {
    username: img.user?.username,
    name: img.user?.name,
    url: img.user?.portfolio_url || img.user?.links.self,
    profile_image: img.user?.profile_image?.large,
  }
});

export const searchUnsplash = (query, page, perPage) => {
  logger.debug(`Searching for ${query}`);
  const t0 = new Date().getTime();
  if (query !== undefined && query !== null && query.length > 0) {
    return UnsplashService.search(query, page, perPage)
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
      })
      .then((response) => {
        const t1 = new Date().getTime();
        logger.debug(`Searching Unsplash took ${t1 - t0} ms`);
        return response.results.map((img) => mapToImage(img, query));
      })
      .catch((e) => {
        logger.error(e);
      });
  }
  return new Promise((resolve) => resolve());
};
