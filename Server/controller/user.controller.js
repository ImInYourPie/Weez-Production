function registerUser(req, res) {
    var newUser = {
        email: "di@mai.com",
        password: "123"
    };
    console.log("Register:" + newUser)
}

module.exports = {
    registerUser: registerUser
};
