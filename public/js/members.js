$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/playlist").then(data => {
    console.log(data);
  });

  $("#add").click(() => {
    const Name = $("#playlist").val();
    console.log(Name);

    $.post("/api/playlist", { playlistName: Name }).then(() => {
      $.get("/api/playlist").then(data => {
        console.log(data);
      });
    });
  });

  
});
