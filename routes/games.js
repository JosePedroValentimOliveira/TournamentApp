const express = require("express");
const router = express.Router();
const games = require('../public/json/games.json');
const Player = require('../models/User');


games.forEach(game => {
    let link = game.name.split(" ").join("");
    router.get(`/${link}`,(req,res)=>{
        
        res.render('signup', {foto:`../images/${game.short}_Logo.png`,action:`/signup/${link}`,title:game.name});
    })


    router.post(`/${link}`,(req,res)=>{
        
        const {name,ign,unique,game}= req.body;
       
        let errors = [];

        Player.findOne({ign:`${ign} ${unique}`,game:game})
        .then((player)=>{
            if(player){
               
                req.flash('error_msg',`${ign} is already registered for ${game}`)
                res.redirect(`/signup/${link}`);
                
               
            }
            else{
                const newPlayer = new Player({name:name,ign:`${ign} ${unique}`,game:game});
                newPlayer.save()
                .then((player)=>{
                    req.flash('success_msg', `${player.ign} is now registered for ${game}`)
                    res.redirect('/');
                })
                .catch(err=>console.log(err));
            }
        }).catch();
        
    })

});





module.exports = router;