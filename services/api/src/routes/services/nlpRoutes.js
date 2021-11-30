import express from "express";
import expressAsyncHandler from "express-async-handler";
import { NLPService } from "../../services/nlp/NLPService";
import { buildQuery } from "./unsplash/queries/buildQuery";
import { searchUnsplash } from "./unsplash/queries/searchUnsplash";

const nlpRouter = express.Router();

export const nlpRoutes = (router) => {

  router.use('/services/nlp', nlpRouter);

  /**
   * Extract keywords and keyphrases.
   */
  nlpRouter.post('/keywords', expressAsyncHandler(async (req, res, next) => {
    NLPService.analyze(req.body.text)
      .then((response) => {
        res.status(200).json(response);
      });
  }));

  /**
   * Analyse a body of text on a slide and return back suggested terms, sentiment and matching images.
   */
  nlpRouter.get('/suggest', expressAsyncHandler(async (req, res, next) => {
    const { keyword, page, perPage } = req.query;
    NLPService.analyze(keyword).then((analysis) => {
      const query = buildQuery(analysis) || keyword;
      const sentiment = analysis?.sentiment;
      searchUnsplash(query, page, perPage, res)
        .then((images) => res.json({
          images,
          sentiment,
          query,
        }));
    });
  }));
};
