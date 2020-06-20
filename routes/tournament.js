const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');


router.get('/new',ensureAuthenticated,(req,res)=>{

    res.render('tournament');
});




module.exports = router;