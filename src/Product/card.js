import React, {Component} from 'react';
import { NavLink } from "react-router-dom";
import {getLayoutVote} from '../Services/utilities';
import {renderLayoutDate} from '../Services/utilities';
//import {renderNewlabel} from '../Services/utilities';

export default class Card extends Component {
   
    render() {
        const path = '/video/';
       
        return (
            <div className={'w3l-movie-gride-agile ' + this.props.class_sfx} key={this.props.index}>
                
                <NavLink to={path + this.props.item.id} className="hvr-sweep-to-bottom">
                    <img src={this.props.item.images}  alt={this.props.item.title} className="img-responsive"/>
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
                       
                        <p>{renderLayoutDate(this.props.item.date)}</p>
                        <div className="block-stars">
                            <ul className="w3l-ratings">
                            {getLayoutVote(parseFloat(this.props.item.vote_average))}
                            </ul>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>
                {/*renderNewlabel(this.props.latest,this.props.item.id)*/}
                

                <div className="clearfix"> </div>
            </div>
            
        );
    }
}