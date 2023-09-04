const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const User = require("../models/User");
const Tweet = require("../models/Tweet");
//ROUTE 1 : Follow a user using post request http://localhost:5000/api/relationship/follow/:tofollowid
router.post("/follow/:tofollowid", fetchuser, async (req, res) => {
  let followerid = req.user.id;
  let followeeid = req.params.tofollowid;
  try {
    let follower = await User.findById(followerid);
    let followee = await User.findById(followeeid);
    if (!follower || !followee) {
      return res.status(404).json({ error: "User not found" });
    }
    if (follower.following.includes(followeeid)) {
      return res.status(400).json({ error: "Already following this user" });
    }
    follower.following.push(followeeid);
    followee.followers.push(followerid);
    await follower.save();
    await followee.save();
    res.json({ message: "Successfully followed the user" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//ROUTE 2 : Unfollow a user using post request http://localhost:5000/api/relationship/unfollow/:tounfollowid
router.post("/unfollow/:tounfollowid", fetchuser, async (req, res) => {
  let followerid = req.user.id;
  let followeeid = req.params.tounfollowid;
  try {
    let follower = await User.findById(followerid);
    let followee = await User.findById(followeeid);
    if (!follower || !followee) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!follower.following.includes(followeeid)) {
      return res.status(400).json({ error: "Already Not following this user" });
    }
    const followingIndex = follower.following.indexOf(followeeid);
    follower.following.splice(followingIndex, 1);
    const followerIndex = followee.followers.indexOf(followerid);
    followee.followers.splice(followerIndex, 1);

    await follower.save();
    await followee.save();
    res.json({ message: "Successfully unfollowed the user" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
//ROUTE 3 : like a tweet of a user using post request http://localhost:5000/api/relationship/like/:totweetid
router.post("/like/:totweetid", fetchuser, async (req, res) => {
  let likerid = req.user.id;
  let tweetid = req.params.totweetid;
  try {
    let tweet = await Tweet.findById(tweetid);
    if (!tweet) {
      return res.status(404).json({ error: "tweet not found" });
    }
    if (tweet.likes.includes(likerid)) {
      tweet.likes = tweet.likes.filter((userId) => userId !== likerid);
      await tweet.save();
      return res.status(200).json({ success: "success", likers: tweet.likes });
    }
    tweet.likes.push(likerid);
    await tweet.save();
    res.status(200).json({ success: "success", likers: tweet.likes });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
