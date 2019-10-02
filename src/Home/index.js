import React, { Component } from 'react';
import TopMovie from '../Sections/TopMovie';


export default class Home extends Component {
    
    render() {
        return (
            <div className="w3_content_agilleinfo_inner">
                <div className="agile_featured_movies">
                    <TopMovie/>
                    <div className="clearfix"> </div>
                </div>
               
            </div>
            
        );
    }
}