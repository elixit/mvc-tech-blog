// seeds for users, blogs, and comments structured
const sequelize = require("../config/connection")
const {Login,Upload,Comment} = require("../models")

const users = [
    
    {
        username: "hello123",
        password: "1234444"
    },

]

const blogs = [
    {
        title: "test",
        content: "hello",
        userId: 1
    },
   
]

const comment = [
    {
        body: "test 2!",
        content: "comment",
        userId: 1
    },
   

]
// upon login, Upload and login will request seeeds to be used as display structure
const plantSeeds = async ()=>{
    try{
        await sequelize.sync({force:true})
        await Login.bulkCreate(users,{
            individualHooks:true
        });
        await Upload.bulkCreate(blogs);
        await Comment.bulkCreate(comment);
        process.exit(0);
    } catch(err){
    }
}

plantSeeds()