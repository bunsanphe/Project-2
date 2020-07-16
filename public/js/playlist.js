$(document).ready(() => {
  const nameInput = $("#playlist");
  const playList = $("tbody");
  const playlistContainer = $(".playlist-container");

  $(document).on("click", ".deletePlayList", DeleteButton);

  getPlaylist();

  $("#add").click(() => {
    if (
      !Name.val()
        .trim()
        .trim()
    ) {
      return;
    }
    const Name = $("#playlist").val();
    console.log(Name);
    upsertPlaylist(Name);
  });

  function upsertPlaylist(playlistData) {
    console.log(playlistData);
    $.post("/api/playlist", { playlistName: playlistData }).then(getPlaylist);
  }

  function getPlaylist() {
    $.get("/api/playlist", data => {
      const rowsToAdd = [];
      for (let i = 0; i < data.length; i++) {
        rowsToAdd.push(createPlaylistRow(data[i]));
      }
      renderPlaylist(rowsToAdd);
      nameInput.val("");
    });
  }

  function createPlaylistRow(playlistData) {
    const newTr = $("<tr>");
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
      .data("playlist");
    const id = listItemData.id;
    console.log(listItemData.id);
    $.ajax({
      method: "DELETE",
      url: "/api/playlist/" + id
    }).then(getPlaylist);
  }
});
