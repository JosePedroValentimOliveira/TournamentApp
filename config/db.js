const mongoose = require('mongoose');
const db = require('../config/keys.js').MongoURI;


mongoose.connect(db,{useNewUrlParser : true,useUnifiedTopology:true})
.then(()=>console.log('mongoDB Connected'))
.catch((err)=>console.log(err));