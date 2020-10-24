const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const passport = require("passport");
//can either define a model or grab it!
const User = mongoose.model("users");
const keys = require("./keys.js");

const options = {};
//extract web token from header
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      console.log(jwt_payload);
      //done will say that this middleware is done and can go to next one
      done();
    })
  );
};
