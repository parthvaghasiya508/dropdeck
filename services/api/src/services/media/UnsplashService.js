import axios from "axios";
import config from "../../config.js";
import { logger } from "../../util/logger";

const { serviceUrlBase, accessKey } = config.services.unsplash;

export const UnsplashService = {

  /**
   * Search Unsplash and return a promise with the results.
   *
   * @param query search query.
   * @returns {*}
   */
  search: (query, page = 1, perPage = 18) => axios({
    method: "GET",
    url: `${serviceUrlBase}/search/photos?query=${query}&per_page=${perPage}&orientation=landscape&page=${page}`,
    headers: {
      Authorization: `Client-ID ${accessKey}`,
      "Content-Type": "application/json",
    },
  }),

  /**
   * Trigger an event endpoint to increment the number of downloads the given set of photos have.
   *
   * @param urls list of URLs to trigger download events for.
   * @returns {*}
   */
  trackDownload: (urls) => Promise.all(
    urls.map((url) => axios({
      method: "GET",
      url,
      headers: {
        Authorization: `Client-ID ${accessKey}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        logger.debug(`Tracked a download event for ${url}`);
        return response;
      })
      .catch((e) => {
        logger.error(`Error when tracking a download event for ${url}`, e);
      }))
  ),

};
