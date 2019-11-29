import React, { Component } from "react";

import Newsletter from './Newsletter';
import Release from './Release';
import Menumovie from './Menumovie';
import ReviewMovie from './ReviewMovie';
import BottomLink from './BottomLink';
import FllowUs from './FllowUs';
import LatestMovie from './LatestMovie';
import MoviePro from './MoviePro';
import CopyRight from './CopyRight';

export default class Footer extends Component {

    componentDidUpdate(prevProps) {
        window.initOnTop();
    }



    render() {
    return (
        <div className="contact-w3ls" id="contact">
            <div className="footer-w3lagile-inner">
                <Newsletter />
                <div className="footer-grids w3-agileits">
                    <Release/>
                    <Menumovie/>
                    <ReviewMovie/>
                    <LatestMovie/>
                    <MoviePro/>
                    <div className="clearfix"> </div>
                    <BottomLink/>
                </div>
                <FllowUs/>
                <div className="clearfix"> </div>
                <a href="#home" id="goToTop" className="scroll" > <span id="toTopHover" style={{opacity: 1}}> </span></a>
            </div>
            <CopyRight/>
        </div>

    );
  }
}

