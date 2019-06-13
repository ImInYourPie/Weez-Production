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
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const RecentlyViewed = mongoose.model('RecentlyViewed', recentlyViewedSchema);

module.exports = RecentlyViewed;