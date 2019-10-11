import React, { Component } from 'react';

class ShareThis extends Component {
    render() {
        return (
            <div className="single-agile-shar-buttons">
                <h5>Share This :</h5>
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
        );
    }
}

export default ShareThis;