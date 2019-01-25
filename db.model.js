var mongoose = require('mongoose');

var schema = mongoose.Schema;

var userSchema = new schema ({
    username: String,
    socketId: String,
    
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
};