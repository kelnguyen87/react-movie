import React, {Component} from 'react';
import { NavLink } from "react-router-dom";
import {searchMovie} from '../../Services';
import {getConfiguration} from '../../Services';
import {getLayoutVote} from '../../Services/utilities';
import Loading from '../../Sections/Loading';

export default class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showSearch: false,
            query: '',
            results: {},
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
            }
        }
    }

    componentDidMount() {
        //this._promisAll(this.state.query);
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

    _promisAll = (textQuery) => {
        let params = textQuery;

        //Get config image
        const ssConfig = this._getSSConfig();
        let promiseGetConfig;
        if(ssConfig === null) promiseGetConfig = getConfiguration();
        else promiseGetConfig = ssConfig;

        //Get movie List
        const getMovieListPromise = searchMovie(params);
        const combinePromise = Promise.all([promiseGetConfig, getMovieListPromise]);


        combinePromise.then(values => {

            const configImages = values[0];
            if(ssConfig === null) {
                this._setSSConfig(configImages);
            }
            const configPathImages = configImages.data.images;
            const configPath = configPathImages.base_url + configPathImages.poster_sizes[0] ;
            let imagePath = 'http://placehold.jp/300x169.png';

            const searchResults = values[1].data.results.map(
                (function (movie, index) {

                    if(movie.poster_path !== null) {
                        imagePath = configPath + movie.poster_path;
                    }

                    return {
                        id: `${movie.id}`,
                        title: `${movie.title}`,
                        date: `${movie.release_date}`,
                        desc: `${movie.overview}`,
                        images: `${imagePath}`,
                        vote_average:`${movie.vote_average}`,
                    };

                })
            )


            this.setState({
                showSearch: true,
                query: textQuery,
                results: searchResults
            });
        })
        .catch(function(error){
             console.log(error);
        });

    };


    _renderProductItem = () => {
        const {results} = this.state;
        const path = '/video/';
        const items = results.map((item, index) => {
            return (
                <div className="smartSearch-product" key={index}>
                    <NavLink onClick={this._onClick} to={path + item.id} className="smartSearch-product--link">
                        <div className="thumbnail">
                            <img src={item.images} title="album-name" className="img-responsive" alt=" " />
                        </div>
                        <div className="content-item">
                            <h4 className="title">
                                {item.title}
                            </h4>
                            <div className="fexi_header_para fexi_header_para1">
                                <ul className="w3l-ratings">
                                {getLayoutVote(parseFloat(item.vote_average))}
                                </ul>

                            </div>
                            <p className="description">
                                {item.desc.substr(0, 200)}
                            </p>

                        </div>
                    </NavLink>
                </div>

            );
        });


        return items ;
    }

    _renderLayoutResult = () => {
        const {results} = this.state;
        const limit = 4;

        if(this.state.showSearch === false  )  return <Loading/>;

        if(results.length > 0){
            return (
                <div >
                    <div  className="smartSearch-mainbody">
                        {this._renderProductItem()}
                    </div>
                    {results.length > limit &&
                        <div className="smartSearch-results">All Results {results.length} items</div>
                    }
                </div>
            );
        }else{
            return (
                <div className="smartSearch-noproduct" >
                    Sorry, nothing found for <strong>{this.state.query}</strong>
                </div>
            );
        }
    }

    _textValue = '';
    _delayTimer;
    _onChange = (event) => {
        this._textValue = event.target.value;
        this._doSearch(this._textValue);
    }

    _doSearch = (text) => {
        clearTimeout(this._delayTimer);
        var that = this;

        this._delayTimer = setTimeout(function() {
            if(text !== '') {
                that._promisAll(text);
            }
        }, 1000);
    }

    render() {
        return (
            <div className="w3ls_search">
                <div className="cd-main-header">
                    <ul className="cd-header-buttons">
                        <li><a className="cd-search-trigger" href="#cd-search"> <span></span></a></li>
                    </ul>
                </div>
                    <div id="cd-search" className="cd-search">
                        <form action={'/search/'+this.state.query} >
                            <input type="text"
                                    name="Search" placeholder="Search"
                                    onChange={this._onChange}
                                    autoComplete="off" required />


                            <div className="box-results">
                                {this._renderLayoutResult()}
                            </div>
                        </form>
                    </div>
            </div>

        );
    }
}
