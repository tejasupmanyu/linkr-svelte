import express from "express";
import passport from "passport";

export const authRouter = express.Router();

authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

authRouter.get(
  "/google/redirect",
  passport.authenticate("google"),
  (req, res) => {
    res.cookie("userProfile", req.user, { maxAge: 900000 });
    res.redirect("/boards");
  }
);

authRouter.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
