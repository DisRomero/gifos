
/**
 * localStorage.setItem("ImgFavorite", "true");
 * getImgFavorite
 */
const divWithoutContent = document.getElementById('fav-section-without-content');
const divWithContent = document.getElementById('fav-section-with-content');
const favSaved = localStorage.getItem("ImgFavorite");


if (favSaved == null){
    divWithoutContent.style.display = "flex";
}else{
    divWithContent.style.display = 'flex';
}