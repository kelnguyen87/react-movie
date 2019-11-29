import React, {Component} from 'react';
import {getMovieList} from '../../Services';
import { NavLink } from "react-router-dom";

export default class ReviewMovie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            resource: []
        };
    }


    componentDidMount() {
        this._promisAll();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state !== nextState;
    }

    _promisAll = () => {
        const params = {
            page: 1,
            apiName: 'genre/movie',
            resource: 'list'
        };

        //Get movie List
        const getMovieListPromise = getMovieList(params);
        getMovieListPromise.then(movie => {
            const movieList = movie.data.genres.map(
                (function (movie, index) {
                    return {
                        id: `${movie.id}`,
                        name: `${movie.name}`
                    };

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


    _renderItemlList = () => {
        const {resource} = this.state;

        const path = '/genres/';
        const itemCarousel = resource.map((item, index) => {
            return (
                <li key={index}>
                    <NavLink to={path + item.id} target="_parent">
                        {item.name}
                    </NavLink>
                </li>
            );
        });
        return itemCarousel;
    }


    render() {
        return (
            <div className="col-md-2 footer-grid">
               <h4>Review Movies</h4>
               <ul className="w3-tag2">
                {this._renderItemlList()}
               </ul>

            </div>

        );
    }
}

