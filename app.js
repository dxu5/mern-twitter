const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys.js").mongoURI;
const users = require("./routes/api/users.js");
const tweets = require("./routes/api/tweets.js");
//connects us to mongoDB but how will this work with it?
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.log(err));

//listening for a get request on this endpoint and calls a callback that has the req and res
app.get("/", (req, res) => {
  debugger;
  res.send("Hello");
});
//if a route matches, will use that following module file to determine what to do
app.use("/api/users", users);
app.use("/api/tweets", tweets);

//configure port so that it will use herokus or 5000
//nodemon will auto refresh the server if there is a change that occurs!
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
