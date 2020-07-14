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


    console.log("searchTerm: " + searchTerm);

    $.ajax(settings).done(response => {
      listResults(response);
    });
  });
});

function listResults(res) {

    $("#results").append($("<h4>Results</h4>"));
    
    res.data.forEach(result => {
        console.log(result);


    });
}