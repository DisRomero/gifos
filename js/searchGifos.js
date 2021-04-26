let q = "";
let api_search = "";
let api_suggestion ="";
let inputSearch ="";
const api_key = "I9YUl0qQ7GUVk9LXsawA8eFHyjZC7HRP";
const search = document.getElementById('input-form-search');
const btnSearch = document.getElementById("btn-form-search");
const suggestion = document.getElementById('ul-form-search');

btnSearch.addEventListener("click", (event) => {
  event.preventDefault();
  getValues();
  sendApiRequest();
  suggestion.style.display='none';
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
      if(json.data.length===0){
        suggestion.style.display='none';
        console.log('perdon no se encontro datos');
      };
      console.log(json);
      json.data.forEach(function (obj) {
      console.log(obj.images.downsized.url);
      });
    })
    .catch(function (err) {
      console.log(err.message);
    });
};

const searchGifos = async searchText => {
  const res = await fetch 
  (`https://api.giphy.com/v1/gifs/search/tags?api_key=${api_key}&q=${searchText}&limit=2`);
  const gifos = await res.json();
  suggestion.innerHTML = '';

  gifos.data.forEach(function (obj){
    let nameSuggestion = obj.name;
    let tagImg = document.createElement('img');
    let tag = document.createElement('li');
    let textSuggestion = document.createTextNode(nameSuggestion);
    
    suggestion.style.display='block';
    tag.appendChild(textSuggestion);
    suggestion.appendChild(tagImg);
    suggestion.appendChild(tag);
  });

};

search.addEventListener('keyup', (e) => {
  searchGifos(e.target.value);
  if(e.target.value === ''){
    suggestion.style.display='none';
    suggestion.value = '';
      
  };
});