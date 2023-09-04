const express = require("express");
const router = express.Router();
const User = require("../models/User");
const fetchuser = require('../middleware/fetchuser')
// ROUTE 1 Edit user using POST request  http://localhost:5000/api/profile/update
router.post('/update',fetchuser,async(req,res)=>{
    let id = req.user.id;
    const { username, profileimage, contact,status } = req.body;
    let updatedprofile={}
    try {
        let user = await User.findById(id)
        if(!user){
            return res.status(404).json({error : "User not found"})
        }
        if(username){
            updatedprofile.username = username
        }
        
        if(profileimage){
            updatedprofile.profileimage = profileimage
        }
        if(contact){
            updatedprofile.contact = contact
        }
        if(status){
            updatedprofile.status = status
        }
        if(id!==user._id.toString()){
            return  res.status(401).send("Not Allowed");
        }
        user = await User.findByIdAndUpdate(id , {$set : updatedprofile} , {new:true})
        res.status(200).json({user, message:"User updated successfully"})
    }
     catch (error) {
        console.error(error)
        res.status(500).json({error:"Internal Server error"})
    }
})
// ROUTE 2 get followers using POST request  http://localhost:5000/api/profile/followers
router.post('/followers',fetchuser,async(req,res)=>{
    let id = req.user.id;
    try {
        let user = await User.findById(id)
        if(!user){
            return res.status(404).json({error : "User not found"})
        }
        let followers = user.followers;
        res.status(200).json({followers})        
    }
     catch (error) {
        console.error(error)
        res.status(500).json({error:"Internal Server error"})
    }
})
// ROUTE 2 get following using POST request  http://localhost:5000/api/profile/following
router.post('/following',fetchuser,async(req,res)=>{
    let id = req.user.id;
    try {
        let user = await User.findById(id)
        if(!user){
            return res.status(404).json({error : "User not found"})
        }
        let following = user.following;
        res.status(200).json({following})        
    }
     catch (error) {
        console.error(error)
        res.status(500).json({error:"Internal Server error"})
    }
})

module.exports = router