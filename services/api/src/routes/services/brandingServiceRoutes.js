import express from "express";
import expressAsyncHandler from "express-async-handler";
import { BrandingService } from "../../services/branding/BrandingService.js";
import { logger } from "../../util/logger.js";

const brandingServiceRouter = express.Router();

export const brandingServiceRoutes = (router) => {

  // Branding services REST API
  router.use('/services/branding', brandingServiceRouter);

  /**
   * Get information about a given domain. If already exists and augmented by Brandfetch we return
   * from database. If just exists as domain but not augmented we harvest all details.
   */
  brandingServiceRouter.get('/company/:domain', expressAsyncHandler(async (req, res, next) => {
    const { domain } = req.params;
    if (domain !== undefined && domain !== null && domain.length > 0) {
      const branding = await BrandingService.harvestBranding(domain);
      logger.debug("Branding service completed request");
      res.send(branding);
    } else {
      res.status(500);
      res.send("Parameter `domain` not specified");
    }
  }));

  brandingServiceRouter.get('/logo/:domain', expressAsyncHandler(async (req, res) => {
    const { domain } = req.params;
    if (domain !== undefined && domain !== null && domain.length > 0) {
      BrandingService.harvestLogo(domain, res);
    }
  }));
};
