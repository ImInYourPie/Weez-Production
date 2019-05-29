const express = require("express");
const router = express.Router();
const UserController = require("../controller/user.controller");


// post app to /
router.get('/', UserController.returnUsers);


module.exports = router;