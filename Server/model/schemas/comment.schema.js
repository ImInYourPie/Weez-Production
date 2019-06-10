const mongoose = require("mongoose");

// Schema variable
const Schema = mongoose.Schema;

// Comments
const commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    description: {
        type: String,
        required: true
    },
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
    }
});

// Create model
const Comment = mongoose.model('Comment', commentSchema);

// Export model
module.exports = Comment;
