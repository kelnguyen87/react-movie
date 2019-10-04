import React, {Component} from 'react';
import {getLayoutVote} from '../Services/utilities';

export default class CardSingle extends Component {
    
    render() {
       
        return (
            <div  key={this.propsindex}>
                <div className="video-grid-single-page-agileits">
                    <div data-video="BXEZFd0RT5Y" id="video3"> 
                        <img src={this.props.item.images}  alt="{this.props.item.title}" className="img-responsive"/>
                        <div id="play" ></div>
                    </div>
                </div>
                <div className="player-text two">
                    <p className="fexi_header"> {this.props.item.title} </p>
                    <p className="fexi_header_para"><span className="conjuring_w3">Story Line<label>:</label></span>{this.props.item.desc.substr(0, 250)} </p>
                    <p className="fexi_header_para"><span>Release On<label>:</label></span>{this.props.item.date} </p>
                    <p className="fexi_header_para">
                        <span>Genres<label>:</label> </span>
                        <a href="/">Drama</a> | 
                        <a href="/">Adventure</a> | 
                        <a href="/">Family</a>								
                    </p>
                    <div className="fexi_header_para fexi_header_para1"><span>Star Rating<label>:</label></span>
                        <ul className="w3l-ratings">
                        {getLayoutVote(parseFloat(this.props.item.vote_average))}
                        </ul>
                        
                    </div>
                </div>
                
                
                <div className="clearfix"> </div>
            </div>

        );
    }
}