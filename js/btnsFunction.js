export const addGifoFavorite = (gifo) => {
 
  if(gifo.path.length === 12 || gifo.path[5].className === 'responde-list'){

    let btn = gifo.path[2].children[0];
    let userName = gifo.path[4].children[2].children[0].innerText;
    let gifName = gifo.path[4].children[2].children[1].innerText;
    let gifSrc = gifo.path[4].children[0].currentSrc;
    // btn.classList.add('active');
    
    //save img into local storage
    let startArray =new Array();
    let DataImgFavorite = localStorage.getItem('ImgFavorite');
   
    if(DataImgFavorite===null){
      localStorage.setItem('ImgFavorite', JSON.stringify(startArray));       
        /**  
      startedArray.push({user: userName, 
        name: gifName, 
        src: gifSrc});

      let newImgFavorite = {
            user: userName, 
            name: gifName, 
            src: gifSrc
          }

      startedArray.unshift(newImgFavorite)
         */
      
    }
    if(DataImgFavorite!==null){
      let dataImg = JSON.parse(DataImgFavorite);   
      let newImgFavorite = {
        user: userName, 
        name: gifName, 
        src: gifSrc
      }
      dataImg.push(newImgFavorite);
      localStorage.setItem('ImgFavorite', JSON.stringify(dataImg));
      btn.classList.add('active');
      btn.disabled = true;
     
    }
  }
}

export const downloadGifo = (gifo) => {
    //let imgUrl = gifo.path[4].children[0].children[0].currentSrc;//
    let imgName = gifo.path[4].children[2].children[1].outerText;    
 
    let test = 'https://media4.giphy.com/media/3o6nUKYhbfKk4iRT4Q/giphy-downsized.gif?cid=8b0ba690xtdcazdemjelqls77hple5b4xaoy0092ydhirxl0&rid=giphy-downsized.gif'
    let imgvalue = test;
    download(imgvalue, imgName);
}

function download(imgvalue, imgName){
    // console.log('value img', imgvalue);
    // console.log('name', imgName);
    let aTag = document.createElement('a');
    aTag.setAttribute('href', encodeURIComponent(imgvalue));
    // aTag.setAttribute('href', imgvalue);
    aTag.setAttribute('download', imgName+'.gif');
    aTag.style.display = 'none';

    // console.log('value Atag img', aTag.href);
    // console.log('name Atag', aTag.download);

    document.body.appendChild(aTag);
    aTag.click();
    // aTag.addEventListener("click", (event) => {
    //     event.preventDefault();
    // });
    
    document.body.removeChild(aTag);

}



  
