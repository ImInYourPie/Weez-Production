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

        console.log("userController")
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
                            res.status(201).send({ isSuccess: "Registo efetuado com sucesso!" });
                        }
                    })
                })
            }
        })
    }

    static returnUsers(req, res) {
        // Get data
        User.find({}).select("-password, -userType, -email").lean().exec((err, users) => {
            if (err) return res.status(400).send({ error: "Alguma coisa correu mal" });
            else return res.status(200).send(users);
        });
    }

    static returnUserProfile(req, res) {
        // Get data
        User.find({ _id: req.params.id }).lean().exec((error, user) => {
            try {
                res.status(200).send(user);
            } catch (error) {
                res.status(500).send({ error: "Alguma coisa correu mal mas não é culpa tua :)" });
            }
        });
    }

    static editUser(req, res, next) {
        User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (error) => {
            if (error){ 
                return res.status(400).send({ error: "Não foi possivel atualizar o perfil" });
                
            }
            else {
                return res.status(200).send({ success: "Perfil atualizado com sucesso" });
            }
        })
    }

    static async login(req, res, next) {
        try {
            console.log("i ran")
            const { username, password } = req.body;
            const user = await User.findOne({ username: username }).lean();
            console.log(user)
            if (!user) {
                return res.status(400).send({ hasUsernameError: "O nome de utilizador que inseriu não existe" })
            }

            const isPasswordValid = bcrypt.compareSync(password, user.password);
            console.log(isPasswordValid)
            if (!isPasswordValid) {
                return res.status(400).send({ hasPasswordError: "A password que inseriu está incorreta" })
            }

            res.send({ user: user, token: jwtSignUser(user) });
        } catch (error) {
            res.status(500).send({ error: "Alguma coisa correu mal, mas não é culpa tua :)" });
        }
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
