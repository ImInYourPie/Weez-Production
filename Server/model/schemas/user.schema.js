const mongoose = require("mongoose");
// const trophySchema = require("./trophy.schema.js");

// Schema variable
const Schema = mongoose.Schema;

// Users
//Os users assumem 2 tipos: 0 - Moderator // 1 - Student
const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
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
        default: "http://i.imgur.com/AItCxSs.jpg"
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
    }
    // trophies: [trophySchema]
});

// Create model
const User = mongoose.model('User', userSchema);

// Export model
module.exports = User;