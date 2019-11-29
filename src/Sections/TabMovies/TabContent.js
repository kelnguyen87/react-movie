import React, {Component} from 'react';
import {getMovieList} from '../../Services';
import {getConfiguration} from '../../Services';
import Card from '../../Product/card';
import CardSingle from '../../Product/card-single';
import Loading from '../Loading';

export default class TabContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            videoList: [],
            videoSingle:[],
            configuration: {
                images: {
                    "base_url": "",
                    "secure_base_url": "",
                    "backdrop_sizes": [
                        "w300",
                        "w780",
                        "w1280",
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
            },
            optionMovieTab: 'featured'
        }
    }



    componentDidMount() {
        this._promisAll();
    }



    _getMovieList = () => {
        let params = {
            page: 1,
            sort_by: 'release_date.desc',
            apiName: 'discover',
            resource: 'movie'
        };
        //console.log(this.props.item.id);
        switch (this.props.item.id) {
            case 'top_revenue':
                params.sort_by = 'revenue.desc';
                params.primary_release_year = '2019';
                break;
            case 'popularity':
                params.sort_by = 'popularity.desc';
                params.primary_release_year = '2019';
                break;

            case 'top_rating':
                params.apiName = 'movie';
                params.resource = 'top_rated';
                params.primary_release_year = '2019';
                break;

            default:
                params.sort_by = 'release_date.desc';
        }

        const getMovieListPromise = getMovieList(params);

        getMovieListPromise.then(response =>
            response.data.results.map(movie => ({
                    _id: `${movie.id}`,
                    _name: `${movie.title}`,
                    _desc: `${movie.overview}`,
                    _img: `${movie.poster_path}`,
                    _vote: `${movie.vote_average}`,
                    _date: `${movie.release_date}`,
                    _genre_ids: `${movie.genre_ids}`,
                    _badge: 'HOT'
                })
            )
        )
        .then(movieList => {
            // this.setState({
            //     movieList
            // });
        })
        .catch(function(error){
            console.log(error);
        });
        return getMovieListPromise;
    };

    _setSSConfig = (configImages) => {
        sessionStorage.setItem("configImage", JSON.stringify(configImages));
    }

    _getSSConfig = () => {
        const getSSConfig = JSON.parse(sessionStorage.getItem("configImage"));
        return getSSConfig;
    }

    _promisAll = () => {
        const ssConfig = this._getSSConfig();
        let promiseGetConfig;
        if(ssConfig === null) promiseGetConfig = getConfiguration();
        else promiseGetConfig = ssConfig;

        const promisGetMovieList = this._getMovieList();
        const combinePromise = Promise.all([promiseGetConfig, promisGetMovieList]);
        combinePromise.then(values => {
            if (values) {
                const configImages = values[0];
                if(ssConfig === null) {
                    this._setSSConfig(configImages);
                }
                const configPathImages = configImages.data.images;
                const configPath = configPathImages.base_url + configPathImages.poster_sizes[3] + '/';
                let imagePath = 'http://placehold.jp/300x340.png';

                const totalItem = 9;

                let movieList = values[1].data.results.map(
                    (function  (movie, index) {
                        if(movie.poster_path !== null) {
                            imagePath = configPath + movie.poster_path;
                        }
                        if(index < totalItem && index !== 0){
                            return {
                                id: `${movie.id}`,
                                title: `${movie.title}`,
                                date: `${movie.release_date}`,
                                desc: `${movie.overview}`,
                                images: `${imagePath}`,
                                vote_average:`${movie.vote_average}`,
                                genre_ids: `${movie.genre_ids}`,
                            };
                        }
                        return false;


                    })
                )

                const configPathSingle = configPathImages.base_url + configPathImages.backdrop_sizes[1] ;
                const movieSingle = values[1].data.results.map(
                    (function (movie, index) {

                        if(movie.backdrop_path !== null) {
                            imagePath = configPathSingle + movie.backdrop_path;
                        }

                        if(index === 0){
                            return {
                                id: `${movie.id}`,
                                title: `${movie.title}`,
                                date: `${movie.release_date}`,
                                genre_ids: `${movie.genre_ids}`,
                                desc: `${movie.overview}`,
                                images: `${imagePath}`,
                                vote_average:`${movie.vote_average}`,
                            };
                        }
                        return false;

                    })
                )

                this.setState({
                    isLoading: false,
                    videoList: movieList,
                    videoSingle:movieSingle,
                });
            }
        })
    }

    _renderVideolList = () => {
        const {videoList} = this.state;
        const itemVideo = videoList.map((item, index) => {
            if(item ) {
                return (
                    <Card item={item} key={index}  class_sfx=""/>
                );
            }
            return false;
        });
        return itemVideo;
    }

    _renderVideolSingle = () => {
        const {videoSingle} = this.state;
        const itemVideo = videoSingle.map((item, index) => {
            if(item) {
                return (
                    <CardSingle item={item} key={index} />
                );
            }
            return false;
        });
        return itemVideo;
    }

    _renderLayout=()=>{
        const {isLoading} = this.state;
        const {videoList} = this.state;
        const {videoSingle} = this.state;

        if (isLoading) return <Loading/>

        if(videoList.length > 0 || videoSingle.length > 0 ){
            return(
                <div className="w3_agile_featured_movies two">
                    <div className="col-md-5 video_agile_player ">
                        {this._renderVideolSingle()}
                    </div>
                    <div className="col-md-7 wthree_agile-movies_list ">
                        {this._renderVideolList()}
                    </div>


                    <div className="cleafix"></div>
                </div>
            )
        }else{
            return (
                <div className="text-center" style={{margin: '5rem 0'}}>Sorry, there are no item</div>
            )
        }

    }

    render() {
        return (
            <div role="tabpanel"
                className={this.props.index === 0? 'tab-pane fade active in' : 'tab-pane fade'}
                id={this.props.item.id} aria-labelledby={this.props.item.id + '-tab'}
                key={this.props.index}>
                <div className="w3_agile_featured_movies">
                    {this._renderLayout()}
                </div>
            </div>
        );
    }
}

