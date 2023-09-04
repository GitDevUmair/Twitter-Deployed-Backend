const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const User = require("../models/User");
//ROUTE 1 Search Users using get request http://localhost:5000:/api/searchusers
router.post("/", fetchuser, async (req, res) => {
  try {
    const id = req.user.id;
    const searchQuery = req.query.searchquery;
    const searchRegex = new RegExp(searchQuery, "i"); // 'i' flag makes the search case-insensitive
    const searchResults = await User.find({ fullname: searchRegex });
    const finalSearchResults = searchResults.filter((obj) => {
      return obj._id.toString() !== id;
    });
    res.status(200).json({ finalSearchResults });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
