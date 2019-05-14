// Schema variable
var Schema = global.mongoose.Schema;

// Users
var questionSchema = new Schema({
    title: String,
    description: String,
    tags: [],
    datePost: Date(),
    upVotes: Number(),
    downVotes: Number(),
    subject: [],
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comment_id: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }
});


// Create model
var Question = global.mongoose.model('Question', questionSchema);

// Export model
module.exports = Question;
