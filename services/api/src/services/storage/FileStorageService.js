import multer from "multer";
import mkdirp from "mkdirp";
import shortid from "shortid";
import config from "../../config";

export class FileStorageService {

  deckFolder = (deckId, generated = false) => `${config.storage.disk.decks.path}/${deckId}${generated ? '/generated' : ''}`;

  deckFilePath = (deckId, filename) => `${config.storage.disk.decks.path}/${deckId}/${filename}`;

  // Multer is required to process file uploads and make them available via the HTTP request.
  diskStorage = () => multer.diskStorage({
    destination: (req, file, cb) => {
      const { deckId } = req.params;
      const folder = this.deckFolder(deckId);
      mkdirp.sync(folder);
      cb(null, folder);
    },
    filename: (req, file, cb) => {
      const suffix = file.originalname.split('.').pop();
      const id = `img-${shortid.generate()}`;
      cb(null, `${id}.${suffix}`);
    }
  });

  /**
   * Base implementation for uploading a file asset to a storage device.
   *
   * @param folder
   * @param file
   * @param pathOnDisk
   */
  upload = (folder, file, pathOnDisk) => new Promise((resolve) => resolve());

  /**
   * Base implementation for copying a file asset between folders.
   *
   * @param sourceFolder
   * @param fileName
   * @param targetFolder
   */
  copy = (sourceFolder, fileName, targetFolder) => new Promise((resolve) => resolve());
}
