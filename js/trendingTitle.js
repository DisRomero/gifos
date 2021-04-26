const api_key = "I9YUl0qQ7GUVk9LXsawA8eFHyjZC7HRP";
const trendingTitles = `https://api.giphy.com/v1/tags/related/trending?api_key=${api_key}&limit=5`;

function trendingTag (){
    console.log('wiii llamo la funcion por default');
fetch(trendingTitles)
.then(function(respondeTrending){
    return respondeTrending.json();
})
.then(function(json){
 json.data.forEach(function (obj) {
    let titleTrending = obj.name;
    let tag = document.createElement("a");
    let tagSection = document.getElementById("trending-info");
    let textInfo = document.createTextNode(titleTrending + ",");
    tag.appendChild(textInfo);   
    tagSection.appendChild(tag);
    tagSection.classList.add('text-body');
    //tag.href = 'https://www.google.com/';     
 });
})
.catch(function (err){
    console.error("The API responde of Trending Titles display an error");
    console.log(err.message);
});
};

document.addEventListener('DOMContenLoaded', trendingTag());
