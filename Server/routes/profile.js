const express = require("express");
const router = express.Router();
const UserController = require("../controller/user.controller.js");

router.get("/user/:username", UserController.returnUserProfile);

router.put("/user/:username", UserController.editUser);


module.exports = router;