const express = require("express");
const router = express.Router();
const isAuthenticated = require("../policies/isAuthenticated.policy");
const UserController = require("../controller/user.controller.js");


var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET
});


router.get("/user/:username", UserController.returnUserProfile);

router.put("/user/:username", UserController.editUser);

router.put("/user/:username/profile-pic", isAuthenticated, UserController.editPic);


module.exports = router;