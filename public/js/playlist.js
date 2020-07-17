$(document).ready(() => {
  const nameInput = $("#playlist");
  const playList = $("tbody");
  const playlistContainer = $(".playlist-container");

  $(document).on("click", ".deletePlayList", DeleteButton);

  getPlaylist();

  $("#add").click(() => {
    const Name = $("#playlist").val();
    if (!Name.trim().trim()) {
      return;
    }
    upsertPlaylist(Name);
  });

  function upsertPlaylist(playlistData) {
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
    const newTr = $(`<tr id="${playlistData.id}">`);
    newTr.data("playlist", playlistData);
    newTr.append("<td>" + playlistData.playlistName + "</td>");
    newTr.append(
      `<td><a href='/playlistdetails/${playlistData.id}'>O.O</a></td>`
    );
    newTr.append("<td><a href='/search'>+_+</a></td>");
    newTr.append(
      "<td><a style='cursor:pointer; color:red' class='deletePlayList'>X</a></td>"
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
    }).then(res => {
      $("tr").remove(`#${id}`);
      console.log(res);
    });
  }
});
