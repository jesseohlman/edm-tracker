'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sound: {
      type: DataTypes.STRING,
      allowNull: false
    },
    playCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
  }, {});
  Song.associate = function(models) {
    // associations can be defined here

    Song.belongsToMany(models.Playlist, {
      through: "PlaylistItem",
      as: "playlists",
      foreignKey: "songId"
    });

    Song.hasMany(models.Favorite, {
      foreignKey: "songId",
      as: "favorites"
    });

    Song.prototype.getFavorites = function(userId){
      if(!this.favorites){return false}
      var favCheck = this.favorites.filter((fav) => fav.userId === userId);

      if(favCheck[0]){
        return true;
      } else {
        return false;
      }
    }
  };
  return Song;
};