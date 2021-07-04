let q = "";
let api_search = "";
let inputSearch = "";
const api_key = "I9YUl0qQ7GUVk9LXsawA8eFHyjZC7HRP";
const search = document.getElementById("input-form-search");
const btnSearch = document.getElementById("btn-form-search");
const suggestion = document.getElementById("ul-form-search");
const divResponde = document.getElementById("search-gifos-responde");

import { createElemntHover } from "./trendingGifos.js";

if (document.getElementById("btn-form-search")) {
  btnSearch.addEventListener("click", (event) => {
    event.preventDefault();
    getValues();
    sendApiRequest();
    suggestion.style.display = "none";
  });
}

function getValues() {
  inputSearch = document.getElementById("input-form-search").value;
  q = inputSearch;
  api_search = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${q}&offset=4&limit=20`;
}

const addGifo = (gifos) => {
  const listResponde = document.getElementById("ul-search-gifos-responde");
  let tagLiResponde = document.createElement("li");
  tagLiResponde.classList.add("div-slider");
  let tagImgResponde = document.createElement("img");
  tagImgResponde.src = gifos.images.downsized.url;

  tagLiResponde.appendChild(tagImgResponde);
  listResponde.appendChild(tagLiResponde);

  createElemntHover(gifos, tagLiResponde, listResponde);
};

function respondeWithoutGifos(divResponde) {
  divResponde.innerHTML = "";
  const divLine = document.createElement("div");
  divLine.classList.add("line");
  const title = document.createElement("h2");
  title.classList.add("text-body");
  title.innerText = q;
  const img = document.createElement("img");
  img.src = "assets/img/icon-busqueda-sin-resultado.svg";
  const p = document.createElement("p");
  p.innerText = "Intenta con otra búsqueda.";
  p.classList.add("txt-fail-responde");
  divResponde.appendChild(divLine);
  divResponde.appendChild(title);
  divResponde.appendChild(img);
  divResponde.appendChild(p);
}

function respondeWithGifos() {
  divResponde.innerHTML = "";
  const divLine = document.createElement("div");
  divLine.classList.add("line");
  const title = document.createElement("h2");
  title.classList.add("text-body");
  title.innerText = q;
  const ul = document.createElement("ul");
  ul.classList.add("responde-list");
  ul.id = "ul-search-gifos-responde";
  divResponde.appendChild(divLine);
  divResponde.appendChild(title);
  divResponde.appendChild(ul);
}

export async function sendApiRequest() {
  try {
    fetch(api_search)
      .then(function (respondeSearch) {
        return respondeSearch.json();
      })
      .then(function (json) {
        const data = json.data;

        if (data.length === 0) {
          respondeWithoutGifos();
        }

        if (data.length > 0) {
          divResponde.innerHTML = "";
          respondeWithGifos();
          let initialPosition = 0;
          let size = 12;
          let nextGifos = data.splice(initialPosition, size);
          nextGifos.forEach(addGifo);

          const btn = document.createElement("button");
          btn.classList.add("text-body");
          btn.id = "btn-search-gifos-responde";
          btn.textContent = "ver más";
          divResponde.appendChild(btn);

          btn.addEventListener("click", () => {
            let nextGifos = data.splice(initialPosition, size);
            nextGifos.forEach(addGifo);
            if (data.length === 0) {
              btn.style.display = "none";
            }
          });
        }
      })

      .catch(function (err) {
        console.log(err.message);
      });
  } catch (e) {
    console.log(e);
  }
}

const searchGifos = async (searchText) => {
  try {
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
  } catch (e) {
    console.log(e);
  }
};

if (document.getElementById("input-form-search")) {
  search.addEventListener("keyup", (e) => {
    
    const clearInput = (e) => {
      e.preventDefault();
      search.value='';
      suggestion.style.display = "none";
      btnClear.style.display = 'none';
    }

    searchGifos(e.target.value);
    const btnClear = document.getElementById('clear-search');
    btnClear.style.display = 'inline-block';
    btnClear.addEventListener('click', clearInput)

    
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
}
