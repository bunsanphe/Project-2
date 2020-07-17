/* eslint-disable quotes */

console.log("search.js loaded");

$(document).ready(() => {
  $("#results").hide();
  $("form").on("submit", event => {
    event.preventDefault();
    search($("#search").val());
  });

  $("#submit").click(event => {
    event.preventDefault();
    search($("#search").val());
  });

  $(document).on("click", ".dropdown-item", event => {
    addToPlaylist(event.target.id, event.target.value);
  });
});

function listResults(results, playlists) {
  $("#results").show();
  $("#resList").empty();
  //console.log(playlists);

  //console.log(dropdown);

  results.data.forEach(result => {
    //console.log(result);

    const dropdown = $('<div class="dropdown"></div>');
    const addBtn = $(
      '<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Add To Playlist</button>'
    );
    const ddMenu = $(
      '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton"></div>'
    );
    playlists.forEach(playlist => {
      const menuItem = $(
        `<button class="dropdown-item" type="button" value="${result.id}" id="${playlist.id}">${playlist.playlistName}</button>`
      );
      ddMenu.append(menuItem);
    });

    dropdown.append(addBtn);
    dropdown.append(ddMenu);

    const card = $(`<div class="card" style="width: auto"></div>`);
    const cardTitle = $(
      `<div class="card-title"><a href=${result.link}>${result.title}</a></div>`
    );
    const cardBody = $(`<div class="card-body"></div>`);
    const cardRow = $(`<div class="row"></div>`);
    const cardCol1 = $(`<div class="col-xs-12 col-sm-6 col-no-padding"></div>`);
    const artistImg = $(`<img src="${result.artist.picture_medium}">`); // add link to artist
    const artistTitle = $(`<p>Artist: ${result.artist.name}</p>`); // add link to artist
    const cardCol2 = $(`<div class="col-xs-12 col-sm-6 col-no-padding"></div>`);
    const albumImg = $(`<img src="${result.album.cover_medium}">`);
    const albumTitle = $(`<p>Album: ${result.album.title}</p>`);
    const cardUl = $(`<ul class="list-group list-group-flush"></ul>`);
    const cardLi1 = $(
      `<li class="list-group-item"><audio controls><source src="${result.preview}" type="audio/mpeg">Your browser does not support the audio tag.</audio></li>`
    );
    const cardLi2 = $(`<li class="list-group-item"></li>`);

    cardLi2.append(dropdown);

    cardUl.append(cardLi1).append(cardLi2);

    cardCol1.append(artistImg).append(artistTitle);
    cardCol2.append(albumImg).append(albumTitle);

    cardRow.append(cardCol1).append(cardCol2);

    cardBody.append(cardRow);
    cardBody.append(cardUl);

    card.append(cardTitle);
    card.append(cardBody);

    $("#results").append(card);
    //   const audioSample = $(`<p>Sample</p><audio controls>
    //   <source src="${result.preview}" type="audio/mpeg">
    //   Your browser does not support the audio tag.
    // </audio>`);

    //   const li = $(`<li></li>`);
    //   const title = $(
    //     `<a href=${result.link}><h4>Title: ${result.title}</h4></a>`
    //   );
    //   const artist = $(
    //     `<img src=${result.artist.picture_small}><p>Artist: ${result.artist.name}</p>`
    //   );
    //   const album = $(
    //     `<img src=${result.album.cover_small}><p>Album: ${result.album.title}</p>`
    //   );
    //   const sample = $(`<p>Sample</p><audio controls>
    //   <source src="${result.preview}" type="audio/mpeg">
    //   Your browser does not support the audio tag.
    // </audio>`);

    //   li.append(title)
    //     .append(artist)
    //     .append(album)
    //     .append(sample)
    //     .append(dropdown);

    //   $("#resList").append(li);
  });
}

function addToPlaylist(playlist, song) {
  const settings = {
    async: true,
    crossDomain: true,
    url: `https://deezerdevs-deezer.p.rapidapi.com/track/${song}`,
    method: "GET",
    headers: {
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
      "x-rapidapi-key": "a6472e3f9fmsh8e0c9042cb99723p17c4a5jsn05d9e87e7640"
    }
  };

  $.ajax(settings).done(apiResponse => {
    $.post("/api/song", {
      songApiId: song,
      artist: apiResponse.artist.name,
      songTitle: apiResponse.title,
      album: apiResponse.album.title,
      PlaylistId: playlist
    }).then(res => {
      console.log(res);
    });
  });
}

function search(searchTerm) {
  const settings = {
    async: true,
    crossDomain: true,
    url: "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + searchTerm,
    method: "GET",
    headers: {
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
      "x-rapidapi-key": "a6472e3f9fmsh8e0c9042cb99723p17c4a5jsn05d9e87e7640"
    }
  };

  //console.log("searchTerm: " + searchTerm);

  $.ajax(settings).done(response => {
    $.get("/api/playlist").then(playlists => {
      listResults(response, playlists);
    });
  });
}
