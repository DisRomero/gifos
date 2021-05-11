const api_key = "I9YUl0qQ7GUVk9LXsawA8eFHyjZC7HRP";
//const api_key = 'M56ORmffhkS4OWzdIE3ZPfFQXWSjF30N';

import { checkMode } from "./darkMode.js";
import { sendApiRequest } from "./searchGifos.js";
import * as trendingTag from "./trendingInfo.js";
import { getImages } from "./trendingGifos.js"

/**
 * /////////
        const attachHover = (imgContainer) =>{
          
          return () => {
            console.log(imgContainer.length)
            const ulBtns = document.createElement("ul");
            const LiBtnF = document.createElement("li");
            const btnFavorite = document.createElement("button");
            btnFavorite.appendChild(document.createTextNode("<3"));
            btnFavorite.classList.add("btn-favorite");
            LiBtnF.appendChild(btnFavorite);
            ulBtns.appendChild(LiBtnF);

            const span = document.createElement('span');
            const userName = document.createElement("p");
            const userTittle = document.createElement("p");
            userName.innerText = e.username;
            userTittle.innerText = e.title;
            span.appendChild(username)
            span.appendChild(userTittle)


            imgContainer.appendChild(ulBtns);
            imgContainer.appendChild(span)
          }
        }

        const divs = document.getElementsByClassName("div-slider");
        for (const item of divs) {
          //item.addEventListener('click', attachHover(item))
        }
        /////////////////////
        
 */
