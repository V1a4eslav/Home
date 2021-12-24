const url: string = 'https://dog.ceo/api/breed/hound/images';
const galleryList = document.querySelector('.gallery__list') as HTMLElement;
const modalBlock = document.querySelector('.modal') as HTMLElement;
const modalImg = modalBlock.querySelector('.modal__img') as HTMLElement;
const itemCountOnPage: number = 15;
let paginationList: string[] = [];

interface GetImages {
    message?: string[],
    status?: string|number
}

galleryList.addEventListener('click', (e) => {
    const target = e.target as Element;
    if (target.closest('.gallery__item')) {
        const src = target.getAttribute('src');
        modalImg.setAttribute('src', src);
        modalToggle(modalBlock);
    }
});

modalBlock.addEventListener('click', (e) => {
    const target = e.target as Element;
    if (!target.classList.contains('modal__img')) {
        modalToggle(modalBlock);
    }
});

async function start() {
    const images: GetImages = await getImagesData();
    paginationList = createPagination(images.message);
    renderPagination();
    setCurrentPage(0);
}

start();

async function getImagesData() {
    const res = await fetch(url);
    return await res.json();
}

function createItemImg(item) {
    const imageItem = document.querySelector<HTMLElement>('#gallery__item').content;
    const li = imageItem.querySelector('.gallery__item') as HTMLElement;
    const img = imageItem.querySelector('.gallery__img') as HTMLElement;
    img.setAttribute('src', item)
    return li.cloneNode(true);
}

function renderHTML(images: string[]) {
    galleryList.innerHTML = '';
    images.forEach(img => {
        galleryList.appendChild(createItemImg(img));
    });
}

function createPagination(images: string[]) {
    const paginationList: any = [];
    let temporaryList: string[] = [];
    let itemsCount: number = 0;
    let arrayIndex: number = 0;

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
    const paginationScope = document.querySelector('.pagination') as HTMLElement;
    const TempGalleryPagination = document.querySelector<HTMLElement>('#gallery__pagination').content;
    const paginationItem = TempGalleryPagination.querySelector('.pagination__item') as HTMLElement;

    paginationList.forEach((item, index) => {
        const paginationTemplateItemClone: any = paginationItem.cloneNode(true);
        paginationTemplateItemClone.setAttribute('data-page', index);
        paginationTemplateItemClone.textContent = String(++index);
        paginationTemplateItemClone.addEventListener('click', e => {
            const target = e.target as Element;
            setCurrentPage(target.dataset.page);
        });
        paginationScope.append(paginationTemplateItemClone);
    });
}

function setCurrentPage(page: string | number) {
    const currentImages = paginationList[page];
    renderHTML(currentImages);
}

function modalToggle(item) {
    item.classList.toggle('show');
}