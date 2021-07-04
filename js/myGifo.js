const divWithoutContent = document.getElementById(
  "my-gifos-section-without-content"
);
const divWithContent = document.getElementById("my-gifos-section-with-content");
const gifoCreated = localStorage.getItem("gifCreated");
const btn = document.getElementById('btn-my-gifos-section');

const addGifoCreated = (gifos) => {
  console.log(gifos);
  const ul = document.getElementById("ul-my-gifos");
  ul.classList.add("gifos-list");
  let tagLiResponde = document.createElement("li");
  tagLiResponde.classList.add("div-slider");
  let tagImgResponde = document.createElement("img");
  tagImgResponde.src = `https://media.giphy.com/media/${gifos}/source.gif`;

  tagLiResponde.appendChild(tagImgResponde);
  ul.appendChild(tagLiResponde);

};

if (document.getElementById("my-gifos-section")) {
  if (gifoCreated == null) {
    divWithoutContent.style.display = "flex";
  }
  if (gifoCreated !== null) {
    console.log("Ya hay un gifo creado y guardado en el LS");
    divWithContent.style.display = 'block';
    let data = JSON.parse(gifoCreated);
    let initialPosition = 0;
    let size = 12;
    let nextGifos = data.splice(initialPosition, size);
    nextGifos.forEach(addGifoCreated);

    btn.style.display= 'flex'

    btn.addEventListener('click', () => {
      let nextGifos = data.splice(initialPosition, size);
      nextGifos.forEach(addGifoCreated);
      if(data.length === 0 ){
        btn.style.display = 'none';
      }
    })
  }
}