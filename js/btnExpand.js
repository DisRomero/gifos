// const bntsUlSearchResponde = document.getElementById('ul-search-gifos-responde');
// bntsUlSearchResponde.addEventListener('click', funccion);
// crear y llamar una funcion para que cuando la funcion de searchGifos se ejecute, ejejcute esta


//agregar addevenlt listener cuando se crea el boton, pero crear archivos diferentes por funcionalidades


const funccion = async (btn) =>{
    console.log('le dio click')
    console.log(btn.path[1].className)
    console.log(btn)
}

const btnsContainer = document.getElementById('slider');
btnsContainer.addEventListener('click', funccion);

