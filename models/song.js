module.exports = function(sequelize, DataTypes) {
  const Song = sequelize.define("Song", {
    songApiId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false
    },
    songTitle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    album: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Song.associate = function(models) {
    Song.belongsTo(models.Playlist, {
      foreignKey: { allowNull: false },
      onDelete: "CASCADE"
    });
  };
  return Song;
};
