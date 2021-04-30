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
        let txtFailResponde = document.createElement("p");
        txtFailResponde.classList.add("txt-fail-responde");
        imgFailResponde.src = "assets/img/icon-busqueda-sin-resultado.svg";
        txtFailResponde.innerHTML = "Intenta con otra búsqueda.";
        divResponde.appendChild(imgFailResponde);
        divResponde.appendChild(txtFailResponde);
      }
      listResponde.innerHTML = "";
      let initialValue = 0;
      let lastValue = 4;
      let jsonData = json.data.splice(initialValue, lastValue);
      console.log(jsonData, "Json data splice");

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

/*
      imprimir hasta que splice cumpla
      asiganra valores al splice e imprimilo, si se usa el boton editar valores del splice e imprimir valores
     
      function displayMoreGifos(){
        console.log('mostrare mas gifos');
      };

      let btnSeeMore = document.getElementById("btn-search-gifos-responde");
      btnSeeMore.addEventListener('click', () => {
        displayMoreGifos();
      })

/////
function exitoCallback(resultado) {
  console.log("Archivo de audio disponible en la URL " + resultado);
}

function falloCallback(error) {
  console.log("Error generando archivo de audio " + error);
}

crearArchivoAudioAsync(audioConfig, exitoCallback, falloCallback);


const promesa = crearArchivoAudioAsync(audioConfig);
promesa.then(exitoCallback, falloCallback);

*/
