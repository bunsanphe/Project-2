const router = require("express").Router();

const Playlist = require("../models/playlist");

router.get("/playlist", (req, res) => {
  Playlist.all("*", results => {
    res.render("playlist", {
      playlist: results
    });
  });
});

module.exports = router;
