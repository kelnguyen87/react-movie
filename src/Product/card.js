import React, {Component} from 'react';
import { NavLink } from "react-router-dom";
import {getLayoutVote} from '../Services/utilities';
import {renderLayoutDate} from '../Services/utilities';

export default class Card extends Component {

    render() {
        const path = '/video/';
        const item = this.props.item;
        return (
            <div className={'w3l-movie-gride-agile ' + this.props.class_sfx} key={this.props.index}>

                <NavLink to={path + item.id} className="hvr-sweep-to-bottom">
                    <img src={item.images}  alt={item.title} className="img-responsive"/>
                    <div className="w3l-action-icon"><i className="fa fa-play-circle-o" aria-hidden="true"></i></div>
                </NavLink>
                <div className="mid-1 agileits_w3layouts_mid_1_home">
                    <div className="w3l-movie-text">
                        <h6>
                            <NavLink to={path + item.id}>
                                {item.title}
                            </NavLink>
                        </h6>
                    </div>
                    <div className="mid-2 agile_mid_2_home">

                        <p>{renderLayoutDate(item.date)}</p>
                        <div className="block-stars">
                            <ul className="w3l-ratings">
                            {getLayoutVote(parseFloat(item.vote_average))}
                            </ul>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>


                <div className="clearfix"> </div>
            </div>

        );
    }
}
