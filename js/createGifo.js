const startBtn = document.getElementById('star-button');
const secondStepBtn =document.getElementById('second-step');
const textAccessCamera = document.getElementById('text-camera-access');
const firstStepNo = document.getElementById('first-step');
const secondStepNo = document.getElementById('second-step');
const thirdStepNo = document.getElementById('third-step');
const divBtns = document.getElementById('buttons-recording');
const divToolsRec = document.getElementById('tools-recording');

const createTag = (textValue) => {
    let newBtn = document.createElement('button');
    newBtn.classList.add('button');
    newBtn.classList.add('text-body');
    newBtn.id = `div-${textValue}`
    newBtn.textContent = textValue;
    divBtns.appendChild(newBtn);
}

const accessCamera = () => {
    const textCreateGifo = document.getElementById('text-info-video');
    textCreateGifo.style.display = 'none';
    textAccessCamera.style.display = 'block';
    startBtn.style.display = 'none';
    firstStepNo.classList.add('active');
    console.log('Pide permisos para usar la camara');

}

const displayScreen = () => {
    console.log('Activa la camara');
    firstStepNo.classList.remove('active');
    secondStepNo.classList.add('active');
    textAccessCamera.style.display = 'none';
    createTag('grabar');
    const recordBtn = document.getElementById('div-grabar');
    recordBtn.addEventListener('click', startScreen);
}

const startScreen = () => {
    console.log('dio clic en el boton grabar');
    const recordBtn = document.getElementById('div-grabar');
    recordBtn.style.display = 'none';

    //no funciona en la segunda ronda ya que crea el texto y el boton otra vez

    let textRec = document.createElement('p');
    textRec.id = 'text-Rec';
    textRec.classList.add('text-body');
    textRec.classList.add('timer');
    textRec.textContent='timer recording';
    divToolsRec.appendChild(textRec);
    createTag('finalizar');
    const stopBtn = document.getElementById('div-finalizar');
    stopBtn.addEventListener('click', stopScreen);
}

const stopScreen = () => {
    console.log('paro la grabacion')
    const stopBtn = document.getElementById('div-finalizar');
    stopBtn.style.display = 'none';
    createTag('subir gifo');
    const textRec = document.getElementById('text-Rec');    
    textRec.textContent = 'repetir captura';
    textRec.addEventListener('click', setValues);
    const uploadBtn = document.getElementById('div-subir gifo');
    uploadBtn.addEventListener('click', uplaodGifo) 
}

const setValues = () => {
    const uploadBtn = document.getElementById('div-subir gifo');
    uploadBtn.style.display = 'none';
    const recordBtn = document.getElementById('div-grabar');
    recordBtn.style.display = 'block'
    recordBtn.addEventListener('click', startScreen);
}

const uplaodGifo = () => {
    secondStepNo.classList.remove('active');
    thirdStepNo.classList.add('active');
    const uploadBtn = document.getElementById('div-subir gifo');
    uploadBtn.style.display = 'none';
    const textRec = document.getElementById('text-Rec'); 
    textRec.style.display = 'none';
    console.log('sube el gif a giphy y guarda el id en localstorage')
}

startBtn.addEventListener('click', accessCamera);
secondStepBtn.addEventListener('click', displayScreen);


// const btnStart = document.getElementById('start-screen');
// const videoDiv = document.getElementById('div-video');
// const video = document.getElementById('createGifoTag');
// const TextDiv = document.getElementById('div-text');
// const stream = { audio: false, video: { width: 1280, height: 720 } };
// const btnRecord = document.getElementById('record-screen');
// const btnFinishRecord = document.getElementById('finish-record-screen');
// const videoTime = document.getElementById('video-time');
// const uploadGifo = document.getElementById('upload-gifo');
// const repeatGifo = document.getElementById('repeat-screen');

// let recorder = () =>{};
// let isMarch = false; 
// let gatherTime = 0;//acumularTime
// let initialTime ='';
// let control='';

// if(document.getElementById('start-screen')){
//     btnStart.onclick = async () =>{
//         accessCamera();
//     };
// };

// if(document.getElementById('record-screen')){
//     btnRecord.onclick = async () =>{
//         record();
//         start();
//     };
// };

// if(document.getElementById('finish-record-screen')){
//     btnFinishRecord.onclick = async () =>{
//         stop();
//         await recorder.stopRecording();   
//     };
// };

// if(document.getElementById('repeat-screen')){
//     repeatGifo.onclick = async () =>{
//         btnRecord.style.display = 'block';
//         repeatGifo.style.display = 'none';
//         uploadGifo.style.display = 'none';
//     };
// };

// if(document.getElementById('upload-gifo')){
//     let blob = await recorder.getBlob();
//     saveGifo(blob);
// };

// async function accessCamera (){
//     await navigator.mediaDevices.getUserMedia(stream)
//     .then(function(stream) {
//         const lightCamera = document.getElementById('record-img').children[1];
//         TextDiv.style.display = 'none';
//         videoDiv.style.display = 'block';
//         video.style.zIndex = "100";
//         video.style.display = 'block'
//         // lightCamera.style.height = '48%';
//         video.srcObject = stream;
//         video.onloadedmetadata = async function(e) {
//         video.play();
//         btnStart.style.display = 'none'
//         btnRecord.style.display = 'block'
//         };
//     })
//     .catch(function(err) {
//         console.log(err.name + ": " + err.message); 
//     }); // always check for errors at the end.
// };

// function record (){
//     navigator.mediaDevices.getUserMedia(stream)
//     .then(function(stream) {
//     videoTime.style.display = 'block';
//     video.srcObject = stream;
//     video.onloadedmetadata = async function(e) {
//         video.play();
//         recorder = RecordRTC(stream, {
//             type: 'gif',
//             frameRate: 1,
//             quality: 10,
//             width: 360,
//             hidden: 240,
//             onGifRecordingStarted: function() {
//              console.log('started')//
//            },
//           });
//         recorder.startRecording();
//     };
//     })
//     .catch(function(err) { 
//         console.log(err.name + ": " + err.message); // always check for errors at the end.
//     }); 
// };

// function start () {
//     if (isMarch == false) { 
//        initialTime = new Date();//timeInicial
//        control = setInterval(chronometer,10);//cronometro
//        isMarch = true;
//        btnRecord.style.display = 'none'
//        btnFinishRecord.style.display='block'
//     };
// };

// function stop () { 
//     if (isMarch == true) {
//        clearInterval(control);
//        isMarch = false;
//        btnFinishRecord.style.display='none';
//        uploadGifo.style.display = 'block';
//        videoTime.style.display = 'none';
//        repeatGifo.style.display = 'block';
//     } ;    
// };

// function chronometer (){ 
//     let currentTime = new Date();//timeActual
//     gatherTime = currentTime - initialTime;
//     let gatherTime2 = new Date();
//     gatherTime2.setTime(gatherTime); 
//     let cc = Math.round(gatherTime2.getMilliseconds()/10);
//     let ss = gatherTime2.getSeconds();
//     let mm = gatherTime2.getMinutes();
    
//     if (cc < 10) {cc = "0"+cc;}
//     if (ss < 10) {ss = "0"+ss;} 
//     if (mm < 10) {mm = "0"+mm;}
    
//     videoTime.innerHTML = mm+" : "+ss+" : "+cc; 
// };

// async function saveGifo(blob)
// {
//     let formData = new FormData();
//     const usuario = "andresalzateg";
//     formData.append('api_key', APIKey);
//     formData.append('username', usuario);
//     formData.append('file', blob, 'myGif.gif');
//     formData.append('tags', 'mygifo');
//     // invokeSaveAsDialog(blob);

//     const queryCargarGifo = `https://upload.giphy.com/v1/gifs`;
//     await fetch(encodeURI(queryCargarGifo), {
//         method: 'POST',
//         body: formData
//     })
//     .then(res => res.json())
//     .catch(error => console.error('Error:', error))
//     .then(response =>
//         {
//             MisGifos.push(response.data.id);
//             localStorage.setItem('MisGifos', JSON.stringify(MisGifos));
//             this.video.srcObject.getTracks()[0].stop();
//         });
// }
