const mongoose = require("mongoose");
const { Schema } = mongoose;

const TweetSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    heading: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    createdby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    likes: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);
const Tweet = mongoose.model("tweet", TweetSchema);
module.exports = Tweet;
