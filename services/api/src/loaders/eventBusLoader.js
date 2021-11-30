import config from "../config";
import EventBus from "../util/event/EventBus";
import { slack } from "../util/event/listeners/slack";
import { logger } from "../util/logger";

export const eventBusLoader = () => {

  if (config.services.slack.enabled) {
    logger.info(`Posting notifications to Slack channel ${config.services.slack.channel}`);
    EventBus.instance().register((message) => slack(config.services.slack.channel, message));
  }

};
