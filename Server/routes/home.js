const express = require("express");
const router = express.Router();
const UserController = require("../controller/user.controller");
const AuthenticationPolicy = require("../policies/authentication.policy");


// post app to /
router.get('/', UserController.returnUsers); // for testing

router.post('/register', AuthenticationPolicy.register, UserController.register);

router.post("/login", UserController.login);


module.exports = router;