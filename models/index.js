// connecting login functionality with Uploads and Comment, 
const Login = require("./Login");
const Upload = require("./Upload");
const Comment = require("./Comment");

Login.hasMany(Upload);
Upload.belongsTo(Login);

Upload.hasMany(Comment);
Comment.belongsTo(Upload);

Login.hasMany(Comment);
Comment.belongsTo(Login);



module.exports = {
    Login,
    Upload,
    Comment
}