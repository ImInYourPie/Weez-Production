// Schema variable
var Schema = global.mongoose.Schema;

// Users
//Os users assumem 2 tipos: 0 - Moderator // 1 - Student
var userSchema = new Schema({
    name: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userType: [{
        type: 0,
        firstName: String(),
        lastName: String(),
        profilePic: String()
    },
    {
        type: 1,
        firstName: String(),
        lastName: String(),
        profilePic: String(),
        courseId: Number(),
        upVotes: Number(),
        downVotes: Number(),
        experience: Number(),
        trophies: String()
    }]
});

// Create model
var User = global.mongoose.model('User', userSchema);

// Export model
module.exports = User;