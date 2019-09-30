import React, {Component} from 'react';


export default class Search extends Component {
    
    render() {
        return (
            <div className="w3ls_search">
                <div className="cd-main-header">
                    <ul className="cd-header-buttons">
                        <li><a className="cd-search-trigger" href="#cd-search"> <span></span></a></li>
                    </ul> 
                </div>
                    <div id="cd-search" className="cd-search">
                        <form action="#" method="post">
                            <input name="Search" type="search" placeholder="Search..."/>
                        </form>
                    </div>
            </div>

        );
    }
}
