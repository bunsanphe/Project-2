const db = require("../models");

module.exports = function(app) {
  //get all songs from a playlist
  app.get("/api/song/:id", (req, res) => {
    db.Song.findAll({
      where: {
        PlaylistId: req.params.id
      }
    }).then(dbSongs => {
      res.json(dbSongs);
    });
  });

  //create song in playlist
  app.post("/api/song", (req, res) => {
    db.Song.create({
      songApiId: req.body.songApiId,
      artist: req.body.artist,
      songTitle: req.body.songTitle,
      album: req.body.album,
      PlaylistId: req.body.PlaylistId
    }).then(dbSong => {
      res.json(dbSong);
    });
  });
};
