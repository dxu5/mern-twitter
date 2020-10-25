const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TweetSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    //reference needs to be model to associate with
    ref: "users",
  },
  text: {
    type: String,
    required: true,
  },
  data: {
    type: Date,
    default: Date.now,
  },
});

const Tweet = mongoose.model("tweet", TweetSchema);
module.exports = Tweet;
