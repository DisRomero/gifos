//fetch search input

let inputSearch = "";
let q = "";
let api_search = "";
const btnSearch = document.getElementById("btn-form-search");
const api_key = "I9YUl0qQ7GUVk9LXsawA8eFHyjZC7HRP";
//const api_key = 'M56ORmffhkS4OWzdIE3ZPfFQXWSjF30N';

btnSearch.addEventListener("click", (event) => {
  event.preventDefault();
  getValues();
  sendApiRequest();
});

function getValues() {
  inputSearch = document.getElementById("input-form-search").value;
  const q = inputSearch;
  api_search = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${q}&limit=1`;
  console.log("valor de api_search " + api_search);
}

export function sendApiRequest() {
  fetch(api_search)
    .then(function (respondeSearch) {
      console.log(respondeSearch);
      return respondeSearch.json();
    })
    .then(function (json) {
      console.log(json);
      json.data.forEach(function (obj) {
        console.log(obj.images.downsized.url);
      });
    })
    .catch(function (err) {
      console.log(err.message);
    });
}


////////https://www.youtube.com/watch?v=bRdjEpodiaQ&t=222s&ab_channel=TheTechTeam
///////https://www.youtube.com/watch?v=1iysNUrI3lw&t=78s&ab_channel=TraversyMedia
///////https://www.youtube.com/watch?v=WI0aCIEYXvw&ab_channel=J%26GProyectosWeb
