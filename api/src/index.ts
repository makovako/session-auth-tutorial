import mongoose from "mongoose";
import express from "express";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import {
  REDIS_OPTIONS,
  APP_PORT,
  MONGO_URI,
  MONGO_OPTIONS
} from "./config";
import {createApp} from './app'

// mongo connect is async, we cant have async at root level, also we need ; after thosei mport above
(async () => {
  await mongoose.connect(MONGO_URI, MONGO_OPTIONS);

  const RedisStore = connectRedis(session);

  const client = new Redis(REDIS_OPTIONS);

  const store = new RedisStore({ client });

  const app = createApp(store)

  app.listen(APP_PORT, () => {
    console.log(`Server running on ${APP_PORT}`);
  });
})();
