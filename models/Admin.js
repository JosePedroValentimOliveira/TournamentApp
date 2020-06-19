const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:{type: String, required: true},
    username:{type: String, required: true},
    email:{type: String, required: true},
    password:{type: String, required: true},
    events:{type: Array, default : []}
  
});

const Admin = mongoose.model('Admin',UserSchema,'Admins');
module.exports = Admin;