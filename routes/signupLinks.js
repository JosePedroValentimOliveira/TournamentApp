const express = require('express');
const router = express.Router();
const Event = require('../models/Event')

Event.find({}).then((events)=>{
    events.forEach(event=>{
        router.get(`/${event.eventCode}`,(req,res)=>{
            res.render('eventPage',{event:event})
        })
    })
}).catch();

module.exports = router;