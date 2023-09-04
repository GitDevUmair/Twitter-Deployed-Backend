const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Tweet = require("../models/Tweet");

// ROUTE 1: Get All the Tweets using: GET "http://localhost:5000/api/tweets/gettweets". Login required
router.get("/gettweets", fetchuser, async (req, res) => {
  try {
    const tweets = await Tweet.find({ createdby: req.user.id });
    res.json(tweets);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
// ROUTE 2: Add a new Tweet using: POST "http://localhost:5000/api/tweets/addtweet". Login required
router.post("/addtweet", fetchuser, async (req, res) => {
  try {
    const { text, image, likes, heading } = req.body;
    const tweet = new Tweet({
      text,
      image,
      likes,
      heading,
      createdby: req.user.id,
    });
    await tweet.save();
    res.json(tweet);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
// ROUTE 3: Update an existing Tweet using: PUT "http://localhost:5000/api/tweets/updatetweet". Login required
router.put("/updatetweet/:id", fetchuser, async (req, res) => {
  const { text, image, likes, heading } = req.body;
  try {
    let newTweet = {};
    if (text) {
      newTweet.text = text;
    }
    if (heading) {
      newTweet.heading = heading;
    }
    if (image) {
      newTweet.image = image;
    }
    if (likes) {
      newTweet.likes = likes;
    }
    let tweet = await Tweet.findById(req.params.id);
    if (!tweet) {
      return res.status(404).send("Not Found");
    }
    if (tweet.createdby.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    tweet = await Tweet.findByIdAndUpdate(
      req.params.id,
      { $set: newTweet },
      { new: true }
    );
    res.json({ tweet });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
// ROUTE 4: Delete an existing Tweet using: DELETE "http://localhost:5000/api/tweets/deletetweet". Login required
router.delete("/deletetweet/:id", fetchuser, async (req, res) => {
  try {
    let tweet = await Tweet.findById(req.params.id);
    if (!tweet) {
      return res.status(404).send("Not Found");
    }
    if (tweet.createdby.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    tweet = await Tweet.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", tweet: tweet });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
// ROUTE 5: GET Tweet likes using get request: GET "http://localhost:5000/api/tweets/getlikes/:id"
router.get("/getlikes/:id", async (req, res) => {
  try {
    let tweet = await Tweet.findById(req.params.id);
    if (!tweet) {
      res.status(404).json({ error: "tweet not found" });
    }
    let totalLikes = tweet.likes.length;
    res.status(200).json({ likes: totalLikes });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
