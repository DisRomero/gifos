let q = "";
let api_search = "";
let api_suggestion ="";
let inputSearch ="";
const api_key = "I9YUl0qQ7GUVk9LXsawA8eFHyjZC7HRP";
//const api_key = 'M56ORmffhkS4OWzdIE3ZPfFQXWSjF30N';
const search = document.getElementById('input-form-search');
const btnSearch = document.getElementById("btn-form-search");
const suggestion = document.getElementById('ul-form-search');

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
      //console.log(json);
      json.data.forEach(function (obj) {
        //console.log(obj.images.downsized.url);
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

  
  let tagForm = document.getElementById('ul-form-search');

  tagForm.innerHTML = '';

  gifos.data.forEach(function (obj){
    let nameSuggestion = obj.name;
    let tagImg = document.createElement('img');
    let tag = document.createElement('li');
    let textSuggestion = document.createTextNode(nameSuggestion);
    
    tagForm.style.display='block';
    tag.appendChild(textSuggestion);
    tagForm.appendChild(tagImg);
    tagForm.appendChild(tag);
  });

  if(gifos.data.length===0){
    console.log('perdon no se encontro datos');//stlye display block al id search-gifos-responde 
  };

};

search.addEventListener('keyup', (e) => {
  searchGifos(e.target.value);
  if(e.target.value === ''){
    let tagForm = document.getElementById('ul-form-search');
    tagForm.style.display='none';
    tagForm.value = '';
      
  };
});