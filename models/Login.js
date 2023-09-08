// model created for user login
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require("bcrypt")

class Login extends Model {}

Login.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
    username: {
         type: DataTypes.STRING,
         allowNull:false,
         unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[6]
        }
    }
},{
    hooks:{
        async beforeCreate(userdata){
            userdata.password = await bcrypt.hash(userdata.password,10)
            return userdata
        }
    },
    sequelize,   
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
});

module.exports=Login