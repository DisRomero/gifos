//fetch search input
const inputSearch = document.getElementById("input-form-search").value;
const btnSearch = document.getElementById("btn-form-search");

const q = "hi";
const api_key = "I9YUl0qQ7GUVk9LXsawA8eFHyjZC7HRP";
//const api_key = 'M56ORmffhkS4OWzdIE3ZPfFQXWSjF30N';
const api_search = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${q}&limit=6`;

btnSearch.addEventListener("click", (event) => {
  event.preventDefault();
  sendApiRequest();
});

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
