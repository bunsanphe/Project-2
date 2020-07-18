$(document).ready(() => {
  const playlist = $(".playlist").attr("id");
  console.log("playlist: " + $(".playlist").attr("id"));

  $(document).on("click", "#delete", event => {
    deleteSong(event.target.value);
  });

  $.get(`/api/song/${playlist}`).then(songs => {
    // eslint-disable-next-line no-var
    var iter = 0;

    const totalRows = Math.floor(songs.length / 4);
    console.log("total rows: " + totalRows);
    const remainCols = songs.length % 4;

    console.log("remaincols: " + remainCols);
    //console.log(songs[0].id);

    for (let i = 0; i < totalRows; i++) {
      const row = $(`<div class="row" id="${songs[iter].id}"></div>`);
      for (let j = 0; j < 4; j++) {
        //console.log("songs iter: " + songs[iter]);
        createSongCard(songs[iter], row);
        iter++;
      }
      //console.log(row);
      $("#results").append(row);
    }

    console.log(remainCols);
    if (remainCols > 0) {
      console.log("inside if");
      const row = $(`<div class="row" id="${songs[iter].id}"></div>`);
      for (let k = 0; k < remainCols; k++) {
        console.log("songs iter: " + songs[iter]);
        createSongCard(songs[iter], row);
        iter++;
      }
      console.log(row);
      $("#results").append(row);
    }
  });

  // songs.forEach(song => {
  //   //const songId = JSON.stringify(song.SongApiId);
  //   const settings = {
  //     async: true,
  //     crossDomain: true,
  //     url: `https://deezerdevs-deezer.p.rapidapi.com/track/${song.songApiId}`,
  //     method: "GET",
  //     headers: {
  //       "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
  //       "x-rapidapi-key": "a6472e3f9fmsh8e0c9042cb99723p17c4a5jsn05d9e87e7640"
  //     }
  //   };

  //   $.ajax(settings).done(apiResponse => {
  //     console.log(apiResponse);
  //     const li = $(`<li id="${song.id}"></li>`);
  //     const title = $(
  //       `<a href=${apiResponse.link}><h4>Title: ${apiResponse.title}</h4></a>`
  //     );
  //     const artist = $(
  //       `<img src=${apiResponse.artist.picture_small}><p>Artist: ${apiResponse.artist.name}</p>`
  //     );
  //     const album = $(
  //       `<img src=${apiResponse.album.cover_small}><p>Album: ${apiResponse.album.title}</p>`
  //     );
  //     const sample = $(`<p>Sample</p><audio controls>
  //     <source src="${apiResponse.preview}" type="audio/mpeg">
  //     Your browser does not support the audio tag.
  //   </audio>`);

  //     const delBtn = $(
  //       `<button type="button" id="delete" value="${song.id}">Delete Song</button>`
  //     );

  //     li.append(title)
  //       .append(artist)
  //       .append(album)
  //       .append(sample)
  //       .append(delBtn);

  //     $("#songList").append(li);
  //});
  //});
  //});
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

function createSongCard(song, row) {
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
    //console.log(apiResponse);
    const col = $(`<div class="col-xs-6 col-sm-3"></div>`);

    const card = $(`<div class="card"></div>`);
    const cardTitle = $(
      `<div class="card-title"><a href=${apiResponse.link}><h2>Title: ${apiResponse.title}</h2></a></div>`
    );
    // eslint-disable-next-line quotes
    const cardBody = $(`<div class="card-body"></div>`);
    const albumImg = $(`<img src=${apiResponse.album.cover_medium}>`);
    const albumTitle = $(`<p>Album: ${apiResponse.album.title}</p>`);
    // eslint-disable-next-line quotes
    const cardUl = $(`<ul class="list-group list-group-flush"></ul>`);
    const cardLi1 = $(
      `<li class="list-group-item"><audio controls>
      <source src="${apiResponse.preview}" type="audio/mpeg">
      Your browser does not support the audio tag.
    </audio></li>`
    );
    const cardLi2 = $(
      `<li class="list-group-item"><button type="button" id="delete" value="${song.id}">Delete Song</button></li>`
    );

    //cardLi2.append(dropdown);

    cardUl.append(cardLi1).append(cardLi2);

    cardBody.append(albumImg).append(albumTitle);

    cardBody.append(cardUl);

    card.append(cardTitle);
    card.append(cardBody);

    col.append(card);
    row.append(col);
  });
}
