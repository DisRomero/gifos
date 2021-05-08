// Variables
const api_key = "I9YUl0qQ7GUVk9LXsawA8eFHyjZC7HRP";
const api_trending = `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=2`;

const IMAGENES = [
    'assets/testimg/1.jpg',
    'assets/testimg/2.jpg',
    'assets/testimg/3.jpg',
    'assets/testimg/4.jpg'
];

const TIEMPO_INTERVALO_MILESIMAS_SEG = 2000;
    let posicionActual = 0;
    const btnLeft = document.getElementById("btn-left");
    const btnRight = document.getElementById("btn-right");
    const slider = document.getElementById('slider');
    const botonPlay = document.getElementById('play');
    const botonStop = document.getElementById('stop');
    let intervalo;

    // Funciones

    //tener las imagenes cuando se actualizar la pagina
    //document.addEventListener("DOMContenLoaded", trendingTag());


    /*
    json.data.forEach(function (obj) {
        let titleTrending = obj.name;
        let tag = document.createElement("a");
        let tagSection = document.getElementById("trending-info");
        let textInfo = document.createTextNode(titleTrending + ",");
        tag.appendChild(textInfo);
        tagSection.appendChild(tag);
        tagSection.classList.add("text-body");
        tag.href = "https://giphy.com/search/" + titleTrending;
      }
      
    */

    function getImages() {
        try {
          fetch(api_trending)
            .then(function (responde) {
              return responde.json();
            })
            .then(function (json) {
              const data = json.data;
      
              if (data.length > 0) {
                slider.innerHTML = "";
                data.forEach( function(e) {  
                    const img = document.createElement('img');
                    img.classList.add('.slider-image');
                    img.src = e.images.downsized.url;
                    console.log(img.src)
                    slider.appendChild(img);
                });
              }
            })
      
            .catch(function (err) {
              console.log(err.message);
            });
        } catch (e) {
          console.log(e);
        }
      }


    /**
     * Funcion que cambia la foto en la siguiente posicion
     */
     function pasarFoto() {
        if(posicionActual >= IMAGENES.length - 1) {
            posicionActual = 0;
        } else {
            posicionActual++;
        }
        renderizarImagen();
    }

    /**
     * Funcion que cambia la foto en la anterior posicion
     */
    function retrocederFoto() {
        if(posicionActual <= 0) {
            posicionActual = IMAGENES.length - 1;
        } else {
            posicionActual--;
        }
        renderizarImagen();
    }

    /**
     * Funcion que actualiza la imagen de imagen dependiendo de posicionActual
     */
    export function renderizarImagen () {
        slider.style.backgroundImage = `url(${IMAGENES[posicionActual]})`;
        if(botonStop.disabled){
            console.log('hola, esta deshabilitado')
            playIntervalo();
        }
    }

    /**
     * Activa el autoplay de la imagen
     */
    function playIntervalo() {
        intervalo = setInterval(pasarFoto, TIEMPO_INTERVALO_MILESIMAS_SEG);
        // Desactivamos los botones de control
        btnRight.setAttribute('disabled', true);
        btnLeft.setAttribute('disabled', true);
        botonPlay.setAttribute('disabled', true);
        botonStop.removeAttribute('disabled');

    }

    /**
     * Para el autoplay de la imagen
     */
    function stopIntervalo() {
        clearInterval(intervalo);
        // Activamos los botones de control
        btnRight.removeAttribute('disabled');
        btnLeft.removeAttribute('disabled');
        botonPlay.removeAttribute('disabled');
        botonStop.setAttribute('disabled', true);
    }

    // Eventos
    btnRight.addEventListener('click', pasarFoto);
    btnLeft.addEventListener('click', retrocederFoto);
    botonPlay.addEventListener('click', playIntervalo);
    botonStop.addEventListener('click', stopIntervalo);
    
    // Iniciar
    renderizarImagen();

    document.addEventListener("DOMContenLoaded", getImages());
