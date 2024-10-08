
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth');




//user model
const User = require('../models/User');
const Event = require('../models/Event');
const username = "Zéca";

router.get('/dashboard',ensureAuthenticated, async (req,res)=>{
    Event.find({organiser:username},(err,list)=>{
        res.render('dashboard',{events:JSON.stringify(list)});
    })});





router.get('/login', async(req, res) => {
   
    res.render('login')
})
router.get('/register', (req, res) => res.render('register'));

router.post('/register', (req, res) => {
    const { username,name ,email, password, password2} = req.body;

    let errors = [];
    let usernamebool;
    //check required fields

    if (!username ||!name || !email || !password || !password2) errors.push({ msg: 'Fill in all information' });

    //password control

    if (password != password2) errors.push({ msg: 'Passwords do not match' });

    //password lengte checken

    if (password.length < 8) errors.push({ msg: 'Password needs to be atleast 8 characters long' });

    if (errors.length > 0) res.render('register', {
        errors,username, name, email, password, password2

    })
    else {



        User.findOne({username:username}).then((user)=>{
            if(user){
                usernamebool = true;
            }
        })
        User.findOne({ email: email})
            .then((user) => {

                if(usernamebool){
                    errors.push({ msg: "Username is already in use" })
                    res.render('register', {
                        errors, username,name, email, password, password2
                    })
                }
                else if (user) {
                    errors.push({ msg: "Email is already in use" })
                    res.render('register', {
                        errors, username,name, email, password, password2
                    })
                }
                else {
                    const newUser = new User({
                        name,username, email, password
                    });


                    //hash passwoord
                    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        //set passwoord to hashed
                        newUser.password = hash;

                        //save user
                        newUser.save()
                            .then(user => {
                                
                                res.redirect('/login');
                            })
                            .catch(err => console.log(err));
                    }))
                }
            })
            .catch(); 
    };  
})



//login handle

router.post('/login',(req,res,next)=>{
    
    passport.authenticate('local',{
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash : true
    })(req,res,next);
})




//logout handle

router.get('/logout',(req,res)=>{
    req.logout();
    
    req.flash('success_msg','You were succesfully logged out')
    res.redirect('/login');
    
})
module.exports = router;