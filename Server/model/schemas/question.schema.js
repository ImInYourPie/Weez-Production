const mongoose = require("mongoose");
const tagSchema = require("./tag.schema.js");
const userSchema = require("./user.schema.js");

// Schema variable
const Schema = mongoose.Schema;


const questionSchema = new Schema({
    // _id: mongoose.Schema.Types.ObjectId,
//    user: {
//         type: Schema.Types.ObjectId,
//         ref: "userSchema",
//         required: true
//     },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    // tags: [{
    //     type: Schema.Types.ObjectId,
    //     ref: "tagSchema",
    //     required: true
    // }],
    upVotes: {
        type: Number,
        default: 0
    },
    downVotes: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
});

// Create model
const Question = mongoose.model('Question', questionSchema);

// Export model
module.exports = Question;