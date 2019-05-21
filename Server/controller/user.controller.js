const bcrypt = require("bcrypt");
const passport = require("passport");
let User = require("../model/schemas/user.schema.js");

class UserController {

    static registerUser(req, res) {
        console.log("hello")
        // Get inputs
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const passwordConfirm = req.body.passwordConfirm;

        // Validate inputs
        req.checkBody("username", "É necessário inserir um nome de utilizador.").notEmpty();
        req.checkBody("email", "É necessário inserir um endereço de email.").notEmpty();
        req.checkBody("email", "É necessário inserir um endereço de email válido.").isEmail();
        req.checkBody("password", "É necessário inserir uma password").notEmpty();
        req.checkBody("passwordConfirm", "As passwords não coincidem.").equals(req.body.password);


        let errors = req.validationErrors();

        if (errors) {
            res.status(500).send(errors);
        } else {
            // If valide create new User
            let newUser = new User({
                username: username,
                email: email,
                password: password,
            });

            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    console.log(err);
                }
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) {
                            console.log(err);
                        }
                        newUser.password = hash;
                        // Save User
                        newUser.save((err) => {
                            if (err) {
                                console.log(err);
                                return;
                            } else {
                                req.flash("success", "Registo efetuado com successo!");
                                res.status(201).send();
                            }
                        })
                    })
                }
            })
        }


    }

    static returnUsers(req, res) {
        // Get data
        User.find().exec((err, users) => {
            res.status(200).send(users);
        })
    }
    
    
    static loginUser(req, res, next){
        console.log(req.body)
        passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/forum",
            failureFlash: true
        })(req, res, next);
    }
    
    
    static logoutUser(req, res, next){
        req.logout();
        res.status(200).redirect("/");
    }
    
}




module.exports = UserController;
