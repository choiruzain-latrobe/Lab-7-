'use strict';
module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    title: {
      allowNull:false,
      type: DataTypes.STRING,
      validate:{notEmpty: true}},
    content:{
      alloNull:false,
      type:DataTypes.TEXT,
      validate:{notEmpty:true}},
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Post;
};