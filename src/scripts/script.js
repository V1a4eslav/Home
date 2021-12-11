import '../css/style.css';

class Slider {
	constructor() {
		this.sliderLine = document.querySelector('.slider__line'),
			this.prev = document.querySelector('.slider__btn_prev'),
			this.next = document.querySelector('.slider__btn_next'),
			this.pausedBtn = document.querySelector('.slider__btn_paused'),
			this.playBtn = document.querySelector('.slider__btn_play'),
			this.img = document.querySelector('.slider__img'),
			this.prev.addEventListener('click', this.togglePrev.bind(this)),
			this.next.addEventListener('click', this.toggleNext.bind(this)),
			this.playBtn.addEventListener('click', this.autoplay.bind(this)),
			this.pausedBtn.addEventListener('click', this.pausedSlider.bind(this)),
			this.offset = 0,
			this.starting = 0,
			this.widthSliderLine = parseInt(getComputedStyle(this.sliderLine).width),
			this.widthImg = parseInt(getComputedStyle(this.img).width)
	}

	togglePrev() {
		this.offset = this.offset - this.widthImg;
		if (this.offset < 0) {
			this.offset = (this.widthSliderLine - this.widthImg);
		}
		this.sliderLine.style.left = -this.offset + 'px';
	}

	toggleNext() {
		this.offset = this.offset + this.widthImg;
		if (this.offset === this.widthSliderLine) {
			this.offset = 0;
		}
		this.sliderLine.style.left = -this.offset + 'px';
	}

	pausedSlider() {
		clearInterval(this.starting);
		this.disabledTrueBtn(this.pausedBtn);
		this.disabledFalseBtn(this.playBtn);
	}

	autoplay() {
		this.starting = setInterval(this.toggleNext.bind(this), 1500);
		this.disabledTrueBtn(this.playBtn);
		this.disabledFalseBtn(this.pausedBtn);
	}

	disabledFalseBtn(btn) {
		btn.disabled = false;
	}

	disabledTrueBtn(btn) {
		btn.disabled = true;
	}
}

const slider = new Slider();
slider.autoplay();


