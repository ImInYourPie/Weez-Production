console.log("ola")

// post app to /
global.app.get('/registerUser', function(req, res) {
    console.log("GET")
    res.send("GET");
    console.log(global.registerUserController.registerUser)
});

// post app to /
global.app.post('/registerUser', function(req, res) {
    // console.log("POST")
    // res.send("POST");
    
    // global.registerUserController.registerUser(req, res);
    // //Registo de users AQUI
    
    // console.log(JSON.stringify(global.registerUserController.registerUser.newUserString))
    
    
    
});


