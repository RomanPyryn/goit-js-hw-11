import axios from 'axios';

export default class getImagesApiService {
    constructor() {
        this.request = '';
        this.page = 1
    }

    getData({ data }) {
        this.incrementPage();
        return data;
    };

    async getImages() {
        const url = `https://pixabay.com/api/?key=27640726-9b55f8bbb95505cb3dfdadc58&q=${this.request}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
        const response = await axios(url);
        const data = await this.getData(response);
        return data;
        
        // axios(url).then(({ data }) => {this.incrementPage();return data;});
         
    }

    incrementPage() {
        this.page += 1;
    };

    resetPage() {
        this.page = 1;
    };
    
    get req() {
        return this.request;
    }

    set req(newRequest) {
        this.request = newRequest;
    }
}