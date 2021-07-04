import { addGifoFavorite } from "./btnsFunction.js";
import { downloadGifo } from "./btnsFunction.js";

const divWithoutContent = document.getElementById(
  "fav-section-without-content"
);

const divWithContent = document.getElementById("fav-section-with-content");
const favSaved = localStorage.getItem("ImgFavorite");

const addFavoriteGifo = (gifos) => {
  const ul = document.getElementById("ul-favorire-gifos");
  ul.classList.add("favorite-list");
  let tagLiResponde = document.createElement("li");
  tagLiResponde.classList.add("div-slider");
  let tagImgResponde = document.createElement("img");
  tagImgResponde.src = gifos.url;

  tagLiResponde.appendChild(tagImgResponde);
  ul.appendChild(tagLiResponde);

  createElemntHoverFav(gifos, tagLiResponde, ul);
};

const createElemntHoverFav = (gifos, div, slider) => {
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
  btnFavorite.classList.add("btn-fav");
  btnFavorite.display= 'true';


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

  btnDownload.addEventListener("click", () => {
    return downloadGifo(gifos, gifos);
  });
  btnExpand.addEventListener("click", () => {
    return expandGifoFav(btnFavorite, gifos);
  });
};

const expandGifoFav = (btn, gifos) => {
  const modal = document.getElementById("myModal");
  const modalImg = document.getElementById("imgModal");
  const modalSpan = document.getElementById("span-myModal");
  const modalImgFavorite = document.getElementById("img-btn-favortite");
  const modalSpanClose = document.getElementById("close");
  const modalBtnDownload = document.getElementById("btn-download");
  const modalBtnFavorite = document.getElementById("btn-favorite");

  const userName = document.createElement("p");
  const userTittle = document.createElement("p");

  userName.innerText = gifos.username;
  userTittle.innerText = gifos.title;

  if (modalSpan.children.length == 0) {
    modalSpan.appendChild(userName);
    modalSpan.appendChild(userTittle);
  }

  modal.style.display = "block";
  modalImg.src = gifos.url;
  const btnClass = btn.getAttribute("class");

  if (btnClass.includes("active")) {
    modalBtnFavorite.classList.add("active");
    btn.disabled = true;
    modalImgFavorite.src = "/assets/img/icon-fav-active.svg";
  }

  modalSpanClose.onclick = function () {
    modal.style.display = "none";
  };

  modalBtnFavorite.onclick = function () {
    addGifoFavorite(modalBtnFavorite, gifos);
  };

  modalBtnDownload.onclick = function () {
    downloadGifo(gifos);
  };
};

if (document.getElementById("favorite-section")) {
  if (favSaved == null) {
    divWithoutContent.style.display = "flex";
  }
  if (favSaved !== null) {
    divWithContent.style.display = "block";
    let data = JSON.parse(favSaved);
    let initialPosition = 0;
    let size = 12;
    let nextGifos = data.splice(initialPosition, size);
    nextGifos.forEach(addFavoriteGifo);

    const btn = document.createElement("button");
    btn.classList.add("text-body");
    btn.id = "btn-favorite-section";
    btn.textContent = "ver más";
    divWithContent.appendChild(btn);

    btn.addEventListener("click", () => {
      let nextGifos = data.splice(initialPosition, size);
      nextGifos.forEach(addFavoriteGifo);
      if (data.length === 0) {
        btn.style.display = "none";
      }
    });
  }
}
