import React, {Component} from 'react';
import {getMovieList} from '../../Services';
import {getConfiguration} from '../../Services';
import { NavLink } from "react-router-dom";

export default class MoviePro extends Component {

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
    componentDidUpdate(prevProps) {
        window.initHomeSlider();
    }

    shouldComponentUpdate(nextProps, nextState) {        
        return this.state !== nextState;
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
            sort_by: 'vote_count.desc',
            apiName: 'discover',
            resource: 'movie'
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
            
            const configPath = configPathImages.base_url + configPathImages.poster_sizes[1] ;
         
            let imagePath = 'http://placehold.jp/300x169.png';
            let totalItem = 6;
           
            const movieList = values[1].data.results.map(
                (function (movie, index) {
                    
                    if(movie.poster_path !== null) {
                        imagePath = configPath + movie.poster_path;
                    }
                    if(index < totalItem ){
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
        const CategoryUrl = '/video/';
        const itemCarousel = resource.map((item, index) => {
            if(item) {
                return (
                  
                    <div className="footer-grid-instagram" key={index}>
                        <NavLink to={CategoryUrl + item.id}>
                            <img src={item.images}  alt="{item.title}" className="img-responsive"/>
                        </NavLink>
                       
                    </div>
                );
            }else{
                return false;
            }
        });
        return itemCarousel;
    }

    
    render() {
        return (
            <div className="col-md-2 footer-grid"> 
               <h4 className="b-log"><a href="/"><span>M</span>ovies <span>P</span>ro</a></h4>
                {this._renderCarouselList()}
            </div>
            
        );
    }
}

