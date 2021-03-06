const db = require("../models");
// const passport = require("../config/passport");
// const playlist = require("../models/playlist");

module.exports = function(app) {
  // Create route that displays the list of all playlists
  app.get("/api/playlist", (req, res) => {
    db.Playlist.findAll({
      where: {
        UserId: req.user.id
      }
    }).then(dbPlaylist => {
      res.json(dbPlaylist);
    });
  });

  //create playlist
  app.post("/api/playlist", (req, res) => {
    db.Playlist.create({
      playlistName: req.body.playlistName,
      UserId: req.user.id
    }).then(dbPlaylist => {
      res.json(dbPlaylist);
    });
  });

  // route to select one playlist
  app.get("/api/playlist/:id", (req, res) => {
    db.Playlist.findOne({
      where: {
        id: req.params.id
      }
    }).then(dbPlaylist => {
      res.json(dbPlaylist);
    });
  });

  // route to update playlist
  app.put("/api/playlist", (req, res) => {
    db.Playlist.update(req.boy, {
      where: {
        id: req.body.id
      }
    }).then(dbPlaylist => {
      res.json(dbPlaylist);
    });
  });
  // Create route to add song to playlist

  // Create route to delete song(s) from playlist

  // Create route to delete playlist
  app.delete("/api/playlist/:id", (req, res) => {
    db.Playlist.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbPlaylist => {
      res.json(dbPlaylist);
    });
  });
};
