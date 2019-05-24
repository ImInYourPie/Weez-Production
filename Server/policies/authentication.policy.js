const Joi = require("joi");

module.exports = {
    
    register(req, res, next){
        const schema = {
            username: Joi.string(),
            email: Joi.string().email(),
            password: Joi.string().regex(
                new RegExp("^[a-zA-Z0-9]{6,32}$")
            ),
            passwordConfirm: Joi.string().valid(Joi.ref("password"))
            
        }
        
        const {error, value} = Joi.validate(req.body, schema);
        
        if(error) {
            switch(error.details[0].context.key) {
                case "username":
                    res.status(400).send({
                        hasUsernameError: "O nome de utlizador não é valido"
                    })
                    break
                case "email": 
                    res.status(400).send({
                        hasEmailError: "O email não é valido"
                    })
                    break
                case "password": 
                    res.status(400).send({
                        hasPasswordError: "A password tem de ser entre 6 e 32 caracteres e conter apenas minusculas, maiusculas e numeros"
                    })
                    break
                case "passwordConfirm":
                    res.status(400).send({
                        hasPassConfirmError: "As passwords não coincidem"
                    })
                    break
                default:
                    res.status(500).send({
                        error: "Algo correu mal"
                    })
            }
        } else {
            next();
        }
    }
    
}