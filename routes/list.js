const express = require("express");
const router = express.Router();
const games = require('../public/json/games.json');
const Player = require('../models/User');


games.forEach(game=>{
    let link = game.name.split(" ").join("");
    Player.find({game:link},(err, players)=>{
        let playerMap = [];
    
        players.forEach(player=>{
            playerMap.push(player.ign);
        })
        router.get(`/${link}`,(req,res)=>{
        
            res.render('list', {foto:`../images/${game.short}_Logo.png`,title:game.name,playerList: JSON.stringify(playerMap)});
        })   
    })

    
})

module.exports = router;

