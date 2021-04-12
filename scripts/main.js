const api_key = "I9YUl0qQ7GUVk9LXsawA8eFHyjZC7HRP"
const trending = 'https://api.giphy.com/v1/gifs/trending?api_key=I9YUl0qQ7GUVk9LXsawA8eFHyjZC7HRP&limit=1';

fetch(trending)
.then(response => response.json() )
.then(data =>{
    console.log(data)
    //console.log('META', data.meta)
    let url_img = data.data[0].images.downsized.url
    console.log(url_img)
    let element = document.getElementById('test')
    element.innerHTML = '<img src="'+url_img+'  height="200" width="200"/>'

    
    
})
.catch(err=>console.log(err))