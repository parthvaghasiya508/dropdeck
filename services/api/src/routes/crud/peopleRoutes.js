import express from "express";
import { PeopleService } from "../../services/PeopleService.js";
import { eventBus } from "../../util/event/EventBus";
import { logger } from "../../util/logger.js";

const peopleRouter = express();

export const peopleRoutes = (router) => {

  // People REST API
  router.use('/people', peopleRouter);

  peopleRouter.get('/me', (req, res) => {
    if (req.user && req.user._id) {
      PeopleService.get(req.user)
        .then(
          (person) => {
            res.send(person);
          }
        )
        .catch((e) => logger.error(e));
    } else {
      res.sendStatus(403);
    }
  });

  peopleRouter.put('/me', (req, res) => {
    PeopleService.update(req.user._id, req.body)
      .then((person) => {
        if (person._internal) {
          person._internal = undefined;
        }
        res.send(person);
      })
      .catch((e) => logger.error(e));
  });

  /**
   * Delete account, TODO will need to be fleshed out a bit more, deleting decks as appropriate etc.
   */
  peopleRouter.delete('/me', (req, res) => {
    if (req.user && req.user._id) {
      PeopleService.deleteAccount(req.user._id)
        .then((person) => {
          logger.info(`Deleted ${req.user._id}`);
          eventBus().notify(`😭 Account deleted: ${person.givenName} ${person.familyName}, ${person.email})`);
          req.logout();
          res.sendStatus(200);
        })
        .catch((e) => res.sendStatus(500));
    }
  });
};
