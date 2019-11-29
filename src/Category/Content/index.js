import React, {Component} from 'react';
import Card from '../../Product/card';
import {getMovieList} from '../../Services';
import {getConfiguration} from '../../Services';
import Loading from '../../Sections/Loading';


export default class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            movieList: {},
            page: 1,
            total_pages: 0,
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
        const page = this.state.page;
        this._promisAll(page);
    }

    shouldComponentUpdate(nextProps, nextState) {
        const currentId = this.props.params.id;
        const nextId = nextProps.params.id;
        const shouldQuery = currentId !== nextId;
        if(shouldQuery){
            this.setState({
                page: 1
            });
            this._promisAll(1,nextId);
        }
        return this.state !== nextState;
    }

    _getConfiguration = () => {
        const getConfigurationPromise = getConfiguration();
        getConfigurationPromise
        .then(response => {

        })
        .catch(function(error){
            console.log(error);
        });
        return getConfigurationPromise;
    }

    _getMovieList = (page,nextID) => {
        let params = this.props.params;

        if(nextID) {
            params.id = nextID;
        }
        params.page = page;


        let getMovieListPromise = getMovieList(params);
        getMovieListPromise.then(response =>
            response.data.results.map(
                movie => ({
                    id: `${movie.id}`,
                    title: `${movie.title}`,
                    desc: `${movie.overview}`,
                    images: `${movie.poster_path}`,
                    vote_average: `${movie.vote_average}`,
                    date: `${movie.release_date}`,

                })
            )
        )
        .then(movieList => {
            // this.setState({
            //     productList
            // });
            //console.log(productList[0]);
        })
        .catch(function(error){
            console.log(error);
        });
        return getMovieListPromise;
    };

    _promisAll = (page,nextID) => {
        const promiseGetConfig = this._getConfiguration();
        const promisGetMovieList = this._getMovieList(page,nextID);

        const combinePromise = Promise.all([promiseGetConfig, promisGetMovieList]);

        combinePromise.then(values => {
            if (values) {
                const configImages = values[0].data.images;
                const configPath = configImages.base_url + configImages.poster_sizes[3] + '/';
                const total_pages = values[1].data.total_pages;
                let imagePath = 'images/poster_sizes/w342/placeholder.png';

                let movieList = values[1].data.results.map(
                    (function (movie) {

                        if(movie.poster_path !== null) {
                            imagePath = configPath + movie.poster_path;
                        }


                        return {

                            id: `${movie.id}`,
                            title: `${movie.title}`,
                            desc: `${movie.overview}`,
                            images:`${imagePath}`,
                            vote_average: `${movie.vote_average}`,
                            date: `${movie.release_date}`,
                        };
                    })
                )

                this.setState({
                    isLoading: false,
                    movieList: movieList,
                    total_pages: total_pages
                });
            }
        })
    }

    _classProduct = 'w3l-movie-gride-agile w3l-movie-gride-agile1';

    _renderProductItem = () => {
        const {movieList} = this.state;
        const item = movieList.map((item, index) => {
            return (
                <div className="col-md-3 w3l-movie-gride-agile requested-movies" key={index}>
                   <Card item={item} key={index}  class_sfx="w3l-movie-gride-slider" />
                </div>
            )
        });
        return item;
    }

    _renderProductItemLayout = () => {
        const {movieList} = this.state;
        const {isLoading} = this.state;

        if (isLoading) return <Loading />

        if(movieList.length > 0) {
            return (
                <div className="wthree_agile-requested-movies clearfix">
                    { this._renderProductItem() }
                </div>
            );
        }else {
            return (

                <div className="text-center" style={{margin: '5rem 0'}}>Sorry, Has no genres to show</div>
            )
        }
    };

    _updateStatePage = (pageN) => {
        this.setState({
            page: pageN
        });
        this._promisAll(pageN);
    }

    _plusPage = (n) => {
        let currentPage = this.state.page;
        currentPage += n;
        let totalPage = this.state.total_pages;
        if(totalPage > 10) {
            totalPage = 10;
        }
        if(currentPage > 0 && currentPage <= totalPage) {
            this._updateStatePage(currentPage);
        }
    }

    _renderPagination = (pageLimit) => {
        let page = [];
        let pageLenght;

        if(pageLimit > 10) {
            pageLenght = 10;
        }else {
            pageLenght = pageLimit;
        }
        for(let i = 1; i <= pageLenght; i++) {
            if(i === this.state.page) {
                page.push(<li key={i} className="active"><span onClick={() => this._updateStatePage(i)}>{i}</span></li>);
            }else {
                page.push(<li key={i}><span onClick={() => this._updateStatePage(i)}>{i}</span></li>);
            }
        }
        return page;

    }

    _renderLayoutPagination = () => {
        const {total_pages} = this.state;
        if(total_pages > 1) {
            return (
                <div className="blog-pagenat-wthree clearfix">
                    <ul>
                        <li><span className="first" onClick={() => this._plusPage(-1)}>Prev</span></li>
                        {this._renderPagination(this.state.total_pages)}
                        <li><span className="last" onClick={() => this._plusPage(1)}>Next</span></li>
                    </ul>
                </div>
            );
        }else {
            return '';
        }
    }

    render() {

        return (
            <div className="form-group clearfix">
                {this._renderProductItemLayout()}
                {this._renderLayoutPagination()}
            </div>
        );

    }

}
