const express = require('express');
const pool = require('../database');
const router = express.Router();
const {isLoggedIn} = require('../lib/auth')

router.get('/add',isLoggedIn, (req,res)=>{
    res.render('leaf/add');
})

router.post('/add',isLoggedIn, async (req,res)=>{
    const {nombre, imagen, descripcion} = req.body;
    const newLeaf = {
        nombre,
        imagen,
        descripcion,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO leafenfermedades set ?',[newLeaf]);
    req.flash('success','leaf saved successfully');
    res.redirect('/leaf');

});

router.get('/',isLoggedIn, async(req, res)=>{
    const leaf = await pool.query('SELECT * FROM leafenfermedades WHERE user_id = ?',[req.user.id]);
    res.render('leaf/list', {leaf});
});

router.get('/delete/:id',isLoggedIn,async(req,res)=>{
    const {id} = req.params;
    await pool.query('DELETE FROM leafenfermedades WHERE leafId=?',[id]);
    req.flash('success','leaf Removed successfully');
    res.redirect('/leaf');
});

router.get('/edit/:id',isLoggedIn, async(req,res)=>{
    const {id} = req.params;
    const leaf = await pool.query('SELECT * FROM leafenfermedades WHERE leafId=?',[id]);
    res.render('leaf/edit',{leaf: leaf[0]});
});

router.post('/edit/:id',isLoggedIn, async(req,res)=>{
    const {id} = req.params;
    const {nombre, imagen, descripcion} = req.body;
    const newLeaf = {
        nombre,
        imagen,
        descripcion
    };
    await pool.query('UPDATE leafenfermedades set ? WHERE leafId = ?',[newLeaf, id]);
    req.flash('success','leaf Update Successfully');
    res.redirect('/leaf')
});

module.exports = router;