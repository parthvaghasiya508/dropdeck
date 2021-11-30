import axios from "axios";
import { config } from "../../config";
import { logger } from "../../utils/logger";

export const DeckService = {

  get: async (id, headers) => {
    const serviceUrl = `${config.api.host}/play/${id}`;
    logger.debug(`Requesting ${serviceUrl}`);
    return axios({
      method: "get",
      url: serviceUrl,
      withCredentials: true,
      headers,
    })
      .then((payload) => Promise.resolve(payload.data))
      .catch((e) => {
        logger.error(`Error when fetching deck ${id} (${e.response?.statusText})`);
      });
  }
};
