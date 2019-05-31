const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");
// const trophySchema = require("./trophy.schema.js");

// Schema variable
const Schema = mongoose.Schema;

// Users

const userSchema = new Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: "https://res.cloudinary.com/iminyourcloud/image/upload/v1559269810/DefaultPic_odfcze.jpg"
    },
    upVotes: {
        type: Number,
        default: 0
    },
    downVotes: {
        type: Number,
        default: 0
    },
    experience: {
        type: Number,
        default: 0
    },
    userType: {
        type: String,
        default: "student",
        required: true
    }
    // trophies: [trophySchema]
});

userSchema.plugin(mongooseUniqueValidator);

// Create model
const User = mongoose.model('User', userSchema);

// Export model
module.exports = User;