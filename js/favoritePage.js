import { createElemntHover } from "./trendingGifos.js";

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

  createElemntHover(gifos, tagLiResponde, ul);
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
