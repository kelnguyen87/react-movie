import React, {Component} from 'react';
import {getMovieList} from '../../Services';
import {getConfiguration} from '../../Services';
import Loading from '../Loading';

export default class Slideshow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            resource: [],
            configuration: {
                images: {
                    "base_url": "",
                    "secure_base_url": "",
                    "backdrop_sizes": [
                        "w300",
                        "w780",
                        "w1920",
                        "original"
                    ],
                    "poster_sizes": [
                        "w92",
                        "w154",
                        "w185",
                        "w342",
                        "w500",
                        "w780",
                        "original"
                    ]
                }
            }

        };
    }


    componentDidMount() {
        this._promisAll();


    }



    _setSSConfig = (configImages) => {
        sessionStorage.setItem("configImage", JSON.stringify(configImages));
    }

    _getSSConfig = () => {
        const getSSConfig = JSON.parse(sessionStorage.getItem("configImage"));
        return getSSConfig;
    }

    _promisAll = () => {
        const params = {
            page: 1,
            apiName: 'movie',
            resource: 'upcoming'
        };

        //Get config image
        const ssConfig = this._getSSConfig();
        let promiseGetConfig;
        if(ssConfig === null) promiseGetConfig = getConfiguration();
        else promiseGetConfig = ssConfig;

        //Get movie List
        const getMovieListPromise = getMovieList(params);
        const combinePromise = Promise.all([promiseGetConfig, getMovieListPromise]);

        combinePromise.then(values => {

            const configImages = values[0];
            if(ssConfig === null) {
                this._setSSConfig(configImages);
            }
            const configPathImages = configImages.data.images;

            const configPath = configPathImages.base_url + configPathImages.backdrop_sizes[2] ;

            let imagePath = '/images/backdrop_sizes/745x400.png';
            let totalItem = 4;
            const movieList = values[1].data.results.map(
                (function (movie, index) {

                    if(movie.backdrop_path !== null) {
                        imagePath = configPath + movie.backdrop_path;
                    }
                    if(index < totalItem){
                        return {
                            id: `${movie.id}`,
                            title: `${movie.title}`,
                            desc: `${movie.overview}`,
                            images: `${imagePath}`
                        };
                    }else{
                        return false;
                    }


                })
            )

            this.setState({
                isLoading: false,
                resource: movieList
            });
         })
         .catch(function(error){
             console.log(error);
        });


    };



    _renderCarouselList = () => {
        const {resource} = this.state;
        let itemImage = [];
        resource.map((item, index) => {
            if(item) {
                itemImage.push(item.images)

            }
            return false;
        });


        return itemImage;
    }



    render() {
        return this._renderCarouselList();
    }
}

