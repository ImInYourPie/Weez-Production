const Joi = require("joi");

module.exports = {

    register(req, res, next) {
        const schema = {
            username: Joi.string(),
            email: Joi.string().email(),
            password: Joi.string().regex(
                new RegExp("^[a-zA-Z0-9]{6,32}$")
            ),
            passwordConfirm: Joi.string().valid(Joi.ref("password"))

        }

        const { error, value } = Joi.validate(req.body, schema);
        let hasUsernameError = false;
        let hasEmailError = false;
        let hasPasswordError = false;
        let hasPassConfirmError = false;

        if (error) {
            switch (error.details[0].context.key) {
                case "username":
                    hasUsernameError = "O nome de utlizador não é valido"
                case "email":
                    hasEmailError = "O email não é valido"
                case "password":
                    hasPasswordError = "A password tem de ser entre 6 e 32 caracteres e conter apenas minusculas, maiusculas e numeros"
                case "passwordConfirm":
                    hasPassConfirmError = "As passwords não coincidem"
                    break
                default:
                    res.status(500).send({
                        error: "Algo correu mal"
                    })
            }
            res.status(400).send({ hasUsernameError, hasEmailError, hasPasswordError, hasPassConfirmError })
        } else {
            next();
        }
    }

}