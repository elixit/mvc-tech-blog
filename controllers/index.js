// Routers with users, blogRoutes, commentRoutes, frontend, and request session exported to modules

const express = require('express');
const router = express.Router();

const userRoutes = require("./api/userRoutes.js");
router.use("/api/users",userRoutes)

const blogRoutes = require("./api/blogRoutes");
router.use("/api/blogs",blogRoutes)

const commentRoutes = require("./api/commentRoutes");
router.use("/api/comment",commentRoutes)

const frontEnd = require("./frontendRoutes");
router.use("/",frontEnd)

router.get("/showsessions",(req,res)=>{
    res.json(req.session)
})

module.exports = router;