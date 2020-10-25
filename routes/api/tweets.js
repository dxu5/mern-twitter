const express = require("express");
//produces router objecr
const router = express.Router();
const validateTweetInput = require("../..//validation/tweets");
const Tweet = require("../../models/Tweet.js");
const passport = require("passport");
//basically making own custom routes that will be combined together in app?
router.get("/test", (req, res) => {
  res.json({
    message: "This is the tweet route",
  });
});

router.get("/", (req, res) => {
  //get everything back
  Tweet.find()
    .sort({ date: -1 })
    .then((tweets) => res.json(tweets))
    .catch((err) => res.status(400).json(err));
});

router.get("/user/:user_id", (req, res) => {
  //access to wildcard number
  Tweet.find({ user: req.params.user_id })
    .then((tweets) => res.json(tweets))
    .catch((err) => res.status(400).json(err));
});

router.get("/:id", (req, res) => {
  //need underscore!
  Tweet.findById(req.params.id)
    .then((tweet) => res.json(tweet))
    .catch((err) => res.status(400).json(err));
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTweetInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    console.log(req.user);
    const newTweet = new Tweet({
      //this comes from passport middleware?
      user: req.user.id,
      text: req.body.text,
    });
    //save tweet and res back!
    newTweet
      .save()
      .then((tweet) => res.json(tweet))
      .catch((err) => console.log(err));
  }
);

module.exports = router;
