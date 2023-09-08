// added required modules
const express = require("express");
const router = express.Router();
const withAuth = require('../../util/auth.js')
const {Login, Upload, Comment} = require("../../models");

// using express to get blogroutes endpoint to respond to user request 
router.get('/', withAuth, (req, res) => {
  Post.findAll({
    where: {
      userId: req.session.userId,
    },
    attributes: ['id', 'title', 'content', 'created_at'],
    order: [['created_at', 'DESC']],
    include: [
      {
        model: Upload,
        attributes: ['id', 'comment', 'postId', 'userId', 'created_at'],
        include: {
          model: Login,
          attributes: ['username'],
        },
      },
      {
        model: Login,
        attributes: ['username'],
      },
    ],
  })
  // creating array for post data, rendering dashboard with login in fo for session
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render('dashboard', { posts, loggedIn: true, username: req.session.username,});       
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
  });
});
// request response to include login, comment upon upload
router.get("/:id", (req, res) => {
    Upload.findByPk(req.params.id,{include:[Login, Comment]})
      .then(dbUpload => {
        res.json(dbUpload);
      })
      .catch(err => {
        res.status(500).json({err});
      });
});

// submits data to upload content with login info
router.post("/", (req, res) => {
    if(!req.session.user){
      return res.status(401).json({err})
    }
  
    Upload.create({
      title:req.body.title, content:req.body.content, userId:req.session.user.id
    })

      .then(newUpload => {
        res.json(newUpload);
      })
      .catch(err => {
        res.status(500).json({err});
      });
});

// updates edited blog
router.put("/:id", (req, res) => {
  if(!req.session.user){
    return res.status(401).json({err})
  }
  Upload.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(updatedUpload => {
      res.json(updatedUpload);
    })
    .catch(err => {
      res.status(500).json({err});
    });
});
// deletes chosen blog
router.delete("/:id", (req, res) => {
  if(!req.session.user){
    return res.status(401).json({err})
  }
    Upload.destroy({
      where: {
        id: req.params.id
      }
    }).then(delUpload => {
      res.json(delUpload);
    })
    .catch(err => {
      res.status(500).json({err});
    });
});
  
module.exports = router;