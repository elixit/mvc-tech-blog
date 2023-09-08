// structure model for upload content

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Upload extends Model {}

Upload.init({
    title: {
         type: DataTypes.STRING,
         allowNull:false
    },
    content: {
        type:DataTypes.TEXT,
        allowNull:false
    }
},{
    sequelize,   
    freezeTableName: true,
    underscored: true,
    modelName: 'upload',
});

module.exports=Upload