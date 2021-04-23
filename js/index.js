const api_key = "I9YUl0qQ7GUVk9LXsawA8eFHyjZC7HRP";
//const api_key = 'M56ORmffhkS4OWzdIE3ZPfFQXWSjF30N';

import { checkMode } from "./darkMode.js";
import { sendApiRequest } from "./searchGifos.js";

//fetch title trending
const trendingTitles = `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=2`;

fetch(trendingTitles)
  .then(function (respondeTrending) {
    return respondeTrending.json();
  })
  .then(function (json) {
    json.data.forEach(function (obj) {
      console.log(obj.title);
      let titleTrending = obj.title;
      let tag = document.createElement("span");
      let textInfo = document.createTextNode(titleTrending + ",");
      tag.appendChild(textInfo);
      let tagSection = document.getElementById("trending-info");
      tagSection.appendChild(tag);
    });
  })
  .catch(function (err) {
    console.error("The API responde of Trending Titles display an error");
    console.log(err.message);
  });

/////fetch gif treding
const trending = `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=1`;

fetch(trending)
  .then((response) => response.json())
  .then((data) => {
    //console.log(data);
    //console.log('META', data.meta)
    let url_img = data.data[0].images.downsized_large.url;
    //console.log(url_img);
    let imgGifo = document.createElement("img");
    imgGifo.src = url_img;
    //sdocument.getElementById("test").appendChild(imgGifo);
  })
  .catch((err) => console.log(err));

////////search responde
const sectionTag = (document.getElementById(
  "search-gifos-responde"
).style.display = "none");
