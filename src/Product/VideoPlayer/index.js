import React, { Component } from 'react';
import {getConfiguration} from '../../Services';
import {getMovieVideo} from '../../Services';

class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoParams: [],
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
        this._promisAll(this.props.id);
    }

    shouldComponentUpdate(nextProps, nextState) {
        const currentId = this.props.id;
        const nextId = nextProps.id;
      
        
        const shouldQuery = currentId !== nextId;
        if (shouldQuery) {
            this._promisAll(nextId);
            //window.removeVideo();
        }

        return this.state !== nextState;
    }

    componentDidUpdate(prevProps) {
        //window.initVideo();
    }

    _getConfiguration = () => {
        const getConfigurationPromise = getConfiguration();
        /*getConfigurationPromise
            .then(response => {
              
            })
            .catch(function (error) {
                console.log(error);
            });*/
        return getConfigurationPromise;
    }

    _promisAll = (id) => {
        const promiseGetConfig = this._getConfiguration();
        const apiName = this.props.apiName;
        const promisGetMovieVideo = getMovieVideo(id,apiName);
        const combinePromise = Promise.all([promiseGetConfig, promisGetMovieVideo]);
        combinePromise.then(values => {
            if (values) {
                let images = values[0].data.images;
                let videoParams = values[1].data.results;
                this.setState({
                    videoParams: videoParams,
                    configuration: {
                        images
                    }
                });
            }
        })
    }

    _renderVideo = () => {
        const { configuration } = this.state;
        const { videoParams } = this.state;
        let imagePath = 'http://placehold.jp/745x400.png';
        const pathImage = configuration.images.base_url + configuration.images.backdrop_sizes[3] + '/';
        let videoKey = '';
        if (videoParams[0]) {
            videoKey = videoParams[0].key;
        }
        if(this.props.img !== 'null') {
            imagePath = pathImage + this.props.img;
        }
        return (
            <div className="video-grid-single-page-agileits">
                <div data-video={videoKey} id="video">
                    <img src={imagePath} alt="" className="img-responsive" />
                </div>
               
            </div>
        )
    }


    render() {
        return (
             <div className="single video_agile_player">
                {this._renderVideo()}
                <h4>{this.props.title}</h4>
            </div>
        );
    }
}

export default VideoPlayer;