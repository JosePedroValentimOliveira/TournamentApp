const express = require("express");
const router = express.Router();
const games = require('../public/json/games.json');

games.forEach(game => {
    let link = game.name.split(" ").join("");
    router.get(`/${link}`,(req,res)=>{
        
        res.render('signup', {foto:`../images/${game.short}_Logo.png`});
    })
});

module.exports = router;