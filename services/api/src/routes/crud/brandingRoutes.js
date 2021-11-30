import express from "express";
import multer from "multer";
import expressAsyncHandler from "express-async-handler";
import { createProxyMiddleware } from "http-proxy-middleware";
import { BrandingService } from "../../services/branding/BrandingService.js";
import { logger } from "../../util/logger.js";
import config from "../../config";
import { LogoFileService } from "../../services/branding/LogoFileService";
import { GoogleCloudStorageService } from "../../services/storage/cloud/GoogleCloudStorageService";
import { DiskStorageService } from "../../services/storage/DiskStorageService";

const brandingRouter = express.Router();

export const brandingRoutes = (router) => {

  const fileStorageService = config.storage.cloud.google.enabled ?
    new GoogleCloudStorageService(config.storage.cloud.google.branding) :
    new DiskStorageService();

  const upload = multer({ storage: LogoFileService.diskStorage });

  // Branding REST API
  router.use('/branding', brandingRouter);

  brandingRouter.get('/:_id([a-zA-Z0-9]+)', (req, res) => {
    BrandingService.get(req.params._id)
      .then(
        (branding) => {
          res.type('application/json');
          res.send(branding);
        }
      ).catch((e) => logger.error(e));
  });

  brandingRouter.put('/:_id([a-zA-Z0-9]+)', (req, res) => {
    BrandingService.update(req.params._id, req.body)
      .then((branding) => res.send(branding));
  });

  /**
   * Post logo files.
   */
  brandingRouter.post('/:_id([a-zA-Z0-9]+)/logos', upload.array("files", 6), expressAsyncHandler(async (req, res) => {
    if (req.files.length > 0) {
      const brandingId = req.params._id;
      const { filename } = req.files[0];
      LogoFileService.store(brandingId, req.files[0], fileStorageService)
        .then((data) => {
          res.send({
            filePath: `/branding/assets/${brandingId}/logos/${filename}`, // <<< NEED TO TIE THIS TO THE PROXY
            metadata: { ...data }
          });
        });
    } else {
      res.status(404);
      res.send();
    }
  }));

  // Proxy logo uploads...
  if (config.storage.cloud.google.enabled) {

    // ... to Google Cloud Storage:
    router.use('/branding/assets', createProxyMiddleware({
      target: `${config.storage.cloud.google.branding.proxyUrl}`,
      changeOrigin: true,
      pathRewrite: (path) => {
        const pathPattern = new RegExp(/^\/branding\/assets\/([a-zA-Z0-9]+)\/logos\/(.+)/gi);
        const match = pathPattern.exec(path);
        if (match) {
          const [, brandingId, filename] = match;
          return LogoFileService.uploadPath(brandingId, filename);
        }
      },
    }));
    logger.info(`Serving up branding files from Google Cloud Storage: Proxying /branding/assets/* => ${config.storage.cloud.google.branding.proxyUrl}/*`);

  } else {

    // ... or to a persistent disk volume:
    router.use('/branding/assets', express.static(LogoFileService.storageFolderRoot()));
    logger.info(`Serving up branding files from local disk: Proxying /branding/assets/* => ${LogoFileService.storageFolderRoot()}/*`);
  }
};
