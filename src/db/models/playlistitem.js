'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlaylistItem = sequelize.define('PlaylistItem', {
    songId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Songs",
        key: "id"
      }
    },
    playlistId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Playlists",
        key: "id"
      }
      }
    },
    {});
  PlaylistItem.associate = function(models) {
    // associations can be defined here
  };
  return PlaylistItem;
};