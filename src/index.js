import './css/styles.css';
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import { getImages } from './getImages';


const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) { 
    e.preventDefault();

    const request = e.currentTarget.elements.searchQuery.value.trim();
    galleryEl.innerHTML = '';
    
    if (request !== '') {
        getImages(request)
        .then(onGetSucces)
        .catch(onGetError);
    };
};


function onGetSucces(data) {
    console.log(data.data.hits);
    galleryEl.insertAdjacentHTML('beforeend', createsGalleryItemsMarkup(data.data.hits));
    lightbox.refresh();  
}

function onGetError(error) {
    console.log(error);
    // if (response.data.total === 0) {
    //     Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    //   }
    
}


function createsGalleryItemsMarkup(data) {
    return data.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
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