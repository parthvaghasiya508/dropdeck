import multer from "multer";
import mkdirp from "mkdirp";
import shortid from "shortid";
import { logger } from '../../util/logger.js';
import config from "../../config.js";
import { BrandingService } from "./BrandingService";

const BRANDING_FOLDER = "_branding";

export const LogoFileService = {

  diskStorage: multer.diskStorage({
    destination: (req, file, cb) => {
      const brandingId = req.params._id;
      const folder = LogoFileService.storageFolder(brandingId);
      mkdirp.sync(folder);
      cb(null, folder);
    },
    filename: (req, file, cb) => {
      const suffix = file.originalname.split('.').pop();
      const id = `logo-${shortid.generate()}`;
      cb(null, `${id}.${suffix}`);
    }
  }),

  uploadPath: (brandingId, filename) => `${brandingId}/${filename}`,

  uploadFolder: (brandingId) => `${brandingId}`,

  storageFolderRoot: () => `${config.storage.disk.branding.path}`,

  storageFolder: (brandingId) => `${config.storage.disk.branding.path}/${brandingId}/logos`,

  storagePath: (brandingId, filename) => `${LogoFileService.storageFolder(brandingId)}/${filename}`,

  store: (brandingId, file, fileStorageService) => {
    const pathOnDisk = LogoFileService.storagePath(brandingId, file.filename);
    return BrandingService.analyzeFile(pathOnDisk)
      .then((data) => {
        const destinationFolder = LogoFileService.uploadFolder(brandingId);
        return fileStorageService.upload(destinationFolder, file, pathOnDisk)
          .then(() => {
            logger.debug(`Uploaded logo file to ${pathOnDisk}`);
            return data;
          });
      });
  }
};
