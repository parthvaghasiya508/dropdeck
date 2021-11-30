import express from "express";
import { SignalService } from "../../services/signals/SignalService";

const signalRouter = express();

export const signalRoutes = (router) => {

  // People REST API
  router.use('/signals', signalRouter);

  signalRouter.post('/', (req, res) => {
    SignalService.create(req.body, req.user);
    res.sendStatus(200);
  });

};
