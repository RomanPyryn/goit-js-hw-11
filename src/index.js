import './css/styles.css';
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import GetImagesApiService from './getImagesApiService';


const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const btnEl = document.querySelector('.load-more-btn');

const getImagesApiService = new GetImagesApiService();

let nuberOfHits = 0;

formEl.addEventListener('submit', onSearch);
btnEl.addEventListener('click', onLoad);

function onSearch(e) { 
    e.preventDefault();

    getImagesApiService.req = e.currentTarget.elements.searchQuery.value.trim();
    galleryEl.innerHTML = '';
    btnEl.classList.add('visually-hidden');

    if (getImagesApiService.req == '') {
        btnEl.classList.add('visually-hidden');
        return Notiflix.Notify.failure("Please, enter something!");
    }

    getImagesApiService.resetPage();
    // getImagesApiService.getImages().then(onGetSucces).catch(onGetError);
    gettingImages();
    nuberOfHits = 0;
};

function onLoad() {
    // getImagesApiService.getImages().then(onGetSucces).catch(onGetError);
    gettingImages();
};

async function gettingImages() {
    try {
        const images = await getImagesApiService.getImages();
        onGetSucces(images);
    } catch (error) {
        onGetError();
    console.log(error.message);
  }
}

function onGetSucces(data) {
    if (data.hits.length === 0) {
        btnEl.classList.add('visually-hidden');
        return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    }

    nuberOfHits += data.hits.length;
    
    galleryEl.insertAdjacentHTML('beforeend', createGalleryItemsMarkup(data));
    btnEl.classList.remove('visually-hidden');
    lightbox.refresh();

    if (nuberOfHits >= data.totalHits) {
        btnEl.classList.add('visually-hidden');
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
     };

    if (nuberOfHits === data.hits.length) {
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
     };
};

function onGetError(error) {
    console.log(error);
};

function createGalleryItemsMarkup(data) {
    return data.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `
        <div class="photo-card">
           <a href="${largeImageURL}"> 
           <img class="cover" src="${webformatURL}" alt="${tags}" loading="lazy" />
           </a>
            <div class="info">
                <div class="info-item">
                    <p><b>Likes</b></p> 
                    <p>${likes}</p>
                </div> 
                <div class="info-item">
                    <p><b>Views</b></p> 
                    <p>${views}</p>
                </div>
                <div class="info-item">
                    <p><b>Comments</b></p> 
                    <p>${comments}</p>
                </div>
                <div class="info-item">
                    <p><b>Downloads</b></p> 
                    <p>${downloads}</p>
                </div>
            </div>
        </div>
        `
    } ).join('');
};

var lightbox = new SimpleLightbox('.photo-card a', {
    captions: true,
    captionsData: "alt",
    captionDelay: 250,
});