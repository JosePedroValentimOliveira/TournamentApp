const express = require("express");
const router = express.Router();
const games = require('../public/json/games.json');
const Player = require('../models/User');



games.forEach(game => {
    let link = game.name.split(" ").join("");

    router.get(`/${link}`, (req, res) => {
        Player.find({game:link}).then(players=>
            res.render('list',{players:JSON.stringify(players)}));

       
    })
})




module.exports = router;