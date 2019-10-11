import React, {Component} from 'react';
import { NavLink } from "react-router-dom";

export default class Register extends Component {

   
    render() {
       
        return (
           
            <div className="w3_agilits_banner_bootm">
                <div className="w3_agilits_inner_bottom">
                        <div className="col-md-6 wthree_agile_login">
                            <ul>
                                    <li><i className="fa fa-phone" aria-hidden="true"></i> (+000) 009 455 4088</li>
                                    <li>
                                        <NavLink to="/" title="Home" className="login" data-toggle="modal" data-target="#myModal4">
                                            Login
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/" title="Home" className="login reg" data-toggle="modal" data-target="#myModal5">
                                        Register
                                        </NavLink>
                                    </li>

                                </ul>
                        </div>
                        <div className="col-md-6 wthree_share_agile">
                                    
                             <div className="single-agile-shar-buttons">
                                    <ul>
                                <li>
                                    <div className="fb-like" data-href="https://www.facebook.com/w3layouts" data-layout="button_count" data-action="like" data-size="small" data-show-faces="false" data-share="false"></div>
                                
                                </li>
                                <li>
                                    <div className="fb-share-button" data-href="https://www.facebook.com/w3layouts" data-layout="button_count" data-size="small" data-mobile-iframe="true"><a className="fb-xfbml-parse-ignore" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.facebook.com%2Fw3layouts&amp;src=sdkpreparse">Share</a></div>
                                </li>
                                <li className="news-twitter">
                                    <a href="https://twitter.com/w3layouts" className="twitter-follow-button" data-show-count="false">Follow @w3layouts</a>
                                </li>
                                <li>
                                    <a href="https://twitter.com/intent/tweet?screen_name=w3layouts" className="twitter-mention-button" data-show-count="false">Tweet to @w3layouts</a>
                                </li>
                            
                            </ul>
                                </div>
                        </div>
                </div>

                
            </div>


        );
    }
}

