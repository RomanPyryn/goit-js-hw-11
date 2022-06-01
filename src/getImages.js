import axios from 'axios';

export function getImages(request) {
    return axios(`https://pixabay.com/api/?key=27640726-9b55f8bbb95505cb3dfdadc58&q=${request}&image_type=photo&orientation=horizontal&safesearch=true`); 
};