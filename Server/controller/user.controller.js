function registerUser(req, res) {
    var newUser = {
        username: req.body.username,
        email: req.body.email,
        profilePicture: req.body.profilePicture,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    };
    
    var newUserString = JSON.stringify(newUser)
    console.log("User:" + newUserString)

}


module.exports = {
    registerUser: registerUser
};
