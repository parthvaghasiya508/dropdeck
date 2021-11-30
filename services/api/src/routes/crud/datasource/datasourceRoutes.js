import express from "express";
import { getConsumerForDataSource } from "../../../services/datasource/ConsumeDataSource.js";
import { DatasourceService } from "../../../services/datasource/DatasourceService.js";
import { logger } from "../../../util/logger.js";

const datasourceRouter = express();

export const datasourceRoutes = (router) => {

  // Company REST API
  router.use('/datasources', datasourceRouter);

  /**
   * Consume datasource by id.
   */
  datasourceRouter.get('/use/:_id/:path?', (req, res) => {
    DatasourceService.get(req.params._id)
      .then(
        (datasource) => {
          res.type('application/json');
          getConsumerForDataSource(datasource)
            .then((payload) => {
              if (req.params.path) {
                const { path } = datasource.paths[req.params.path];
                let member = payload.data;
                path.forEach((p) => {
                  member = member[p];
                });
                res.send({ value: member });
              } else {
                res.send(payload.data);
              }
            })
            .catch((e) => {
              logger.error(e);
              res.sendStatus(500);
            });
        }
      )
      .catch((e) => logger.error(e));
  });

  /**
   * Get datasource by id.
   */
  datasourceRouter.get('/:_id', (req, res) => {
    DatasourceService.get(req.params._id)
      .then(
        (datasource) => {
          res.type('application/json');
          res.send(datasource);
        }
      )
      .catch((e) => logger.error(e));
  });

  /**
   * Get datasources for a company.
   */
  datasourceRouter.get('/', (req, res) => {
    if (req.user) {
      DatasourceService.getDatasources(req.user)
        .then(
          (datasources) => {
            res.type('application/json');
            res.send(datasources);
          }
        )
        .catch((e) => logger.error(e));
    } else {
      res.send([]);
    }

  });

  /**
   * Create a datasource..
   */
  datasourceRouter.post('/', (req, res) => {
    DatasourceService.create(req.body, req.user._id)
      .then((datasource) => res.send(datasource));
  });

  /**
   * Update a datasource..
   */
  datasourceRouter.put('/:_id', (req, res) => {
    DatasourceService.update(req.params._id, req.body)
      .then((datasource) => res.send(datasource));
  });

  datasourceRouter.delete('/:_id', (req, res) => {
    DatasourceService.delete(req.params._id, req, res,
      (error, dataSource) => {
        if (error) {
          logger.error(`Error when user ${req.user ? req.user.email : null} attempted to delete data source ${req.params._id}:`);
          logger.error(error);
          res.status(500);
          res.send();
        } else if (dataSource) {
          if (dataSource.secrets) {
            dataSource.secrets = undefined;
          }
          res.send();
        } else {
          logger.error(`Unauthorized access when user ${req.user ? req.user.email : null} attempted to delete data source ${req.params._id}`);
          res.status(404);
          res.send();
        }
      });
  });
};
