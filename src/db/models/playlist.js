'use strict';
module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Playlist.associate = function(models) {
    // associations can be defined here

    Playlist.belongsToMany(models.Song, {
      through: "PlaylistItem",
      as: "songs",
      foreignKey: "playlistId"});
  };

  Playlist.prototype.getSongs = function(){
    if(!!this.songs) return false;
    console.log(this.songs);
    return this.songs;
  }
  return Playlist;
};