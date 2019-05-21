const LocalStrategy = require("passport-local").Strategy;
const UserSchema = require("../model/schema/user.schema.js");
const config = require("../config/database.js");
const bcrypt = require("bcrypt");


module.exports = (password) => {
    // Local strategy
    passport.use(new LocalStrategy((username, password, done) => {
        let query = {username: username};
        UserSchema.findOne(query, (err, user) => {
            if(err) throw err;
            if(!user){
                return done(null, false, {message: "Nome de utilizador errado!"})
            }
            
            // Compare password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: "Password incorreta!"});
                }
            })
        })
    }));
    
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        UserSchema.findById(id, function(err, user) {
            done(err, user);
        });
    });
}