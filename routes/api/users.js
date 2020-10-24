const express = require("express");
//produces router objecr
const router = express.Router();
//get user model
const User = require("../../models/User.js");
//basically making own custom routes that will be combined together in app?
router.get("/test", (req, res) => {
  res.json({
    message: "This is the user route",
  });
});

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    //if user exists then we are going to return an error
    if (user) {
      return res
        .status(400)
        .json({ email: "A user is already registered with that email" });
    } else {
      const newUser = new User({
        handle: req.body.handle,
        email: req.body.email,
        password: req.body.password,
      });

      newUser
        .save()
        .then((user) => res.send(user))
        .catch((err) => res.send(err));
    }
  });
});

module.exports = router;
