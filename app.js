const express = require("express");
const app = express();

const db = require("./config/keys.js").mongoURI;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users.js");
const tweets = require("./routes/api/tweets.js");

//basically tells app what sorts of requests to respond to

//connects us to mongoDB but how will this work with it?
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport);

app.get("/", (req, res) => res.send("Hello World!!"));

//told app to respond to json requests
//app can respond to other software like postman
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

//if a route matches, will use that following module file to determine what to do
app.use("/api/users", users);
app.use("/api/tweets", tweets);

//configure port so that it will use herokus or 5000
//nodemon will auto refresh the server if there is a change that occurs!
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
