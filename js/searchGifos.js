let q = "";
let api_search = "";
//let api_suggestion ="";
let inputSearch = "";
const api_key = "I9YUl0qQ7GUVk9LXsawA8eFHyjZC7HRP";
const search = document.getElementById("input-form-search");
const btnSearch = document.getElementById("btn-form-search");
const suggestion = document.getElementById("ul-form-search");
const divResponde = document.getElementById("search-gifos-responde");
const titleResponde = document.getElementById("tittle-search-gifos-responde");
const listResponde = document.getElementById("ul-search-gifos-responde");

////////search responde
const sectionTag = (divResponde.style.display = "none");

btnSearch.addEventListener("click", (event) => {
  event.preventDefault();
  getValues();
  sendApiRequest();
  suggestion.style.display = "none";
});

function getValues() {
  inputSearch = document.getElementById("input-form-search").value;
  q = inputSearch;
  api_search = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${q}&offset=4&limit=6`;
  //api_suggestion = `https://api.giphy.com/v1/gifs/search/tags?api_key=${api_key}&q=${q}&limit=1`;
}

export async function sendApiRequest() {
  fetch(api_search)
    .then(function (respondeSearch) {
      return respondeSearch.json();
    })

    .then(function (json) {
      if (json.data.length === 0) {
        suggestion.style.display = "none";
        listResponde.innerHTML = "";
        let btnSeeMore = document.getElementById("btn-search-gifos-responde");
        listResponde.style.display = "none";
        btnSeeMore.style.display = "none";

        //add the fail information/responde
        divResponde.style.display = "flex";
        let textSuggestion = document.createTextNode(q);
        titleResponde.innerHTML = textSuggestion.data;
        let imgFailResponde = document.createElement("img");
        //imgFailResponde.classList.add("claseDePrueba");
        let txtFailResponde = document.createElement("p");
        txtFailResponde.classList.add("txt-fail-responde");
        imgFailResponde.src = "assets/img/icon-busqueda-sin-resultado.svg";
        txtFailResponde.innerHTML = "Intenta con otra búsqueda.";
        divResponde.appendChild(imgFailResponde);
        divResponde.appendChild(txtFailResponde);
      }

      listResponde.innerHTML = "";
      json.data.forEach(function (obj) {
        /////responde and display the information
        divResponde.style.display = "flex";
        let textSuggestion = document.createTextNode(q);
        titleResponde.innerHTML = textSuggestion.data;
        ////create and display the gif's into a list
        let tagLiResponde = document.createElement("li");
        let tagImgResponde = document.createElement("img");
        tagImgResponde.src = obj.images.downsized.url;
        listResponde.appendChild(tagLiResponde);
        tagLiResponde.appendChild(tagImgResponde);
        // add the function Ver mas

        /**
 * listResponde.appenchild(tag creado)
 * 
 * var img = document.createElement("img");
img.src = "http://www.google.com/intl/en_com/images/logo_plain.png";
var src = document.getElementById("header");
src.appendChild(img);
 * 
 */
      });
    })
    .catch(function (err) {
      console.log(err.message);
    });
}

const searchGifos = async (searchText) => {
  const res = await fetch(
    `https://api.giphy.com/v1/gifs/search/tags?api_key=${api_key}&q=${searchText}&limit=4`
  );
  const gifos = await res.json();
  suggestion.innerHTML = "";

  gifos.data.forEach(function (obj) {
    let tagImg = document.createElement("img");
    let tag = document.createElement("li");
    let textSuggestion = document.createTextNode(obj.name);

    tag.addEventListener("click", () => {
      search.value = obj.name;
      btnSearch.click();
    });

    tag.appendChild(textSuggestion);
    suggestion.appendChild(tagImg);
    suggestion.appendChild(tag);
  });
};

search.addEventListener("keyup", (e) => {
  searchGifos(e.target.value);

  if (e.target.value === "") {
    suggestion.style.display = "none";
    suggestion.value = "";
  } else {
    suggestion.style.display = "block";
  }
});

////// disparar busqueda con enter
