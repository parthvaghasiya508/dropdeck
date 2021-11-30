import { WebClient } from "@slack/web-api";
import config from "../../../config";
import { logger } from "../../logger";

const web = new WebClient(config.services.slack.token);
const { label } = config.services.slack;

/**
 * Post a message to a Slack channel.
 *
 * @param channel
 * @param text
 */
export const slack = (channel, text) => {
  (async () => {
    try {
      await web.chat.postMessage({
        channel, text: (label !== undefined && label.length > 0) ? `${text} [${label}]` : text,
      });
    } catch (error) {
      logger.warn(error);
    }

    logger.debug('Message posted!');
  })();
};
