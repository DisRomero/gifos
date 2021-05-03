let q = "";
let api_search = "";
let inputSearch = "";
const api_key = "I9YUl0qQ7GUVk9LXsawA8eFHyjZC7HRP";
const search = document.getElementById("input-form-search");
const btnSearch = document.getElementById("btn-form-search");
const suggestion = document.getElementById("ul-form-search");
const divResponde = document.getElementById("search-gifos-responde");

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
};

function addGifo (gifo) {
  const titleResponde = document.getElementById("tittle-search-gifos-responde");
  const listResponde = document.getElementById("ul-search-gifos-responde");

    divResponde.style.display = "flex";
    titleResponde.innerText = q;
    let tagLiResponde = document.createElement("li");
    let tagImgResponde = document.createElement("img");
    tagImgResponde.src = gifo.images.downsized.url;
    tagLiResponde.appendChild(tagImgResponde);
    listResponde.appendChild(tagLiResponde);
};

function respondeWithoutGifos (){
  divResponde.innerHTML = '';
  const divLine = document.createElement('div');
  divLine.classList.add('line');
  const title = document.createElement('h2');
  title.classList.add('text-body');
  title.innerText = q;
  const img = document.createElement('img');
  img.src = "assets/img/icon-busqueda-sin-resultado.svg";
  const p = document.createElement('p');
  p.innerText = 'Intenta con otra búsqueda.';
  p.classList.add('txt-fail-responde');
  divResponde.appendChild(divLine);
  divResponde.appendChild(title);
  divResponde.appendChild(img);
  divResponde.appendChild(p);
};

function respondeWithGifos (gifo){
  divResponde.innerHTML = '';
  const divLine = document.createElement('div');
  divLine.classList.add('line');
  const title = document.createElement('h2');
  title.classList.add('text-body');
  title.innerText = q;
  const ul = document.createElement('ul');
  ul.classList.add('responde-list');
  divResponde.appendChild(divLine);
  divResponde.appendChild(title);
  divResponde.appendChild(ul);

  const btn = document.createElement('button');
  btn.classList.add('text-body');
  btn.textContent = 'ver más';
  divResponde.appendChild(btn);

  // const li = document.createElement('li');
  // const img = document.createElement('img');
  // img.src = gifo.images.downsized.url;
  // li.appendChild(img);
  // ul.appendChild(li);
  // divResponde.appendChild(ul);

}


export async function sendApiRequest() {
  fetch(api_search)
    .then(function (respondeSearch) {
      return respondeSearch.json();
    })
    .then(function (json) {
      const data = json.data;
      let btnSeeMore = document.getElementById("btn-search-gifos-responde");//

      if(data.length === 0) {
        respondeWithoutGifos();
      }

      if(data.length > 0) {
        divResponde.innerHTML = '';
        respondeWithGifos();

        data.forEach( function(e){
          const li = document.createElement('li');
          const img = document.createElement('img');
          img.src = e.images.downsized.url;
          li.appendChild(img);
          ul.appendChild(li);//add if of the responde with gifos function to call here
          divResponde.appendChild(ul);


        });

        



        //<button class="text-body" id="btn-search-gifos-responde">ver más</button>


        // btnSeeMore.style.display = 'block';
        // listResponde.innerHTML = "";
        // let initialPosition = 0;
        // let size = 4;
        // let jsonData = data.splice(initialPosition, size);
        // jsonData.forEach(addGifo);
        // btnSeeMore.addEventListener('click', () => {
        //   let nextGifos = data.splice(initialPosition, size);
        //   nextGifos.forEach(addGifo);
        //   if(data.length === 0) {
        //     btnSeeMore.style.display = 'none';
        //   }
        // })
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
