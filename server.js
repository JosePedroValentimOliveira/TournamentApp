const express = require('express');
const app = express();
const admin = require("firebase-admin");
const serviceAccount = require('./keys/dawn-s-fireflies-signup-firebase-adminsdk-pwxtz-2c259bf0b9.json');



app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use('/signup',require('./routes/games'));

app.get('/',(req,res)=>{
    res.render('index');
})




 


app.listen(app.get('port'), () => {
    console.log(`Express started on http://localhost:${
      app.get('port')}; press Ctrl-C to terminate.`);
  });