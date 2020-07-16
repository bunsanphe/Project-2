$(document).ready(() => {
  const nameInput = $("#playlist");
  const playList = $("tbody");
  const playlistContainer = $(".playlist-container");

  $(document).on("submit", "playlist", PlaylistFormSubmit);
  $(document).on("click", ".deletePlayList", DeleteButton);

  getPlaylist();

  function PlaylistFormSubmit(event) {
    event.preventDefault();
    if (
      !nameInput
        .val()
        .trim()
        .trim()
    ) {
      return;
    }

    upsertPlaylist({
      name: nameInput.val().trim()
    });
  }

  function upsertPlaylist(playlistData) {
    $.post("/api/playlist", playlistData).then(getPlaylist);
  }

  function getPlaylist() {
    $.get("/api/playlist", data => {
      console.log(data);
      const rowsToAdd = [];
      for (let i = 0; i < data.length; i++) {
        rowsToAdd.push(createPlaylistRow(data[i]));
        console.log(data[0]);
      }
      renderPlaylist(rowsToAdd);
      nameInput.val("");
    });
  }

  function createPlaylistRow(playlistData) {
    const newTr = $("<tr>");
    console.log(playlistData);
    newTr.data("playlist", playlistData);
    newTr.append("<td>" + playlistData.playlistName + "</td>");
    newTr.append(
      `<td><a href='/playlistdetails/${playlistData.id}'>Edit Playlist</a></td>`
    );
    newTr.append(
      "<td><a style='cursor:pointer; color:red' class='deletePlayList'>Delete Playlist</a></td>"
    );
    return newTr;
  }

  function renderPlaylist(rows) {
    playList
      .children()
      .not(":last")
      .remove();
    playlistContainer.children(".alert").remove();
    if (rows.length) {
      playList.prepend(rows);
    } else {
      renderEmpty();
    }
  }

  function renderEmpty() {
    console.log("Empty");
  }

  function DeleteButton() {
    const listItemData = $(this)
      .parent("td")
      .parent("tr")
      .data("Playlist");
    const id = listItemData.id;
    console.log(listItemData.id);
    $.ajax({
      method: "DELETE",
      url: "/api/playlist/" + id
    }).then(getPlaylist);
  }
});
