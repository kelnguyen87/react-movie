import React, {Component} from 'react';
import Breadcrumb  from '../Breadcrumb';
import Content from './Content';

export default class Category extends Component {
    constructor(props){
        super(props);
        this.state = {
            params: {
                sort_by: 'release_date.desc',
                apiName: 'discover',
                resource: 'movie'
            }
        };
    }
    
    render() {
        return (
            <div className="general-agileits-w3l">
                <div className="w3l-medile-movies-grids">
                    <div className="browse-agile-w3ls general-w3ls">
                        <div className="tittle-head">
                            <Breadcrumb subitem="Genres" />
                        </div>
                        <div className="container">
                            <Content params={this.state.params} />
                        </div>
                    </div>                    
                </div>
            </div>
        );
    }

}