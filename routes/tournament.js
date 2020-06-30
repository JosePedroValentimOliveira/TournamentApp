const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const Event = require('../models/Event');

 function searchCode(code) {
    return  Event.find({ eventCode: code }).then((event)=>{return event;});
    
}





router.get('/new', ensureAuthenticated, (req, res) => {

    res.render('tournament');
});
router.post('/newEvent', ensureAuthenticated, async (req, res) => {

    const { name, description, game, type, format, maxPlayers, startDate } = req.body;
    const username = req.user.username;

    let eventCode = Math.random().toString(36).substr(2, 8);

    
    let length = 1;
      while (length>0) {
        let test = await searchCode(eventCode);
        
        if(test.length){
            console.log(`${eventCode} found - Generate new code`)
            eventCode = Math.random().toString(36).substr(2, 8);
        }
        else{

            console.log(`${eventCode} not found - Add new event`);

            const link = `${req.get('host')}/${eventCode}`;
            const newEvent = new Event({
                name, description, game, type, format, signupLink: link, fee: 0, maxPlayers, startDate, organiser: username, eventCode
            })


            newEvent.save()
                .then(event => {
                    console.log(event);
                    res.redirect('/dashboard')
                })
                .catch(err => console.log(err));
        }
        length = test.length;
      }

   

});








module.exports = router;