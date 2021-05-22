export const addGifoFavorite = (gifo) => {
  
    let btn = gifo.path[2].children[0];//.classList.add//
    btn.classList.add('active')
    
    //save img into local storage
    let urlImg = [
        {user:'hola', 
        name: 'funciono', 
        src: gifo.path[4].children[0].currentSrc}
    ];
    let DataImgFavorite = localStorage.getItem('ImgFavorite');
    if(DataImgFavorite==null){
        localStorage.setItem('ImgFavorite', JSON.stringify(urlImg));
    }else{
        let dataImg = JSON.parse(DataImgFavorite)
        let newImgFavorite = {
            user:'holax', 
            name: 'funcionox', 
            src: gifo.path[4].children[0].currentSrc
        }
        dataImg.push(newImgFavorite)
        localStorage.setItem('ImgFavorite', JSON.stringify(dataImg))
    }

    // //Imaginate que el usuario añadio a favorito estos coches
    // let carListFav = [
    //     {name:'car1', id:1},
    //     {name:'car2', id:2}
    // ]

    // //Miramos si ya hemos guardado algo anteriormente.
    // let recoveredData = localStorage.getItem('car')
    // if(recoveredData == null){
    //     //No tenemos nada guardado, por lo cual vamos a guardar el carListFav
    // localStorage.setItem('car', JSON.stringify(carListFav))
    // } else {
    //     //Tenemos algo, por lo cual vamos a añadir un nuevo coche
    // let data = JSON.parse(recoveredData)
    // let newCar = {name:'car3', id:3}
    // //Asegurate que lo que guardes es realmente un array.
    // data.push(newCar)
    // localStorage.setItem('car', JSON.stringify(data))
    // }

    // //Check si se guardo bien
    // console.log(localStorage.getItem('car'))




    test(gifo)
}

const test = (gifo) => {
    //let imgUrl = gifo.path[4].children[0].children[0].currentSrc;//
    let imgName = gifo.path[4].children[2].children[1].outerText;    
 
    let test = 'https://media4.giphy.com/media/3o6nUKYhbfKk4iRT4Q/giphy-downsized.gif?cid=8b0ba690xtdcazdemjelqls77hple5b4xaoy0092ydhirxl0&rid=giphy-downsized.gif'
    let imgvalue = test;
    
    /**
     * 
     * const colorSwitch = document.getElementById("color-switch");
colorSwitch.addEventListener("click", checkMode);

export function checkMode() {
  if (colorSwitch.checked) {
    darkModeOn();
  } else {
    darkModeOff();
  }
}

function darkModeOn() {
  document.body.classList.add("dark-mode");
  localStorage.setItem("dark-mode", "true");
  // replace text mode
  const txtMode = document.getElementById("text-color-switch");
  txtMode.innerHTML = txtMode.innerHTML.replace("nocturno", "diurno");
}

function darkModeOff() {
  document.body.classList.remove("dark-mode");
  localStorage.setItem("dark-mode", "false");
  // replace text mode
  const txtMode = document.getElementById("text-color-switch");
  txtMode.innerHTML = txtMode.innerHTML.replace("diurno", "nocturno");
}

// get value of dark-mode into local storage
if (localStorage.getItem("dark-mode") === "true") {
  colorSwitch.checked = true;
  darkModeOn();
} else {
  colorSwitch.classList.remove("active");
  darkModeOff();
}

     */
    download(imgvalue, imgName)

    /**
     */
}

function download(imgvalue, imgName){
    console.log('value img', imgvalue)
    console.log('name', imgName)
    let aTag = document.createElement('a');
    aTag.setAttribute('href', encodeURIComponent(imgvalue));
    // aTag.setAttribute('href', imgvalue);
    aTag.setAttribute('download', imgName+'.gif');
    aTag.style.display = 'none';

    console.log('value Atag img', aTag.href)
    console.log('name Atag', aTag.download)

    document.body.appendChild(aTag);
    aTag.click()
    // aTag.addEventListener("click", (event) => {
    //     event.preventDefault();
    // });
    
    document.body.removeChild(aTag);

}



  
