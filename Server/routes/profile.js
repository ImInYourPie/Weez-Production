const express = require("express");
const router = express.Router();
const UserController = require("../controller/user.controller.js");

router.get("/user/:id", UserController.returnUserProfile);

router.put("/user/:id", UserController.editUser);


module.exports = router;