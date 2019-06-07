const mongoose = require("mongoose");
const Tag = require("./tag.schema.js");
const User = require("./user.schema.js");
const Comment = require("./comment.schema");

// Schema variable
const Schema = mongoose.Schema;


const questionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        required: true
    }],
    upVotes: [{
        type: String,
    }],
    downVotes: [{
        type: String,
    }],
    voteCount: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment",
        default: []
    }],
    views: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        default: []
    }]
});

// Create model
const Question = mongoose.model('Question', questionSchema);

// Export model
module.exports = Question;