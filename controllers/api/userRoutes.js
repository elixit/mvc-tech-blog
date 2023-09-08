const express = require("express");
const router = express.Router();
const bcrypt  = require("bcrypt");
const {Login, Upload, Comment} = require("../../models/");
// request upload/comment if user logs in
router.get("/", (req, res) => {
    Login.findAll({
      include:[Upload, Comment]
    })
      .then(dbUsers => {
        res.json(dbUsers);
      })
      });

// request to end session when user logs out
router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect('/');
})

router.get("/:id", (req, res) => {
    Login.findByPk(req.params.id,{include:[Upload, Comment]})
      .then(dbLogin => {
        res.json(dbLogin);
      })
      .catch(err => {
        res.status(500).json({err});
      });
});

// when user signs up, session is created with new id/username
router.post("/", (req, res) => {

    Login.create(req.body, {individualHooks: true} )
      .then(newLogin => {
        req.session.user = {
          id:newLogin.id,
          username:newLogin.username
        }
        res.json(newLogin);
      })
      .catch(err => {
        
        res.status(500).json({err});
      });
});
// searches for existing user
router.post("/login", (req, res) => {
    Login.findOne({
      where:{
      username:req.body.username
    }

  }).then(foundLogin=>{
      if(!foundLogin){
        return res.status(400).json({err})
      }
      if(bcrypt.compareSync(req.body.password,foundLogin.password)){
        req.session.user = {
          id:foundLogin.id,
          username:foundLogin.username
        }

        // if user matches database,  their session is executed
        return res.json(foundLogin)
      } else {
        return {err}
      }
    }).catch(err => {
        res.status(500).json({err});
      });
});
  
router.put("/:id", (req, res) => {
    Login.update(req.body, {
      where: {
        id: req.params.id
      },
      individualHooks: true
    }).then(updatedLogin => {
      res.json(updatedLogin);
    })
    .catch(err => {
      res.status(500).json({err});
    });
});
  
router.delete("/:id", (req, res) => {
    Login.destroy({
      where: {
        id: req.params.id
      }
    }).then(delLogin => {
      res.json(delLogin);
    })
    .catch(err => {
      res.status(500).json({err});
    });
  });

module.exports = router;