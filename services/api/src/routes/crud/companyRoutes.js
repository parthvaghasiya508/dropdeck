import express from "express";
import { logger } from "../../util/logger.js";
import { CompanyService } from "../../services/company/CompanyService.js";
import { getLimitSkip } from '../../util/pagination';

const companyRouter = express();

export const companyRoutes = (router) => {

  // Company REST API
  router.use('/companies', companyRouter);

  /**
   * Get company by id.
   */
  companyRouter.get('/:_id', (req, res) => {
    CompanyService.get(req.params._id)
      .then(
        (company) => {
          res.type('application/json');
          res.send(company);
        }
      )
      .catch((e) => logger.error(e));
  });

  /**
   * Get decks for a company.
   */
  companyRouter.get('/:_id/decks', (req, res) => {
    if (req.user.company) {
      const { page, columnCount, f } = req.query;
      const { limit } = getLimitSkip(page, columnCount);
      CompanyService.getDecks(req.user.company, req.user._id, f === 'shared', page, columnCount)
        .then(
          (decks) => {
            const hasMore = decks.length === limit + 1;

            res.type('application/json');
            res.send({
              decks: hasMore ? decks.slice(0, decks.length - 1) : decks,
              hasMore: decks.length === limit + 1,
            });
          }
        )
        .catch((e) => logger.error(e));
    } else {
      res.send([]);
    }

  });

  /**
   * Create company.
   */
  companyRouter.post('/', (req, res) => {
    CompanyService.create(req.body, req.user._id).then((company) => res.send(company));
  });

  /**
   * Update company.
   */
  companyRouter.put('/:_id', (req, res) => {
    CompanyService.update(req.params._id, req.body).then((company) => res.send(company));
  });
};
