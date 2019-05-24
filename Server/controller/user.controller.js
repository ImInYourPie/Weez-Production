const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../model/schemas/user.schema.js");
const jwt = require("jsonwebtoken");

function jwtSignUser(user) {
    const ONE_WEEK = 60 * 60 * 24 * 7;
    return jwt.sign(user, "baconpancakes", {
        expiresIn: ONE_WEEK
    })
}

class UserController {

    static register(req, res) {

        let newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
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
                            res.status(201).send({isSuccess: "Registo efetuado com sucesso!"});
                        }
                    })
                })
            }
        })
    }

    static returnUsers(req, res) {
        // Get data
        User.find().exec((err, users) => {
            res.status(200).send(users);
        });
    }


    static login(req, res, next) {
        console.log(req.body);
        passport.authenticate("local", {
            failureRedirect: "/",
            failureFlash: true
        })(req, res, next);
    }

    // static login(req, res) {
    //     try {
    //         const { username, password } = req.body;
    //         console.log(username, password)
    //         User.findOne({ username: username }).lean().exec((err, user) => {
    //             if (err) throw err;
    //             else {
    //                 console.log(user)
    //                 if (!user) {
    //                     return res.status(403).send({
    //                         error: "Utilizador não existe"
    //                     });
    //                 }

    //                 let passwordValid = bcrypt.compareSync(password, user.password)
    //                 console.log(passwordValid)
    //                 if (!passwordValid) {
    //                     return res.status(403).send({
    //                         error: "Password incorreta"
    //                     })
    //                 }

    //                 res.send({ user, token: jwtSignUser(user) });
    //             }
    //         })

    //     }
    //     catch (err) {
    //         res.status(500).send({
    //             error: "Oops alguma coisa correu mal, mas não é culpa tua! :)"
    //         })
    //     }
    // }


    static logout(req, res, next) {
        req.logout();
        res.status(200).redirect("/");
    }



}




module.exports = UserController;
