const express = require('express');
const router = express.Router();
const Event = require('../models/Event')
const { ensureAuthenticated } = require('../config/auth');

Event.find({}).then((events)=>{
    events.forEach(event=>{
   
        router.get(`/${event.eventCode}`,(req,res)=>{
            res.render('eventPage',{event:event})
        })
        router.get(`/signup/${event.eventCode}`,ensureAuthenticated,(req,res)=>{
            res.render('eventPage',{event:event})
        })
    })
}).catch();

module.exports = router;