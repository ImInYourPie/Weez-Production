// Schema variable
var Schema = global.mongoose.Schema;

// Users
var usertestSchema = new Schema({
    email: String,
    password: {
        type: String,
        required: true
    }
    
});

// Create model
var UserTest = global.mongoose.model('UserTest', usertestSchema);

// Export model
module.exports = {
    dbusertest: UserTest
};