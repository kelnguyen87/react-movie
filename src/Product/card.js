import React, {Component} from 'react';
import { NavLink } from "react-router-dom";


export default class Card extends Component {
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

    _renderNewlabel = (allItemLatest,itemcurrent) =>{
        let itemNewLabel = [];
        allItemLatest.map( (result, index) => {
           if(result.id === itemcurrent) itemNewLabel.push(<div className="ribben" key={index}><p>NEW</p></div>);
           return false;
        })
        return itemNewLabel;
    }

    render() {
        const path = '/video/';
       
        return (
            <div className="w3l-movie-gride-agile" key={this.props.index}>
                
                <NavLink to={path + this.props.item.id} className="hvr-sweep-to-bottom">
                    <img src={this.props.item.images}  alt="{this.props.item.title}" className="img-responsive"/>
                    <div className="w3l-action-icon"><i className="fa fa-play-circle-o" aria-hidden="true"></i></div>
                </NavLink>
                <div className="mid-1 agileits_w3layouts_mid_1_home">
                    <div className="w3l-movie-text">
                        <h6>
                            <NavLink to={path + this.props.item.id}>
                                {this.props.item.title}
                            </NavLink>
                        </h6>							
                    </div>
                    <div className="mid-2 agile_mid_2_home">
                       
                        <p>{this._renderLayoutDate(this.props.item.date)}</p>
                        <div className="block-stars">
                            <ul className="w3l-ratings">
                            {this._renderLayoutVote(parseFloat(this.props.item.vote_average))}
                            </ul>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>
                {this._renderNewlabel(this.props.latest,this.props.item.id)}
                

                <div className="clearfix"> </div>
            </div>
            
        );
    }
}