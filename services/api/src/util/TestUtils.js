import express from "express";
import request from "supertest";
import * as bodyParser from "body-parser";

export const test = {
  Route: (service) => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    const router = express.Router();
    service(router);
    app.use(router);

    return request(app);
  }
};
