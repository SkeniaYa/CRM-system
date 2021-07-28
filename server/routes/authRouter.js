const { Router } = require("express");
const checkAuth = require("../middlewares/checkAuth");
const User = require("../db/models/userModel");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

const { google } = require("googleapis");
const { OAuth2 } = google.auth;

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, DB_HOST, PORT, REFRESH_TOKEN } =
  process.env;

const router = Router();
let defaultUser;
let user;
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:3001/auth/google/callback`,
      passReqToCallback: true,
    },

    async (request, accessToken, refreshToken, profile, done) => {
      defaultUser = {
        name: `${profile.name.givenName} ${profile.name.familyName}`,
        email: profile.emails[0].value,
        picture: profile.photos[0].value,
        googleId: profile.id,
      };
      user = await User.findOneAndUpdate(
        { email: defaultUser.email },
        {
          name: defaultUser.name,
          picture: defaultUser.picture,
          googleId: defaultUser.googleId,
        },
        { new: true },
        (err, user) => {
          if (err) {
            return done(err);
          }
          done(null, user);
        }
      );
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

router.get(
  "/signinwithgoogle",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/clients",
    failureRedirect: "http://localhost:3000/failure",
  })
);

router.get("/google/failure", (req, res) => {
  res.send('Go to admin=/');
});

router.get("/user", (req, res) => {
  return res.json(user);
});

router.route("/check").get(checkAuth, async (req, res) => {
  try {
    const user = await User.findOne(
      { googleId: req.session.passport.user.googleId },
      { password: 0 }
    );
    return res.json(user);
  } catch (error) {
    return res.sendStatus(500);
  }
});

router.route("/signout").get((req, res) => {
  req.session.destroy((err) => {
    if (err) return res.sendStatus(500);
    user = null;
    res.clearCookie(req.app.get("cookieName"));
    return res.sendStatus(200);
  });
});

module.exports = router;
