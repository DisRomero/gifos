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
          data.forEach(createElemntHover);
        }
      })

      .catch(function (err) {
        console.log(err.message);
      });
  } catch (e) {
    console.log(e);
  }
}

const createElemntHover = (e) => {
  const div = document.createElement("div");
  const img = document.createElement("img");
  div.classList.add("div-slider");
  img.classList.add("slider-image");
  let urlStirng = e.images.downsized.url;
  img.src = urlStirng;

  div.appendChild(img);
//==========
  const ulBtns = document.createElement("ul");
  ulBtns.classList.add("container-btns-hover");

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

  LiBtnF.appendChild(btnFavorite);
  LiBtnD.appendChild(btnDownload);
  LiBtnZ.appendChild(btnZoom);
  ulBtns.appendChild(LiBtnF);
  ulBtns.appendChild(LiBtnD);
  ulBtns.appendChild(LiBtnZ);

  const span = document.createElement("span");
  span.classList.add("span-text");
  const userName = document.createElement("p");
  const userTittle = document.createElement("p");
  userName.innerText = e.username;
  userTittle.innerText = e.title;

  span.appendChild(userName);
  span.appendChild(userTittle);

  div.appendChild(ulBtns);
  div.appendChild(span);

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

btnRight.addEventListener("click", nextImages);
btnLeft.addEventListener("click", previousImages);

getImages();
