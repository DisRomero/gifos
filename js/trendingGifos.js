import { addGifoFavorite } from "./btnsFunction.js";
import { downloadGifo } from "./btnsFunction.js";
import { expandGifo } from "./btnsFunction.js";

const api_key = "I9YUl0qQ7GUVk9LXsawA8eFHyjZC7HRP";
const api_trending = `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=6`;
const slider = document.getElementById("slider");
const btnLeft = document.getElementById("btn-left");
const btnRight = document.getElementById("btn-right");
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
          data.forEach(createImage);
        }
      })

      .catch(function (err) {
        console.log(err.message);
      });
  } catch (e) {
    console.log(e);
  }
}

const createImage = (gifos) => {
  const div = document.createElement("div");
  const img = document.createElement("img");

  div.classList.add("div-slider");
  img.classList.add("slider-image");
  let urlStirng = gifos.images.downsized.url;
  img.src = urlStirng;

  div.appendChild(img);
  slider.appendChild(div);
  createElemntHover(gifos, div, slider);
  img.addEventListener("touchstart", () => {
    return expandGifo(div, gifos);
  });
};

export const createElemntHover = (gifos, div, slider) => {
  const ulBtns = document.createElement("ul");
  ulBtns.classList.add("container-btns-hover");

  const LiBtnFavorite = document.createElement("li");
  const LiBtnDownload = document.createElement("li");
  const LiBtnExpand = document.createElement("li");
  const btnFavorite = document.createElement("button");
  const btnDownload = document.createElement("button");
  const btnExpand = document.createElement("button");
  const imgFavorite = document.createElement("img");
  imgFavorite.src = "assets/img/icon-fav.svg";
  const imgDownload = document.createElement("img");
  imgDownload.src = "assets/img/icon-download.svg";
  const imgExpand = document.createElement("img");
  imgExpand.src = "assets/img/icon-max-normal.svg";

  btnFavorite.appendChild(imgFavorite);
  btnFavorite.classList.add("btn-favorite");
  btnDownload.appendChild(imgDownload);
  btnDownload.classList.add("btn-download");
  btnExpand.appendChild(imgExpand);
  btnExpand.classList.add("btn-expand");

  LiBtnFavorite.appendChild(btnFavorite);
  LiBtnDownload.appendChild(btnDownload);
  LiBtnExpand.appendChild(btnExpand);
  ulBtns.appendChild(LiBtnFavorite);
  ulBtns.appendChild(LiBtnDownload);
  ulBtns.appendChild(LiBtnExpand);

  const span = document.createElement("span");
  span.classList.add("span-text");
  const userName = document.createElement("p");
  const userTittle = document.createElement("p");
  userName.innerText = gifos.username;
  userTittle.innerText = gifos.title;

  span.appendChild(userName);
  span.appendChild(userTittle);
  div.appendChild(ulBtns);
  div.appendChild(span);
  slider.appendChild(div);

  btnFavorite.addEventListener("click", () => {
    return addGifoFavorite(btnFavorite, gifos);
  }); ////
  btnDownload.addEventListener("click", () => downloadGifo(gifos));
  btnExpand.addEventListener("click", () => {
    return expandGifo(btnFavorite, gifos);
  });
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

btnRight.addEventListener("click", nextImages);
btnLeft.addEventListener("click", previousImages);

getImages();
