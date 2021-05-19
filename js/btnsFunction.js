/*
//agregar addevenlt listener cuando se crea el boton, pero crear archivos diferentes 
por funcionalidades
*/

export const addGifoFavorite = (gifo) => {
    //let tes = gifo;
    console.log(gifo)
    // btnFavorite.classList.add('active');
    // console.log(btnFavorite,'btn')
    let tes = gifo.path[4].children[0].currentSrc;
    console.log('Src de la img', tes);
    let btn = gifo.path[2].children[0];//.classList.add
    console.log('info de btn', btn)
    btn.classList.add('active')

   
   
    //console.log('Toma la posicion del boton sin agregar la clase', btn)
    
    // btnFavorite.classList.add('active');



}

