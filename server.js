const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

require('./config/db')
require('./config/passport')(passport);

app.use(express.json());

app.use(expressLayouts);
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


// Bodyparser
app.use(express.urlencoded({extended:false}));

//Express Session
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized :true
}));

//Passport middleware

app.use(passport.initialize());
app.use(passport.session());

//connect flash

app.use(flash());

//global vars
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})


//routes

app.use('/',require('./routes/users'));
app.use('/',require('./routes/signupLinks'));
app.use('/tournament',require('./routes/tournament'));
app.get('/display-picks',(req,res)=>{
    res.render('pairing');
});
app.get('/',(req,res)=>{
    res.render('index');
});







//pagina 404
app.use(function(req,res){
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

//pagine 500 (= interne serverfout)
app.use(function(req,res){
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});


app.listen(app.get('port'), () => {
    console.log(`Express started on http://localhost:${
      app.get('port')}; press Ctrl-C to terminate.`);
  });