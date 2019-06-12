const mongoose = require("mongoose");

// Schema variable
const Schema = mongoose.Schema;

// Tags
const recentlyViewedSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
});

const RecentlyViewed = mongoose.model('Tag', recentlyViewedSchema);

module.exports = RecentlyViewed;