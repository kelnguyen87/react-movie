import React, {Component} from 'react';
import {getMovieList} from './index';
import { NavLink } from "react-router-dom";

export default class LayoutGenre extends Component {

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
        const {genre} = this.props;

        const path = '/genres/';
        const itemCarousel = resource.map((item, index) => {
            if(genre.indexOf(item.id)!== -1){
                return (
                    <li key={index}>
                        <NavLink to={path + item.id}>
                            {item.name}
                        </NavLink>
                    </li>
                );
            }
            return false;

        });
        return itemCarousel;
    }


    render() {
        return (
            <div className="fexi_header_para">
                 <span>Genres<label>:</label> </span>
                 <ul className="w3-tag2">
                               {this._renderItemlList()}
                  </ul>

             </div>


        );
    }
}

