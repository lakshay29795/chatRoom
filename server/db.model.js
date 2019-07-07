var mongoose = require('mongoose');

var schema = mongoose.Schema;

var userSchema = new schema ({
    username: String,
    password: String,
    name: String,
    email: String,
    profilePicture: String,
    friends: Array,
    groups: Array,
    isActive: {
        type: Boolean, // to check if user already signed in somewhere, will  use later
        default: false,
    }
});

var groupSchema = new schema({
    members: Array,
    admin: String,
});
var msgSchema = new schema ({
    user: String,
    msg: String,
    type: String,
    time: String,
});

module.exports = {
    mesg : mongoose.model('mesg', msgSchema),
    users : mongoose.model('user', userSchema),
    groups : mongoose.model('group', groupSchema),
};