import React, {Component} from 'react';


export default class CardSingle extends Component {
    _renderLayoutVote = (vote) => {
        vote = vote/2;
        let result = [];
        for (let i = 1; i <= 5; i++) {
            if(vote >= i && vote > 0) {
                result.push(<li key={i}><span><i className="fa fa-star" aria-hidden="true" /></span></li>);
            }else if((vote + 0.5) === i) {
                result.push(<li key={i}><span><i className="fa fa-star-half-o" aria-hidden="true" /></span></li>);
            }else {
                result.push(<li key={i}><span><i className="fa fa-star-o" aria-hidden="true" /></span></li>);
            }
        }
        return result;
    }

    _renderLayoutDate = (date) => {
        if (date === '') {
            return '';
        }else {
            let d = new Date(date);
            let y = d.getFullYear();
            return y;
        }
    }

    

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
                        <a href="genre.html">Drama</a> | 
                        <a href="genre.html">Adventure</a> | 
                        <a href="genre.html">Family</a>								
                    </p>
                    <div className="fexi_header_para fexi_header_para1"><span>Star Rating<label>:</label></span>
                    
                            <ul className="w3l-ratings">
                            {this._renderLayoutVote(parseFloat(this.props.item.vote_average))}
                            </ul>
                        
                    </div>
                </div>
                
                
                <div className="clearfix"> </div>
            </div>

        );
    }
}