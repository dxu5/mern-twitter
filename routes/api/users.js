const express = require("express");
//produces router objecr
const router = express.Router();
//basically making own custom routes that will be combined together in app?
router.get("/test", (req, res) => {
  res.json({
    message: "This is the user route",
  });
});

module.exports = router;
