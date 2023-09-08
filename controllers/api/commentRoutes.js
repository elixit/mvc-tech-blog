// added required modules

const express = require("express");
const router = express.Router();
const {Login, Upload, Comment} = require("../../models");
const { where } = require("sequelize");
// requesting comment information 
router.get('/id', (req, res) => {
    Comment.findAll({include:[Login, Upload]})
        .then(dbComment => res.json(dbComment))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.get("/id", (req, res) => {
    Comment.findByPk({
           where: {
        id: req.params.id
      }
    })
    .then(dbComment => res.json(dbComment))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});
  


// creating comment in body under users info *needs fixing
router.post("/", (req, res) => {
    if(!req.session.user){
      return res.status(401).json({err})
  }
    Comment.create({
      body:req.body.body, userId:req.session.user.id, blogId:req.body.blogId
    })
      .then(newComment => {
        res.json(newComment);
      })
      .catch(err => {
        res.status(500).json({err});
      });
});
// update edited comment
router.put("/id", (req, res) => {
    if(!req.session.user){
        return res.status(401).json({err})
    }

    Comment.update(req.body, {
      where: {id: req.params.id}
    }).then(updatedComment => {
     
      
      res.json(updatedComment);
    })
    .catch(err => {
      res.status(500).json({err});
    });
});

router.delete("/id", (req, res) => {
    if(!req.session.user){
        return res.status(401).json({err})
    }
// delete comment
    Comment.destroy({
      where: {
        id: req.params.id
      }
    }).then(delComment => {
      res.json(delComment);
    })
    .catch(err => {
      res.status(500).json({err});
    });
});
  
module.exports = router;