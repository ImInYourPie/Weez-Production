const mongoose = require("mongoose");
const questionSchema = require("./question.schema.js");
const userSchema = require("./user.schema.js");

// Schema variable
const Schema = mongoose.Schema;


const commentSchema = new Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userSchema'
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'questionSchema'
    },
    description: {
        type: String,
        required: true
    },
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
    }

});

// Create model
const Comment = mongoose.model('Comment', commentSchema);

// Export model
module.exports = Comment;
