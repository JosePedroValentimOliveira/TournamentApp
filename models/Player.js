const mongoose = require('mongoose');

const PlayerSchema = mongoose.Schema({
    name: {type:String,required: true},
    ign:{type:String,required:true},
    game:{type:String,required:true}
   
});

const Player = mongoose.model('Player',PlayerSchema,'Signups');
module.exports = Player;