import React, { Component } from 'react';
import {getMovieDetail} from '../Services';
import VideoPlayer from './VideoPlayer';
import Comments from './Comments';
import Breadcrumb  from '../Breadcrumb';
import ShareThis from '../Sections/ShareThis';
import WriteAuthor from './WriteAuthor';
import HotTopics from './HotTopics';
import LatestTrailer from './LatestTrailer';
import LatestMovie from '../Footer/LatestMovie';
class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MovieDetail: {}
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this._getMovieDetail(id);
       
    }

    _getMovieDetail = (movieID) => {
        const params = {
            id: movieID,
            apiName: 'movie'
        };
        const getMovieListPromise = getMovieDetail(params);
        getMovieListPromise.then(response => {
                const data = response.data;
                
                this.setState({
                    MovieDetail: {
                        _name: `${data.title}`,
                        _desc: `${data.overview}`,
                        _img: `${data.backdrop_path}`,
                        _vote: `${data.vote_average}`,
                        _date: `${data.release_date}`,
                    }
                })
            }
        )
        .catch(function(error){
            console.log(error);
        });
    };

    _renderTitle = () => {
        return (
                <h4>{this.state.MovieDetail._name}</h4>
        )
    }  

    render() {
        if(this.state.MovieDetail._img !== undefined) {
            return (
            
                <div className="single-page-agile-main">
                   
                    <Breadcrumb  subitem={this.state.MovieDetail._name} />
                    <div className="w3_content_agilleinfo_inner">
                        <div className="agile_featured_movies">
                            <div className="latest-news-agile-info">
                                <div className="col-md-8 latest-news-agile-left-content">
                                    <VideoPlayer
                                        id={this.props.match.params.id}
                                        img={this.state.MovieDetail._img}
                                        title={this.state.MovieDetail._name}
                                        apiName="movie" />
                                    <div className="clearfix"> </div>
                                    <p>{this.state.MovieDetail._desc}</p>
                                    
                                    <ShareThis/>
                                    <WriteAuthor/>
                                    <Comments id={this.props.match.params.id} apiName="movie" />
                                    <div className="clearfix"> </div>
                                </div>
                                <div className="col-md-4 latest-news-agile-right-content">
                                    <HotTopics/>
                                    <LatestTrailer/>
                                   
                                </div>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                    </div>
                       
                </div>
            );
        }else{
            return false;
        }
    }
}

export default Product;