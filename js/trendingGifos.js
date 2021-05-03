
const slider = document.getElementById('slider');
const btnLeft = document.getElementById('btn-left');
const btnRight =document.getElementById('btn-right');
const sliderDiv = document.getElementsByClassName('slider-div');
const sliderDivLast = sliderDiv[sliderDiv.length - 1];

slider.insertAdjacentElement('afterbegin', sliderDivLast);


btnLeft.addEventListener('click', (e) => {
    test();
});
btnRight.addEventListener('click', (e) => {
    test();
});



export function test(){
    console.log('dio click');
};

