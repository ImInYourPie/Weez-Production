const mongoose = require("mongoose");

// Schema variable
const Schema = mongoose.Schema;

// Tags
const watchedQuestionsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
});

const WatchedQuestion = mongoose.model('WatchedQuestion', watchedQuestionsSchema);

module.exports = WatchedQuestion;