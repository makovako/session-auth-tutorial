import express, { Request, Response, NextFunction } from "express";
import session, { Store } from "express-session";
import { SESSION_OPTIONS } from "./config";
import { register, login } from "./routes";
import { internalServerError, notFound } from "./middleware";

export const createApp = (store: Store) => {
  const app = express();

  app.use(express.json());

  app.use(
    session({
      ...SESSION_OPTIONS,
      store
    })
  );

  app.use(login);

  app.use(register);

  app.use(notFound);

  app.use(internalServerError);

  return app;
};
