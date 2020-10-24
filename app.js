const express = require("express");

const app = express();

//listening for a get request on this endpoint and calls a callback that has the req and res
app.get("/", (req, res) => {
  res.send("Hello");
});

//configure port so that it will use herokus or 5000
//nodemon will auto refresh the server if there is a change that occurs!
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
