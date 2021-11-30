import express from "express";
import { MathJaxService } from "../../services/media/MathJaxService.js";

const mathRouter = express.Router();

export const mathRoutes = (router) => {

  // Math REST API
  router.use('/services/math', mathRouter);

  /**
   * Render a MathJAX expression as an image.
   */
  mathRouter.get('/', (req, res) => {
    MathJaxService.generate(req.query.formula,
      (data) => {
        if (!data.errors) {
          res.type('image/svg+xml');
          res.send(data.svg);
        }
      });
  });
};
