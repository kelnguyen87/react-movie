import React, {Component} from 'react';
import {getMovieList} from '../Services';

export default class NewLabel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            resource: [],


        };
    }

    componentDidMount() {
        this._promisAll();
    }


    _promisAll = () => {
        const params = {
            page: 1,
            apiName: 'movie',
            resource: 'now_playing'
        };


        //Get movie List
        const getMovieListPromise = getMovieList(params);

        getMovieListPromise.then(values => {

            const movieList = values.data.results.map((movie, index) =>{
                    return {
                        id: `${movie.id}`,
                        title: `${movie.title}`,

                    };
                })

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
        const {itemCurrent} = this.props;
        const itemCarousel = resource.map((item, index) => {
            if(item.id === itemCurrent) {
                return (
                    <div className="ribben" key={index}><p>NEW</p></div>
                );
            }
            return false;
        });
        return itemCarousel;
    }


    render() {
        return this._renderCarouselList();
    }
}

