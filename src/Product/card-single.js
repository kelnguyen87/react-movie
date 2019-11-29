import React, {Component} from 'react';
import {getLayoutVote} from '../Services/utilities';
import LayoutGenre from '../Services/layoutGenre';

export default class CardSingle extends Component {

    render() {
        const item = this.props.item;

        return (
            <div  >
                <div className="video-grid-single-page-agileits">
                    <div data-video="BXEZFd0RT5Y" id="video3">
                        <img src={item.images}  alt="{item.title}" className="img-responsive"/>
                        <div id="play" ></div>
                    </div>
                </div>
                <div className="player-text two">
                    <p className="fexi_header"> {this.props.item.title} </p>
                    <p className="fexi_header_para"><span className="conjuring_w3">Story Line<label>:</label></span>{item.desc.substr(0, 245)} </p>
                    <p className="fexi_header_para"><span>Release On<label>:</label></span>{item.date} </p>

                    <LayoutGenre  genre={item.genre_ids}/>

                    <div className="fexi_header_para fexi_header_para1"><span>Star Rating<label>:</label></span>
                        <ul className="w3l-ratings">
                        {getLayoutVote(parseFloat(item.vote_average))}
                        </ul>

                    </div>
                </div>


                <div className="clearfix"> </div>
            </div>

        );
    }
}
