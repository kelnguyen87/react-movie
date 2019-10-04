import React, { Component } from 'react';
import TopMovie from '../Sections/TopMovie';
import RequestMovie from '../Sections/RequestMovie';
import LatestMovie from '../Sections/LatestMovie'
import TabMovies from '../Sections/TabMovies'
export default class Home extends Component {
    
    render() {
        return (
            <div className="w3_content_agilleinfo_inner">
                <div className="agile_featured_movies">
                    <TabMovies/>
                    <LatestMovie/>
                    <RequestMovie/>
                    <TopMovie/>
                    <div className="clearfix"> </div>
                </div>
            </div>
            
        );
    }
}