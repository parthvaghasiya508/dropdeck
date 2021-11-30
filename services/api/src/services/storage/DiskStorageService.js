import mkdirp from "mkdirp";
import { FileStorageService } from "./FileStorageService";
import { logger } from "../../util/logger";
import config from "../../config";

const fs = require('fs');

/**
 * Service for storing files on disk, intended for local development.
 */
export class DiskStorageService extends FileStorageService {

  /**
   * Copies a file from one folder to another.
   *
   * @todo this could be moved to a worker thread but in reality we are doing this
   * only in development (using cloud storage in production) so not an issue.
   *
   * @param sourceFolder
   * @param fileName
   * @param targetFolder
   * @returns {Promise<UploadResponse>}
   */
  copy = (sourceDeckId, fileName, targetDeckId) => {
    const source = this.deckFilePath(sourceDeckId, fileName);
    const destinationFolder = this.deckFolder(targetDeckId);
    mkdirp.sync(destinationFolder); // ensure target directory exists
    const destination = this.deckFilePath(targetDeckId, fileName);

    logger.debug(`About to copy ${source} to ${destination}...`);
    return new Promise((resolve, reject) => {
      fs.copyFile(source, destination, (err) => {
        if (err) {
          reject(err);
        } else {
          logger.debug(`Done copying ${source} to ${destination}`);
        }
        resolve();
      });
    });
  }

}
