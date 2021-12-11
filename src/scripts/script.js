import '../css/style.css';
import {DOM} from "./dom";

const widthSliderLine = parseInt(getComputedStyle(DOM.sliderLine).width)
const widthImg = parseInt(getComputedStyle(DOM.img).width)
let offset = 0;
let starting;

DOM.prev.addEventListener('click', togglePrev);
DOM.next.addEventListener('click', toggleNext);
DOM.playBtn.addEventListener('click', autoplay);
DOM.pausedBtn.addEventListener('click', pausedSlider);

function togglePrev() {
	offset = offset - widthImg;
	if (offset < 0) {
		offset = (widthSliderLine - widthImg);
	}
	DOM.sliderLine.style.left = -offset + 'px';
}

function toggleNext() {
	offset = offset + widthImg;
	if (offset === widthSliderLine) {
		offset = 0;
	}
	DOM.sliderLine.style.left = -offset + 'px';
}

function pausedSlider() {
	clearInterval(starting);
	disabledTrueBtn(DOM.pausedBtn);
	disabledFalseBtn(DOM.playBtn);
}

function autoplay() {
	starting = setInterval(toggleNext, 1500);
	disabledTrueBtn(DOM.playBtn);
	disabledFalseBtn(DOM.pausedBtn);
}

function disabledFalseBtn(btn) {
	btn.disabled = false;
}

function disabledTrueBtn(btn) {
	btn.disabled = true;
}

autoplay();


