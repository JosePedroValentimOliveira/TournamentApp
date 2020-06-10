  
//data model voor een user

const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name:{type: String, required: true},
    ign:{type: String, required: true},
    game:{type: String, required:true}
});

const Player = mongoose.model('Player',UserSchema,'Signups');
module.exports = Player;