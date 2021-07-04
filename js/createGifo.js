const videoContainer = document.getElementById('video-container');
const successfulUpload = document.getElementById('upload-gifo');
const divVideo = document.getElementById('text-info-video');

const startbtn = document.getElementById('star-button');
const recordbtn = document.getElementById('record-button');
const stopbtn = document.getElementById('stop-button');
const uploadbtn = document.getElementById('upload-button');

const titleVideo = document.getElementById('title-text');
const descriptionVideo = document.getElementById('text-gif');

const stepOne = document.getElementById('first-step');
const stepTwo = document.getElementById('second-step');
const stepThird = document.getElementById('third-step');

const timer = document.getElementById('time');
const restartbtn = document.getElementById('return-recording');

let recorder;
let camera;
let interval;
let gitResult;

async function postData(url = '', data){
    const responde = await fetch(url, {
        method: 'POST',
        body: data
    });
    return responde.json();
}

const initRecord = () => {
    recorder = new GifRecorder(camera, {
        onGifPreview: function(gitURL) {
            videoContainer.src = gitURL;
        },
        onGifRecordingStarted: function() {
            titleVideo.innerHTML = '' ;
            descriptionVideo.innerHTML = '';
           recordbtn.style.display = 'inline-block';
           startbtn.style.display = 'none';
           stepOne.classList.remove('active');
           stepTwo.classList.add('active');
        },
        width: 320,
        height: 240,
        frameRate: 1,
        quality: 5
    });
    recorder.record();
}

const startGifoRecord = (e) => { 
    titleVideo.innerHTML = '¿Nos das acceso a tu cámara?';
    descriptionVideo.innerHTML = 'El acceso a tu camara será válido sólo por el tiempo en el que estés creando el GIFO.'
    stepOne.classList.add('active');

    navigator.mediaDevices.getUserMedia({ video: true })
        .then((media) => {
            camera = media;
            initRecord(camera);
        })
        .catch((error) => {
            alert('Error al capturar su camara');
            console.error(error);
        })

}

function timeDuration(seconds) {
    let hr = Math.floor(seconds / 3600);
    let min = Math.floor((seconds - (hr * 3600)) / 60);
    let sec = Math.floor(seconds - (hr * 3600) - (min * 60));

    if (min < 10){
        min = '0'+min;
    }

    if(sec < 10){
        sec = '0'+sec;
    }

    if(hr <= 0){
        hr = '0'+hr;
    }
    return hr + ':' + min + ':' + sec;
}

startbtn.addEventListener('click', startGifoRecord);

recordbtn.addEventListener('click', (e) => {
    recorder.stop(function(blob){});
    recorder.record();
    
    timer.innerText = '00:00:00';
    let seconds = 0;
    const updateTimer = () => {
        seconds++;
        timer.innerText = timeDuration(seconds);
    }
    interval = setInterval(updateTimer, 1000);
    
    stopbtn.style.display = 'inline-block';
    recordbtn.style.display = 'none';
});

stopbtn.addEventListener('click', (e) => {
    recorder.stop(function(blob){
        gitResult = blob;
        console.log(gitResult);
        videoContainer.src = URL.createObjectURL(blob);
        camera.stop();
        recorder = null;
    });
    clearInterval(interval);
    timer.innerText = '';
    uploadbtn.style.display = 'inline-block';
    stopbtn.style.display = 'none';
    restartbtn.style.display = 'block';
});

restartbtn.addEventListener('click', () => {
    restartbtn.style.display = 'none';
    uploadbtn.style.display = 'none';
    videoContainer.src = '';
    startGifoRecord(); 
});

const saveIntoLocalStorage = (data, key) => {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(key, jsonData);   
}

const getFromLocalStorage = (key) => {
    const arrayJsonValue = localStorage.getItem(key);
    return JSON.parse(arrayJsonValue);
}

uploadbtn.addEventListener('click', () => {
    const data = new FormData();
    data.append('api_key', 'I9YUl0qQ7GUVk9LXsawA8eFHyjZC7HRP');
    data.append('file', gitResult, 'gifoCreado.gif');
    postData(encodeURI('https://upload.giphy.com/v1/gifs'), data)
        .then(data => {
            const newGifoId = data.data.id;
            const localStorageGifos = getFromLocalStorage('gifCreated') || [];
            localStorageGifos.push(newGifoId);
            saveIntoLocalStorage(localStorageGifos, 'gifCreated');
            stepTwo.classList.remove('active');
            stepThird.classList.add('active');
            divVideo.style.marginLeft = "-20%";
            successfulUpload.style.display= 'flex';
            console.log('gif subido con exito');      
        })
        .catch((e) => {
            console.log(e);
        });
});

