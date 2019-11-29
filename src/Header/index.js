/* eslint-disable */
import {withRouter} from 'react-router-dom';
import React, {Component} from 'react';
import Mainmenu from './Mainmenu';
import Search from './Search';
import Banner from './Banner';
import Register from './Register';
import Logo from './Logo';
import {getConfiguration, getMovieList} from "../Services";

class Header extends Component {

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
                itemImage.push('"'+item.images+'"')
            }
            return false;
        });

        return itemImage;
    }


    _renderLayout= () =>{
        const pathNameLength = this.props.location.pathname.length;
        const slideShow = pathNameLength === 1  ? "["+this._renderCarouselList()+"]": '' ;
        const banner = pathNameLength > 1  ? <Banner/>: '' ;
        return (
            <div className="mainheader">
                <div id="demo-1"  data-zs-src= {slideShow}  data-zs-overlay="dots" className ={pathNameLength > 1 ? "banner-inner": "zs-enabled overlay-dots"}>


                <div className= "demo-inner-content">
                        <div className="header-w3-agileits" id="home">
                            <div className="inner-header-agile part2">
                                <nav className="navbar navbar-default">
                                    <Logo/>
                                    <Mainmenu/>
                                </nav>

                                <Search/>
                            </div>

                        </div>

                    </div>

                </div>
                <Register/>

            </div>

        );
    }

    render() {

        return (
            this._renderLayout()

        );
    }
}

export default withRouter(Header);
