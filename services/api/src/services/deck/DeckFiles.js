import sizeOf from "image-size";
import { Deck, File } from '@dropdeck/schema';
import { writableBy } from "./queries/writableBy.js";
import { logger } from '../../util/logger.js';
import config from "../../config.js";
import { GoogleCloudStorageService } from "../storage/cloud/GoogleCloudStorageService";
import { DiskStorageService } from "../storage/DiskStorageService";

const fileStorageService = config.storage.cloud.google.enabled ?
  new GoogleCloudStorageService(config.storage.cloud.google.decks) :
  new DiskStorageService();

const createFileRecord = (image, deckId, user) => {
  const { originalname, filename, mimetype, path } = image;
  const { width, height } = sizeOf(path);
  File.create({
    filename: originalname,
    name: filename,
    from: 'upload',
    mimetype,
    width,
    height,
    owner: user ? user._id : null,
    deck: deckId,
    company: user ? user.company : null,
  });

  return {
    name: filename,
    from: 'upload',
  };
};

export const DeckFiles = {

  /**
   * Service handling storage to an underlying persistence layer.
   */
  service: fileStorageService,

  /**
   * Upload and store reference to the list of files for the given deck. Checks whether the request has the right
   * permission to upload and modify this deck.
   *
   * @param deckId
   * @param user
   * @param files
   * @param req
   * @param res
   * @returns {*}
   */
  store: (deckId, user, files, req, res) => (

    // Verify that the user has rights to add files to this deck.
    Deck.findOne({
      $and: [{ _id: deckId }, writableBy(req, res)]
    })
      .exec(null)
      .then(
        async (deck) => {
          const t0 = new Date().getTime();
          if (deck) {
            let promises = [];
            const payload = [];
            files.forEach((image) => {
              const pathOnDisk = fileStorageService.deckFilePath(deckId, image.filename);
              const promise = fileStorageService.upload(deckId, image, pathOnDisk)
                .then(() => {
                  logger.debug(`Uploaded image to deck ${deckId}: ${pathOnDisk}`);
                  return createFileRecord(image, deckId, user);
                })
                .then((record) => {
                  logger.debug(`Successfully created a file database record for image ${pathOnDisk} in deck ${deckId}`);
                  payload.push(record);
                });
              promises.push(promise);
            });

            return Promise.all(promises)
              .then(() => {
                const t1 = new Date().getTime();
                logger.debug(`Uploading ${files.length} files took ${t1 - t0} ms`);
                promises = [];
                return payload;
              });
          }
        }
      )),

  /**
   * Copy all images for a given deck to another deck. Assumes that the requesting user has permission to read
   * the source deck and write to the target deck.
   *
   * @param sourceDeckId
   * @param targetDeckId
   * @param user
   * @returns {*}
   */
  copyFiles: (sourceDeckId, targetDeckId, user) => {
    const t0 = new Date().getTime();
    let promises = [];
    return File.find({ deck: sourceDeckId }).exec()
      .then((files) => {
        files.forEach((fileRecord) => {
          const { name } = fileRecord;
          const promise = fileStorageService.copy(sourceDeckId, name, targetDeckId)
            .then(() => {
              const { filename, name, from, mimetype, width, height } = fileRecord;
              File.create({
                filename,
                name,
                from,
                mimetype,
                width,
                height,
                owner: user ? user._id : null,
                deck: targetDeckId,
                company: user ? user.company : null,
              });
              logger.debug(`Copied file ${name} from ${sourceDeckId} to ${targetDeckId} and created a database entry`);
            });
          promises.push(promise);
        });

        return Promise.all(promises)
          .then(() => {
            const t1 = new Date().getTime();
            logger.debug(`Copying ${files.length === 0 ? 'no files' : `${files.length} file(s)`} took ${t1 - t0} ms`);
            promises = [];
          });
      });
  }
};
