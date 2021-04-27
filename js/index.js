const api_key = "I9YUl0qQ7GUVk9LXsawA8eFHyjZC7HRP";
//const api_key = 'M56ORmffhkS4OWzdIE3ZPfFQXWSjF30N';

import { checkMode } from "./darkMode.js";
import { sendApiRequest } from "./searchGifos.js";
import * as trendingTag from "./trendingInfo.js";

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
    //document.getElementById("test").appendChild(imgGifo);
  })
  .catch((err) => console.log(err));


