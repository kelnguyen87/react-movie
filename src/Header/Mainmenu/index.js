import React, { Component } from 'react';

import MenuItem from './MenuItem';
import MegaMenu from './Dropdown';
import { NavLink } from "react-router-dom";

export default class Mainmenu extends Component {
    constructor (props) {
        super(props);
        this.state = {
            menuList: this._createMenuItemList()
        }
    }

    _createMenuItemList = () => {
        const homeMenu = new MenuItem(1, 'Home', '/',false);
        const genres = new MenuItem(2, 'Genres', '/genres',true);
        const tvSeriesMenu = new MenuItem(3, 'tv - series', '/tv-series',false);
        const news = new MenuItem(4, 'news', '/news',false);
        const country = new MenuItem(5, 'Country', '/country',false);
        const contact = new MenuItem(6, 'Contact', '/contact',false);

        return [homeMenu, genres, tvSeriesMenu, news, country,contact];
    }

    _renderMenuItem = () => {
        const {menuList} = this.state;
        const item = menuList.map((item, index) => {
            if(item._megamenu === false) {
                return (
                    <li key={index}>
                        <NavLink
                            exact={index === 0 ? true : false}
                            activeClassName="active"
                            to={item._link}>{item._name}</NavLink>
                    </li>
                )
            }else {
                return (
                    <li key={index} className="dropdown">
                        <NavLink
                            exact={index === 0 ? true : false}
                            activeClassName="active"
                            to={item._link}>{item._name}
                            <b className="caret"></b>
                        </NavLink>
                        <MegaMenu />
                    </li>
                )
            }
            
        });
        return item;
    }

    _renderMenuItemLayout = () => {
        const {menuList} = this.state;
        if(menuList.length > 0) {
            return (
                <nav className="navbar navbar-default">
                    <div className="navbar-header navbar-left">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                    </button>
                    </div>
                    {/* Collect the nav links, forms, and other content for toggling */}
                    <div className="collapse navbar-collapse navbar-right" id="bs-example-navbar-collapse-1">
                        <nav>
                            <ul className="nav navbar-nav">
                                { this._renderMenuItem() }
                            </ul>
                        </nav>
                    </div>
                </nav>
            );
        }else {
            return '';
        }
    };

    render() {
        return (
            <div className="movies_nav">
                <div className="container">
                    {this._renderMenuItemLayout()}
                </div>
            </div>
        );
    }
}