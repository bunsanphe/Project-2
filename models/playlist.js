module.exports = function(sequelize, DataTypes) {
  const Playlist = sequelize.define("Playlist", {
    playlistName: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  });
  Playlist.associate = function(models) {
    Playlist.belongsTo(models.User, { foreignKey: { allowNull: false } });
    Playlist.hasMany(models.Song, { foreignKey: { allowNull: false } });
  };
  return Playlist;
};
