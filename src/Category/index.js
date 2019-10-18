import React, {Component} from 'react';
import Breadcrumb  from '../Breadcrumb';
import Content from './Content';

export default class Category extends Component {
    constructor(props){
        super(props);
        this.state = {
            params: {
                sort_by: 'popularity.desc',
                apiName: 'discover',
                resource: 'movie'
            }
        };
    }
    
    render() {
        return (
            <div className="w3_content_genre">
                <Breadcrumb subitem="Genres" />
                <div className="w3_content_agilleinfo_inner">
                    <div className="agile_featured_movies">
                        <Content params={this.state.params} />
                    </div>
                </div>
            </div>
            
        );
    }

}