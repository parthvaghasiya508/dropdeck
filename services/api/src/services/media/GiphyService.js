import axios from "axios";
import config from "../../config.js";

const { serviceUrlBase, accessKey } = config.services.giphy;

export const GiphyService = {
  /**
   * Search Unsplash and return a promise with the results.
   *
   * @param query search query.
   * @returns {*}
   */
  search: (query, page = 1, perPage = 18) => axios({
    method: "GET",
    url: `${serviceUrlBase}/v1/gifs/search?api_key=${accessKey}&&q=${query}&limit=${perPage}&orientation=landscape&offset=${(page - 1) * perPage}`,
    headers: {
      Authorization: `Client-ID ${accessKey}`,
      "Content-Type": "application/json",
    },
  }),
};
