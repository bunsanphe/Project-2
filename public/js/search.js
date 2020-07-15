let searchTerm = "";

console.log("search.js loaded");

$(document).ready(() => {
  $("#submit").click(() => {
    searchTerm = $("#Search").val();

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
  });


  $(document).on("click", ".dropdown-item", (event) => {
    console.log(event.target.id);
  });
});

function listResults(results, playlists) {
  $("#results").prepend($("<h2>Results</h2><br>"));

  //console.log(playlists);

  //console.log(dropdown);

  results.data.forEach(result => {
    //console.log(result);

    const dropdown = $("<div class=\"dropdown\"></div>");
  const addBtn = $("<button class=\"btn btn-secondary dropdown-toggle\" type=\"button\" id=\"dropdownMenuButton\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Add To Playlist</button>");
  const ddMenu = $("<div class=\"dropdown-menu\" aria-labelledby=\"dropdownMenuButton\"></div>");
  
  playlists.forEach(playlist => {
    const menuItem = $(`<button class="dropdown-item" type="button" id="${playlist.id}">${playlist.playlistName}</button>`);
    ddMenu.append(menuItem);
  });

  dropdown.append(addBtn);
  dropdown.append(ddMenu);

    const li = $("<li></li>");
    const title = $(
      `<a href=${result.link}><h4>Title: ${result.title}</h4></a>`
    );
    const artist = $(
      `<img src=${result.artist.picture_small}><p>Artist: ${result.artist.name}</p>`
    );
    const album = $(
      `<img src=${result.album.cover_small}><p>Album: ${result.album.title}</p>`
    );
    const sample = $(`<p>Sample</p><audio controls>
    <source src="${result.preview}" type="audio/mpeg">
    Your browser does not support the audio tag.
  </audio>`);

    li.append(title)
      .append(artist)
      .append(album)
      .append(sample)
      .append(dropdown);

    $("#resList").append(li);
  });
}

