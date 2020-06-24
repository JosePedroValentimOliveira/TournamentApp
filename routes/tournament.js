const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const Event = require('../models/Event');

function searchCode(code) {
    Event.find({ eventCode: code }).then((event) => {
        if (event) { console.log(true) }
        else { console.log(false); }
    }).catch();
}





router.get('/new', ensureAuthenticated, (req, res) => {

    res.render('tournament');
});
router.post('/newEvent', ensureAuthenticated, (req, res) => {

    const { name, description, game, type, format, maxPlayers, startDate } = req.body;
    const username = req.user.username;

    const eventCode = '13lsvw49';
    console.log(searchCode(eventCode));




});



function checkCode(code) {
    const eventCode = code;
    Event.findOne({ eventCode: eventCode }).then((event) => {
        if (event) {
            return true;
        }
        else {
            const link = `${req.get('host')}/${username}/${eventCode}`;
            const newEvent = new Event({
                name, description, game, type, format, signupLink: link, fee: 0, maxPlayers, startDate, organiser: username, eventCode
            })


            newEvent.save()
                .then(event => {

                    res.redirect('/dashboard')
                })
                .catch(err => console.log(err));
        }

    }).catch();

}














module.exports = router;