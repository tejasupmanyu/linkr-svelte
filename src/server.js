import dotenv from "dotenv";
dotenv.config();

import express from "express";
import sirv from "sirv";
import compression from "compression";
import * as sapper from "@sapper/server";
import bodyParser from "body-parser";
import session from "cookie-session";
import passport from "passport";
import { connection } from "./server/mysql/dbConnection";
import { User } from "./server/mysql/models";
import {
  authRouter,
  boardRouter,
  postRouter,
  userRouter,
} from "./server/routes";
import UserService from "./server/services/user.service";

const GoogleStrategy = require("passport-google-oauth20").Strategy;

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    name: "session",
    keys: ["linkr-cookie-key-secret-2112dsad8"],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

connection.sync();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      // check if user exists, if yes, return the user info or create a user and then return info.
      const user = await UserService.findUserOrCreateByGoogleProfile(profile);
      done(null, user);
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

app.use(passport.initialize());
app.use("/auth", authRouter);
app.use("/api/board", boardRouter);
app.use("/api/post", postRouter);
app.use("/api/user", userRouter);

app
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware({
      session: (req) => {
        const user = req.session.passport ? req.session.passport.user : null;
        return { user };
      },
    })
  )
  .listen(PORT, (err) => {
    if (err) console.log("error", err);
  });
