export const addGifoFavorite = (btn, gifos, gifosDownsized) => {
  const username = gifos.username;
  const title = gifos.title;
  const url = gifosDownsized.url;

  console.log("console log de btnFuncion", url);

  const DataImgFavorite = localStorage.getItem("ImgFavorite");

  const newImgFavorite = {
    username,
    title,
    url,
  };

  if (DataImgFavorite === null) {
    const startArray = [];
    startArray.push(newImgFavorite);
    localStorage.setItem("ImgFavorite", JSON.stringify(startArray));
  }

  if (DataImgFavorite !== null) {
    const dataImg = JSON.parse(DataImgFavorite);
    dataImg.push(newImgFavorite);
    localStorage.setItem("ImgFavorite", JSON.stringify(dataImg));
  }

  btn.classList.add("active");
  btn.disabled = true;
};

export const downloadGifo = (gifos, gifosDownsized) => {
  const title = gifos.title;
  const url = gifosDownsized.url;
  download(url, title);
};

async function download(imgValue, imgName) {
  let encoded = await getBase64FromUrl(imgValue);
  let aTag = document.createElement("a");
  aTag.setAttribute("href", encoded);
  aTag.setAttribute("download", imgName + ".gif");
  aTag.style.display = "none";
  aTag.target = "_blank";
  document.body.appendChild(aTag);
  aTag.click();
  document.body.removeChild(aTag);
}

const getBase64FromUrl = async (url) => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result;
      resolve(base64data);
    };
  });
};

export const expandGifo = (btn, gifos) => {
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
  modalImg.src = gifos.images.downsized.url;
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
