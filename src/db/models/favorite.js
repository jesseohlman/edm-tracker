'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    songId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Favorite.associate = function(models) {
    // associations can be defined here
    Favorite.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });

    Favorite.belongsTo(models.Song, {
      foreignKey: "songId",
      onDelete: "CASCADE"
    });
  };
  return Favorite;
};