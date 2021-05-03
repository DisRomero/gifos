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

function addGifo (gifo) {
    /////responde and display the information
    divResponde.style.display = "flex";
    titleResponde.innerText = q;
    ////create and display the gif's into a list
    let tagLiResponde = document.createElement("li");
    let tagImgResponde = document.createElement("img");
    tagImgResponde.src = gifo.images.downsized.url;
    tagLiResponde.appendChild(tagImgResponde);
    listResponde.appendChild(tagLiResponde);
}

// 
export async function sendApiRequest() {
  fetch(api_search)
    .then(function (respondeSearch) {
      return respondeSearch.json();
    })
    .then(function (json) {
      const data = json.data;
      let btnSeeMore = document.getElementById("btn-search-gifos-responde");

      if(data.length === 0) {
        listResponde.innerHTML = "";
        btnSeeMore.style.display = "none";

        //add the fail information/responde
        divResponde.style.display = "flex";
        ////create and display the gif's into a list
        let tagLiResponde = document.createElement("li");
        let tagImgResponde = document.createElement("img");
        let txtFailResponde = document.createElement("p");
        txtFailResponde.classList.add("txt-fail-responde");
        txtFailResponde.innerText = "Intenta con otra búsqueda.";
        tagImgResponde.src = "assets/img/icon-busqueda-sin-resultado.svg";
        tagLiResponde.appendChild(tagImgResponde);
        tagLiResponde.appendChild(txtFailResponde);
        titleResponde.innerHTML = q;
        listResponde.appendChild(tagLiResponde);
      }

      if(data.length > 0) {
        btnSeeMore.style.display = 'block';
        listResponde.innerHTML = "";
        let initialPosition = 0;
        let size = 4;
        let jsonData = data.splice(initialPosition, size);
        jsonData.forEach(addGifo);
        btnSeeMore.addEventListener('click', () => {
          let nextGifos = data.splice(initialPosition, size);
          nextGifos.forEach(addGifo);
          if(data.length === 0) {
            btnSeeMore.style.display = 'none';
          }
        })
      }

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

////// start the search fucntion
search.addEventListener("keyup", (e) => {
  searchGifos(e.target.value);

  if (e.target.value === "") {
    suggestion.style.display = "none";
    suggestion.value = "";
  } else {
    suggestion.style.display = "block";
  }

  if (e.key === "Enter") {
    suggestion.style.display = "none";
    getValues();
    sendApiRequest();
  }
});
