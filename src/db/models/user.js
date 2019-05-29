'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    favorite1:  {
      type: DataTypes.STRING,
      allowNull: true
    },
    favorite2:  {
      type: DataTypes.STRING,
      allowNull: true
    },
    favorite3:  {
      type: DataTypes.STRING,
      allowNull: true
    },
    role:  {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "member"
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Favorite, {
      foreignKey: "userId",
      as: "favorites"
    });

  };
  return User;
};