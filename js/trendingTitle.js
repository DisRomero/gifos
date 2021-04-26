const api_key = "I9YUl0qQ7GUVk9LXsawA8eFHyjZC7HRP";

const trendingTitles = `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=2`;

 fetch(trendingTitles)
  .then(function (respondeTrending) {
    return respondeTrending.json();
  })
  .then(function (json) {
    json.data.forEach(function (obj) {
        console.log(obj + ' valor del cada objeto');
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


  /**
   export async function sendApiRequest() {
  fetch(api_search)
    .then(function (respondeSearch) {
      console.log(respondeSearch);      
      return respondeSearch.json();
    })
    .then(function (json) {
      //console.log(json);
      json.data.forEach(function (obj) {
        //console.log(obj.images.downsized.url);
      });
    })
    .catch(function (err) {
      console.log(err.message);
    });
};

document.addEventListener('DOMContentLoaded', nombredelafuncion());
   */

