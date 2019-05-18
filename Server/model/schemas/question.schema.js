const mongoose = require("mongoose");
// const tagSchema = require("./tag.schema.js");
const userSchema = require("./user.schema.js");

// Schema variable
const Schema = mongoose.Schema;


const questionSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {
       type: Schema.Types.ObjectId,
        ref: userSchema,
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
    /* tags: {
        type: [tagSchema],
        required: true
    },*/
    date: {
        type: Date,
        required: true
    },
    
    // trophies: [trophySchema]
});

// Create model
const Question = mongoose.model('Question', questionSchema);

// Export model
module.exports = Question;