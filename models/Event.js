const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    name: {type:String,required: true},
    description:{type:String,required:false},
    game:{type:String,required:true},
    type:{type:String,required:true},
    format:{type:String,required:true},
    signupLink:{type:String,required:true},
    fee:{type:Number,required:true},
    maxPlayers:{type:Number,required:false},
    startDate:{type:Date,required:false},
    organiser:{type:String,required:true},
    eventCode:{type:String,required:true}
});

const Event = mongoose.model('Event',EventSchema,'Events');
module.exports = Event;