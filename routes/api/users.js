const express = require("express");
//produces router objecr
const router = express.Router();
//get user model
const User = require("../../models/User.js");
const bcrypt = require("bcryptjs");

const keys = require("../../config/keys.js"); //has both mongo and secretorkey

const jwt = require("jsonwebtoken");

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
            .then((user) => {
              const payload = {
                id: user.id,
                handle: user.handle,
                email: user.email,
              };
              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer" + token,
                  });
                }
              );
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

//This will not persist through sessions! only for the current login!
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }).then((user) => {
    if (!user) {
      //let frontend know something went wrong
      res.status(404).json({ email: "This user does not exist." });
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        //give client back a json web token
        const payload = {
          id: user.id,
          handle: user.handle,
          email: user.email,
        };
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer" + token,
            });
          }
        ); //token will expire in 1 hour, does it send back the entire payload as well?
      } else {
        res.status(400).json({ password: "Incorrect password." });
      }
    });
  });
});

module.exports = router;
