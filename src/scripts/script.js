import '../css/style.css';

const sliderLine = document.querySelector('.slider__line');
const prev = document.querySelector('.slider__btn_prev');
const next = document.querySelector('.slider__btn_next');
const pausedBtn = document.querySelector('.slider__btn_paused');
const playBtn = document.querySelector('.slider__btn_play');
const img = document.querySelector('.slider__img');
const widthSliderLine = parseInt(getComputedStyle(sliderLine).width)
const widthImg = parseInt(getComputedStyle(img).width)
let offset = 0;
let starting;

prev.addEventListener('click', togglePrev);
next.addEventListener('click', toggleNext);
playBtn.addEventListener('click', autoplay);
pausedBtn.addEventListener('click', pausedSlider);

function togglePrev() {
	offset = offset - widthImg;
	if (offset < 0) {
		offset = (widthSliderLine - widthImg);
	}
	sliderLine.style.left = -offset + 'px';
}

function toggleNext() {
	offset = offset + widthImg;
	if (offset === widthSliderLine) {
		offset = 0;
	}
	sliderLine.style.left = -offset + 'px';
}

function pausedSlider() {
	clearInterval(starting);
	disabledTrueBtn(pausedBtn);
	disabledFalseBtn(playBtn);
}

function autoplay() {
	starting = setInterval(toggleNext, 1500);
	disabledTrueBtn(playBtn);
	disabledFalseBtn(pausedBtn);
}

function disabledFalseBtn(btn) {
	btn.disabled = false;
}

function disabledTrueBtn(btn) {
	btn.disabled = true;
}

autoplay();


