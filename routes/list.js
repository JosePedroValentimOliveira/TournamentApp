const express = require("express");
const router = express.Router();
const Player = require('../models/User');
const { ensureAuthenticated } = require('../config/auth');



    router.get(`/dashboard`, ensureAuthenticated, async (req, res) => {
        let userInfo;
        Player.findById({_id : req.user.id},(err,succes)=>{
            if(err){
                console.log(err);
            }
            else{
                userInfo = req.user;
            }
        })
        
        
        Player.find().then(players=>
            
            res.render('dashboard',{players:JSON.stringify(players)}));

    })





module.exports = router;