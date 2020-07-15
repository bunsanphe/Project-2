const db = require("../models");

module.exports = function(app) {
  //create song
  app.post("/api/song", (req, res) => {
    db.Song.create({
      songApiId: req.body.apiId,
      artist: req.body.artist,
      songTitle: req.body.songTitle,
      album: req.body.album,
      PlaylistId: req.body.PlaylistId
    }).then(dbSong => {
      res.json(dbSong);
    });
  });

  

};
