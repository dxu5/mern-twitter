const express = require("express");
//produces router objecr
const router = express.Router();
//get user model
const User = require("../../models/User.js");
const bcrypt = require("bcryptjs");
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

      //err if something bad happens, salt to use to hash. Why would an error occur?
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          //check for errors
          if (err) {
            throw err;
          }
          //reset password for new user
          //the res here is the one way up above so that you can send back responses for your frontend
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

module.exports = router;
