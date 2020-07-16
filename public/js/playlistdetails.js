$(document).ready(() => {
  const playlist = $(".playlist").attr("id");
  console.log("playlist: " + $(".playlist").attr("id"));

  $(document).on("click", "#delete", event => {
    deleteSong(event.target.value);
  });

  $.get(`/api/song/${playlist}`).then(songs => {
    $("#songs").prepend($("<h2>Songs</h2><br>"));
    songs.forEach(song => {
      //const songId = JSON.stringify(song.SongApiId);
      const settings = {
        async: true,
        crossDomain: true,
        url: `https://deezerdevs-deezer.p.rapidapi.com/track/${song.songApiId}`,
        method: "GET",
        headers: {
          "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
          "x-rapidapi-key": "a6472e3f9fmsh8e0c9042cb99723p17c4a5jsn05d9e87e7640"
        }
      };

      $.ajax(settings).done(apiResponse => {
        console.log(apiResponse);
        const li = $(`<li id="${song.id}"></li>`);
        const title = $(
          `<a href=${apiResponse.link}><h4>Title: ${apiResponse.title}</h4></a>`
        );
        const artist = $(
          `<img src=${apiResponse.artist.picture_small}><p>Artist: ${apiResponse.artist.name}</p>`
        );
        const album = $(
          `<img src=${apiResponse.album.cover_small}><p>Album: ${apiResponse.album.title}</p>`
        );
        const sample = $(`<p>Sample</p><audio controls>
        <source src="${apiResponse.preview}" type="audio/mpeg">
        Your browser does not support the audio tag.
      </audio>`);

        const delBtn = $(
          `<button type="button" id="delete" value="${song.id}">Delete Song</button>`
        );

        li.append(title)
          .append(artist)
          .append(album)
          .append(sample)
          .append(delBtn);

        $("#songList").append(li);
      });
    });
  });
});

function deleteSong(songId) {
  $.ajax({
    method: "DELETE",
    url: "/api/song/" + songId
  }).done(res => {
    console.log(res);
    $("li").remove(`#${songId}`);
  });
}
