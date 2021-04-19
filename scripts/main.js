//////////////////dark-mode
const colorSwitch = document.getElementById("color-switch");

colorSwitch.addEventListener("click", checkMode);

function checkMode() {
  if (colorSwitch.checked) {
    console.log("dark mode");
    darkModeOn();
  } else {
    console.log("light mode");
    darkModeOff();
  }
}

function darkModeOn() {
  document.body.classList.add("dark-mode");
  localStorage.setItem('dark-mode', 'true');

  //replace text mode
  const txtMode = document.getElementById('text-color-switch');
  txtMode.innerHTML = txtMode.innerHTML.replace('nocturno','diurno');
}

function darkModeOff() {
  document.body.classList.remove("dark-mode");
  localStorage.setItem('dark-mode', 'false');
  //replace text mode
  const txtMode = document.getElementById('text-color-switch');
  txtMode.innerHTML = txtMode.innerHTML.replace('diurno','nocturno');
}

//get value of dark-mode into local storage
if(localStorage.getItem('dark-mode') === 'true'){
  colorSwitch.checked = true;
  darkModeOn();
}else{
  colorSwitch.classList.remove('active');
  darkModeOff();
}

//fetch search input
const inputSearch = document.getElementById('input-form-search').value;
const btnSearch = document.getElementById('btn-form-search');

const q = 'smile';
const api_key = "I9YUl0qQ7GUVk9LXsawA8eFHyjZC7HRP";
//const api_key = 'M56ORmffhkS4OWzdIE3ZPfFQXWSjF30N';
const api_search = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${q}&limit=6`;


btnSearch.addEventListener('click', (event)=>{
  event.preventDefault();
  sendApiRequest();
})

function sendApiRequest(){
  fetch(api_search).then(function(respondeSearch){
    console.log(respondeSearch);
    return respondeSearch.json();
    
  }).then(function(json){
    console.log(json)
    json.data.forEach(function(obj){
      console.log(obj.images.downsized.url);
    })
  }).catch(function(err){
    console.log(err.message);
  })
}

//fetch title trending



/////fetch gif treding


const trending =
`https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=1`;

fetch(trending)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    //console.log('META', data.meta)
    let url_img = data.data[0].images.downsized_large.url;
    //console.log(url_img);
    let element = document.getElementById("test");
   // element.innerHTML = '<img src="' + url_img + '  height="200" width="200"/>';
  })
  .catch((err) => console.log(err));