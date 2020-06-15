const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


//Load User Model

const Admin = require('../models/Admin');

module.exports = (passport)=>{
    passport.use(new LocalStrategy({
        usernameField:'email'
    },(email,password,done)=>{
        Admin.findOne({email:email}).then(user=>{

            //Match User
            if(!user){
                return done(null,false,{message:'Email is not registered'});
            }

            //match password
            bcrypt.compare(password,user.password,(err,isMatch)=>{
                if(err)throw err;
                if(isMatch){
                    return done(null, user);
                }
                else{
                    return done(null,false,{message:'Password is incorrect'})
                }
            })
        }).catch(err=>console.log(err))
    })
    );
    
    passport.serializeUser(function(user,done){
        done(null,user.id);
    });
    passport.deserializeUser(function(id,done){
        Admin.findById(id,function(err,user){
            done(err,user);
        });
    });
}