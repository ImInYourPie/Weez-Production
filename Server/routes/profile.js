const express = require("express");
const router = express.Router();
const isAuthenticated = require("../policies/isAuthenticated.policy");
const UserController = require("../controller/user.controller.js");



router.get("/user/:username", UserController.returnUserProfile);

router.put("/user/:username", UserController.editUser);

router.put("/user/:username/profile-pic", isAuthenticated, );


module.exports = router;