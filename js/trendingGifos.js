const api_key = "I9YUl0qQ7GUVk9LXsawA8eFHyjZC7HRP";
const api_trending = `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=6`;
const slider = document.getElementById("slider");
const btnLeft = document.getElementById("btn-left");
const btnRight = document.getElementById("btn-right");
const testing = document.getElementsByClassName("slider-image"); //

let nextImage = 2;
let previousImage = 3;

export function getImages() {
  try {
    fetch(api_trending)
      .then(function (responde) {
        return responde.json();
      })
      .then(function (json) {
        const data = json.data;

        if (data.length > 0) {
          slider.innerHTML = "";
          data.forEach(createElemntHover);
        }
        for (var i = 0; i < testing.length; i++) {
          testing[i].addEventListener("mouseenter", imgHover);
        }

        var divs = document.getElementsByClassName("div-slider"),
          numDivs = divs.length;
        for (var i = 0; i < numDivs; ++i) {
          divs[i].id = i;
          //divs[i].onmouseenter = true;
          document.getElementById(i).onclick = entro;
        }
      })

      .catch(function (err) {
        console.log(err.message);
      });
  } catch (e) {
    console.log(e);
  }
}

// const createImg = (e) => {
//   const div = document.createElement('div');
//   const img = document.createElement('img');
//   div.classList.add('div-slider')
//   img.classList.add('slider-image');
//   img.src = e.images.downsized.url;
//   slider.appendChild(img);
//   createElementsHover(e);
// }

const createElemntHover = (e) => {
  const div = document.createElement("div");
  const img = document.createElement("img");
  div.classList.add("div-slider");
  img.classList.add("slider-image");
  let urlStirng = e.images.downsized.url;
  img.src = urlStirng;

  div.appendChild(img);

  const ulBtns = document.createElement("ul");
  const LiBtnF = document.createElement("li");
  const LiBtnD = document.createElement("li");
  const LiBtnZ = document.createElement("li");
  const btnFavorite = document.createElement("button");
  const btnDownload = document.createElement("button");
  const btnZoom = document.createElement("button");
  btnFavorite.appendChild(document.createTextNode("<3"));
  btnFavorite.classList.add("btn-favorite");

  btnDownload.appendChild(document.createTextNode("D"));
  btnDownload.classList.add("btn-download");

  btnZoom.appendChild(document.createTextNode("Z"));
  btnZoom.classList.add("btn-zoom");

  ulBtns.classList.add("container-btns-hover"); //cards--three__list
  LiBtnF.appendChild(btnFavorite);
  LiBtnD.appendChild(btnDownload);
  LiBtnZ.appendChild(btnZoom);
  ulBtns.appendChild(LiBtnF);
  ulBtns.appendChild(LiBtnD);
  ulBtns.appendChild(LiBtnZ);

  const cardsThree__rect1 = document.createElement("span");
  cardsThree__rect1.classList.add("cards--three__rect-1");

  const shadow1 = document.createElement("span");
  shadow1.classList.add("shadow-1"); //
  const userName = document.createElement("p");
  const userTittle = document.createElement("p");
  userName.innerText = e.username;
  userTittle.innerText = e.title;

  cardsThree__rect1.appendChild(shadow1); //
  cardsThree__rect1.appendChild(userName);
  cardsThree__rect1.appendChild(userTittle);
  // const ulText = document.createElement("ul");
  // const userLi = document.createElement("li");
  // const user = document.createTextNode(e.username);
  // userLi.appendChild(user);
  // ulText.classList.add("container-texts-hover");
  // ulText.appendChild(userLi);

  // const spandTitle = e.title;
  div.appendChild(ulBtns);
  div.appendChild(cardsThree__rect1);
  // slider.appendChild(ulText);

  slider.appendChild(div);
  //https://codepen.io/chhiring90/pen/zLJLBG
};

const nextImages = () => {
  btnLeft.style.display = "block";
  nextImage = nextImage + 1;
  let lengthImages = slider.children.length - 1;
  if (lengthImages === nextImage) {
    btnRight.style.display = "none";
  }

  if (lengthImages >= nextImage) {
    let next = slider.children[nextImage];
    next.scrollIntoView();
  }
};

const previousImages = () => {
  btnRight.style.display = "block";
  previousImage = previousImage - 1;
  let lengthImages = slider.children.length - 1;
  if (previousImage === 0) {
    btnLeft.style.display = "none";
  }

  if (lengthImages >= previousImage) {
    let next = slider.children[previousImage];
    next.scrollIntoView();
  }
};

function imgHover() {
  //console.log(testing.target);
  //slider.children.style.display = 'block';
  const div = document.getElementById.clicked;

  //const superTest = document.createTextNode("holaaaaaaa");
  //div.appendChild(superTest);
}

const entro = (i) => {
  var cc = parseInt(i.path[1].id);
  var divClicked = document.getElementById(cc);
  console.log("entro", i.path[1].id);
  console.log("entroByID", divClicked);
  const texto = document.createTextNode("holaaaaaa");
  divClicked.appendChild(texto);
};

btnRight.addEventListener("click", nextImages);
btnLeft.addEventListener("click", previousImages);

getImages();
