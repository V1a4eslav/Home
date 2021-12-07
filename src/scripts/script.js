import '../css/style.css';

const URL = 'https://dog.ceo/api/breed/hound/images';
const galleryList = document.querySelector('.gallery__list');
const modalBlock = document.querySelector('.modal');
const modalImg = modalBlock.querySelector('.modal__img');
const itemCountOnPage = 15;
let paginationList = [];

galleryList.addEventListener('click', (e) => {
	if (e.target.closest('.gallery__item')) {
		const src = e.target.getAttribute('src');
		modalImg.setAttribute('src', src);
		modalToggle(modalBlock);
	}
});

modalBlock.addEventListener('click', (e) => {
	if(!e.target.classList.contains('modal__img')){
		modalToggle(modalBlock);
	}
});

async function start() {
	const images = await getImagesData();
	paginationList = createPagination(images.message);
	renderPagination();
	setCurrentPage(0);
}

start();

async function getImagesData() {
	const res = await fetch(URL);
	return await res.json();
}

function createItemImg(item) {
	const imageItem = document.querySelector('#gallery__item').content;
	const li = imageItem.querySelector('.gallery__item');
	const img = imageItem.querySelector('.gallery__img');
	img.setAttribute('src', item)
	return li.cloneNode(true);
}

function renderHTML(images) {
	galleryList.innerHTML = '';
	images.forEach(img => {
		galleryList.appendChild(createItemImg(img));
	});
}

function createPagination(images) {
	const paginationList = [];
	let temporaryList = [];
	let itemsCount = 0;
	let arrayIndex = 0;

	images.forEach(img => {
		itemsCount++;
		temporaryList.push(img);
		if (itemsCount === itemCountOnPage) {
			paginationList[arrayIndex] = temporaryList;
			itemsCount = 0;
			arrayIndex++;
			temporaryList = [];
		}
	});
	return paginationList;
}

function renderPagination() {
	const paginationScope = document.querySelector('.pagination');
	const TempGalleryPagination = document.querySelector('#gallery__pagination').content;
	const paginationItem = TempGalleryPagination.querySelector('.pagination__item');

	paginationList.forEach((item, index) => {
		const paginationTemplateItemClone = paginationItem.cloneNode(true);
		paginationTemplateItemClone.setAttribute('data-page', index);
		paginationTemplateItemClone.textContent = ++index;
		paginationTemplateItemClone.addEventListener('click', e => {
			setCurrentPage(e.target.dataset.page);
		});
		paginationScope.append(paginationTemplateItemClone);
	});
}

function setCurrentPage(page) {
	const currentImages = paginationList[page];
	renderHTML(currentImages);
}

function modalToggle(item) {
	item.classList.toggle('show');
}

