const api_key = "I9YUl0qQ7GUVk9LXsawA8eFHyjZC7HRP";
const api_trending = `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=6`;
const slider = document.getElementById('slider');
const btnLeft = document.getElementById("btn-left");
const btnRight = document.getElementById("btn-right");
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
          data.forEach( function(e) {  
              const img = document.createElement('img');
              img.classList.add('slider-image');
              img.src = e.images.downsized.url;
              //console.log(img.src)
              slider.appendChild(img);
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
  
function nextImages() {
  btnLeft.style.display = 'block'
  nextImage = nextImage+1;
  let lengthImages = slider.children.length -1;
  console.log(lengthImages,'valor de length images of Next Images')
  if(lengthImages === nextImage){
    btnRight.style.display = 'none'
  }

  if(lengthImages >= nextImage ) {
    console.log(nextImage,'valor de next images of Next Images')
    let next = slider.children[nextImage]
    next.scrollIntoView()
  }
      
}

function previousImages() {
  btnRight.style.display = 'block'
  previousImage = previousImage-1;
  let lengthImages = slider.children.length -1;
  console.log(lengthImages,'valor de length images of Previous Images')
  if(previousImage === 0){
    btnLeft.style.display = 'none'
  }

  if(lengthImages >= previousImage ) {
    console.log(previousImage,'valor de next images of Previous Images')
    let next = slider.children[previousImage]
    next.scrollIntoView()
  }
      
}

btnRight.addEventListener('click', nextImages);
btnLeft.addEventListener('click', previousImages);
getImages();    