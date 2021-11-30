import Unsplash from "../../../../../../../../../../common/api/sdk/services/Unsplash";
import { logger } from "../../../../../../../../../../common/util/logger";

export const trackUnsplashDownloads = (nodes) => {
  const downloadLocations = nodes
    .map((node) => node.settings?.links?.download_location)
    .filter((url) => url !== undefined && url !== null);

  if (downloadLocations.length > 0) {
    Unsplash.trackDownload(downloadLocations)
      .then(() => logger.debug(`Triggered download event for ${downloadLocations.length} image(s)`))
      .catch(() => logger.error(`Failed to trigger download events`));
  }
};
