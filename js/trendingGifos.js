const api_key = "I9YUl0qQ7GUVk9LXsawA8eFHyjZC7HRP";
const api_trending = `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=6`;
const slider = document.getElementById('slider');
const btnLeft = document.getElementById("btn-left");
const btnRight = document.getElementById("btn-right");
const testing = document.getElementsByClassName('slider-image');//
let nextImage =2;
let previousImage =3;

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
          data.forEach(createImg);
        }
        for (var i = 0; i < testing.length; i++) {
          testing[i].addEventListener('mouseenter', imgHover);
        }
      })
      
      .catch(function (err) {
        console.log(err.message);
      });
  } catch (e) {
    console.log(e);
  }
}

const createImg = (e) => {
  const div = document.createElement('div');
  const img = document.createElement('img');
  div.classList.add('div-slider')
  img.classList.add('slider-image');
  img.src = e.images.downsized.url;
  slider.appendChild(img);
  createElementsHover(e);
}

const createElementsHover = (e) =>{
  //console.log('valor de e', e) //https://codepen.io/chhiring90/pen/zLJLBG
  const ulBtn = document.createElement('ul');
  const favoriteLi = document.createElement('li');
  const btnFavorite = document.createElement('button')
  btnFavorite.appendChild(document.createTextNode('<3'))
  btnFavorite.classList.add('btn-favorite');
  ulBtn.classList.add('container-btns-hover');
  ulBtn.appendChild(favoriteLi);
  favoriteLi.appendChild(btnFavorite);

  const ulText = document.createElement('ul');
  const userLi =document.createElement('li');
  const user = document.createTextNode(e.username);
  userLi.appendChild(user);
  ulText.classList.add('container-texts-hover');
  ulText.appendChild(userLi);

  const spandTitle = e.title;
  slider.appendChild(ulBtn);
  slider.appendChild(ulText);
}

const nextImages = () =>{
  btnLeft.style.display = 'block'
  nextImage = nextImage+1;
  let lengthImages = slider.children.length -1;
  if(lengthImages === nextImage){
    btnRight.style.display = 'none'
  }

  if(lengthImages >= nextImage ) {
    let next = slider.children[nextImage]
    next.scrollIntoView()
  }
}

const previousImages = () => {
  btnRight.style.display = 'block'
  previousImage = previousImage-1;
  let lengthImages = slider.children.length -1;
  if(previousImage === 0){
    btnLeft.style.display = 'none'
  }

  if(lengthImages >= previousImage ) {
    let next = slider.children[previousImage]
    next.scrollIntoView()
  }
      
}

function imgHover(){
  console.log('testinggggggg');
  console.log(testing.length)
  //slider.children.style.display = 'block';
}

btnRight.addEventListener('click', nextImages);
btnLeft.addEventListener('click', previousImages);

getImages();    