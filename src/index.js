import './css/styles.css';
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import GetImagesApiService from './getImagesApiService';


const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const btnEl = document.querySelector('.load-more-btn');

const getImagesApiService = new GetImagesApiService();

formEl.addEventListener('submit', onSearch);
btnEl.addEventListener('click', onLoad);

function onSearch(e) { 
    e.preventDefault();

    getImagesApiService.req = e.currentTarget.elements.searchQuery.value.trim();
    galleryEl.innerHTML = '';

    if (getImagesApiService.req == '') {
        return Notiflix.Notify.failure("Please, enter something!");
    }

    getImagesApiService.resetPage();
    getImagesApiService.getImages().then(onGetSucces);
};

function onLoad() {
    getImagesApiService.getImages().then(onGetSucces);
}

function onGetSucces(hits) {
        console.log(hits);
        if (hits.length === 0) {
        return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    }
    
        galleryEl.insertAdjacentHTML('beforeend', createGalleryItemsMarkup(hits));
        lightbox.refresh();  
    }

function onGetError(error) {
        console.log(error);
    // if (response.data.total === 0) {
    //     Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    //   }
    
    }

function createGalleryItemsMarkup(hits) {
    return hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
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