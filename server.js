const express = require('express');
const app = express();


const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');

require('./config/db')


app.use(express.json());




app.use(expressLayouts);
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


app.use(express.urlencoded({extended:false}));

app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized :true
}));

app.use(flash());

app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

app.use('/signup',require('./routes/games'));
app.use('/list',require('./routes/list'));

app.get('/',(req,res)=>{
    res.render('index');
})



app.listen(app.get('port'), () => {
    console.log(`Express started on http://localhost:${
      app.get('port')}; press Ctrl-C to terminate.`);
  });