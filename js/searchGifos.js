let q = "";
let api_search = "";
let api_suggestion ="";
let inputSearch ="";
const btnSearch = document.getElementById("btn-form-search");
const api_key = "I9YUl0qQ7GUVk9LXsawA8eFHyjZC7HRP";
//const api_key = 'M56ORmffhkS4OWzdIE3ZPfFQXWSjF30N';
const search = document.getElementById('input-form-search');
const matchList =document.getElementById('match-list');


//// click input delete value
btnSearch.addEventListener("click", (event) => {
  event.preventDefault();
  getValues();
  sendApiRequest();
  });

function getValues() {
  inputSearch = document.getElementById("input-form-search").value;
  q = inputSearch;
  api_search = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${q}&limit=1`;
  api_suggestion = `https://api.giphy.com/v1/gifs/search/tags?api_key=${api_key}&q=${q}&limit=1`;
}

export async function sendApiRequest() {
  fetch(api_search)
    .then(function (respondeSearch) {
      console.log(respondeSearch);      
      return respondeSearch.json();
    })
    .then(function (json) {
      ///////////respondeJson = json;
      //console.log(json);
      json.data.forEach(function (obj) {
        //console.log(obj.images.downsized.url);
      });
    })
    .catch(function (err) {
      console.log(err.message);
    });
}

const searchGifos = async searchText => {
  const res = await fetch (`https://api.giphy.com/v1/gifs/search/tags?api_key=${api_key}&q=${searchText}&limit=2`);
  const gifos = await res.json();
  //console.log(gifos);
  //data.data[0].name
  gifos.data.forEach(function (obj){
    console.log(obj.name);
  
    
let nameSuggestion = obj.name;
let tag = document.createElement('li');
let textSuggestion =document.createTextNode(nameSuggestion);
tag.appendChild(textSuggestion);
let tagForm = document.getElementById('ul-form-search');
tagForm.appendChild(tag);


if(searchText.length === 0){
  tag.style.display="none";
}
  });
  


  //if(searchText.length === 0)

  //get matches to current text input
};

search.addEventListener('input', ()=> searchGifos(search.value));
