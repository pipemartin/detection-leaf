const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../lib/auth')

router.get('/detection',isLoggedIn,(req, res)=>{
    res.render('detection/detection');
});

module.exports = router;