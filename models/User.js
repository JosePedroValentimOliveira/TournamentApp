const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:{type: String, required: true},
    username:{type: String, required: true},
    email:{type: String, required: true},
    password:{type: String, required: true},
    playerInEvent:{type: Array, default: []}

});

const User = mongoose.model('User',UserSchema,'Users');
module.exports = User;