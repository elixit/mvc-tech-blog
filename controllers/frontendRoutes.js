const express = require('express');
const router = express.Router();
const {Login,Upload, Comment} = require('../models');

// added handlebars to router request with user info and their blog, renders to homepage. If True, their session is created.
router.get('/', (req, res) => {
    Upload.findAll({include: [Login]}).then(blogs => {
        const handlebarsBlogs = blogs.map(blog=>blog.get({plain:true}))
        const loggedIn = req.session.user?true:false;
        
        // rendering info to handlebars on home page
        res.render('home', {blogs:handlebarsBlogs, loggedIn, username:req.session.user?.username})
    })
})
// login response redirected on to dashboard

// signup option rendered
router.get("/signup",(req,res)=>{
    res.render("signup")
})

// adding login option to dashboard
router.get("/login",(req,res)=>{
    if(req.session.user){
        return res.redirect("/dashboard")
    }
    res.render("login")
})
// direct user to login page
router.get("/dashboard",(req,res)=>{
    if(!req.session.user) {
        return res.redirect('/login')
    }
    Login.findByPk(req.session.user.id, {
        include: [Upload, Comment]
    }).then(userData => {
        const handlebarsData = userData.get({plain:true})
       handlebarsData.loggedIn = req.session.user?true:false
        res.render("dashboard", handlebarsData)
    })
})
// upon login, blogs request session is rendered with upload content
router.get("/blogs/:id", (req, res) =>{
    if(!req.session.user) {
        return res.redirect('/login')
    }
    Upload.findByPk(req.params.id,{include:[Login, {model: Comment, include: [Login]}]})
    .then(dbUpload => {
        const handlebarsUpload = dbUpload.get({plain:true})
        const loggedIn = req.session.user?true:false;
        if (dbUpload.userId != req.session.user.id) {
            return res.render('comment', {handlebarsUpload, loggedIn, username:req.session.user?.username})
        }

        res.render("uploadControls", {handlebarsUpload, loggedIn, username:req.session.user?.username})
      })
      .catch(err => {
        res.status(500).json({err});
      });
})

router.get("",(req,res)=>{
    res.redirect("/")
})

module.exports = router;