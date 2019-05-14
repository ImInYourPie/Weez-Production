// Schema variable
var Schema = global.mongoose.Schema;

// Users
var commentSchema = new Schema({
    user_id:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    question_id:{
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    description: String,
    datePost: Date(),
    upVotes: Number(),
    downVotes: Number()
});


// Create model
var Comment = global.mongoose.model('Comment', commentSchema);

// Export model
module.exports = Comment;