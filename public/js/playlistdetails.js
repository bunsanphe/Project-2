/* eslint-disable quotes */
$(document).ready(() => {
  //console.log("playlist: " + $(".playlist").attr("id"));

  $(document).on("click", "#delete", event => {
    deleteSong(event.target.value);
  });

  createCards();
});

function deleteSong(songId) {
  $.ajax({
    method: "DELETE",
    url: "/api/song/" + songId
  }).done(() => {
    //console.log(res);
    $(".card").remove(`#${songId}`);
    $("#results").empty();
    createCards();
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
    const col = $(`<div class="col-xs-6 col-sm-6 col-lg-6 col-xl-3"></div>`);

    const card = $(`<div class="card" id="${song.id}"></div>`);
    const cardTitle = $(
      `<div class="card-title" style="margin-top:15px;margin-bottom:0px"><a href=${apiResponse.link}><p style="margin-bottom:0px" class="card-title">Title: ${apiResponse.title}</p></a></div>`
    );
    // eslint-disable-next-line quotes
    const cardBody = $(`<div class="card-body"></div>`);
    // eslint-disable-next-line prettier/prettier
    const albumImg = $(`<img width="125px" height="125px" src=${apiResponse.album.cover_medium}>`);
    const albumTitle = $(
      `<p style="font-size:14px" class="cardtext">Album: ${apiResponse.album.title}</p>`
    );
    const artistTitle = $(
      `<p style="margin-top:5px;margin-bottom:5px" class="cardtext">Artist: ${apiResponse.artist.name}</p>`
    );
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

    cardUl.append(cardLi1);
    cardUl.append(cardLi2);

    cardBody
      .append(albumImg)
      .append(artistTitle)
      .append(albumTitle);

    cardBody.append(cardUl);

    card.append(cardTitle);
    card.append(cardBody);

    col.append(card);
    row.append(col);
  });
}

function createCards() {
  const playlist = $(".playlist").attr("id");
  $.get(`/api/song/${playlist}`).then(songs => {
    // eslint-disable-next-line no-var
    var iter = 0;

    const totalRows = Math.floor(songs.length / 4);
    //console.log("total rows: " + totalRows);
    const remainCols = songs.length % 4;

    //console.log("remaincols: " + remainCols);
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

    //console.log(remainCols);
    if (remainCols > 0) {
      //console.log("inside if");
      const row = $(`<div class="row" id="${songs[iter].id}"></div>`);
      for (let k = 0; k < remainCols; k++) {
        //console.log("songs iter: " + songs[iter]);
        createSongCard(songs[iter], row);
        iter++;
      }
      //console.log(row);
      $("#results").append(row);
    }
  });
}
