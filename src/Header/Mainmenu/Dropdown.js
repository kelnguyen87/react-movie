import React, { Component } from 'react';
import {getListMegaMenu} from '../../Services';

import { NavLink } from "react-router-dom";

export default class Dropdown extends Component {
    constructor (props) {
        super(props);
        this.state = {
            megaMenuList: []
        }
    }

    shouldComponentUpdate(nextProps, nextState) {        
        return this.state !== nextState;
    }


    componentDidMount() {
        this._getListMegaMenu();
    }

    _getListMegaMenu = () => {
        
        const getListMegaMenuPromise = getListMegaMenu();
        getListMegaMenuPromise
        .then(response =>
            response.data.genres.map(
                megaMenu => ({
                    _id: `${megaMenu.id}`,
                    _name: `${megaMenu.name}`
                })
            )
        )
        .then(megaMenu => {
            this.setState({
                megaMenuList: megaMenu
            });
        })
        .catch(function(error){
            console.log(error);
        });
    };

    _renderMenuItem = () => {
        const {megaMenuList} = this.state;
        const path = '/genres/'
        const item = megaMenuList.map((item, index) => {
            //console.log(item);
            return (
                <li key={index}>
                    <NavLink
                        activeClassName="active"
                        to={path + item._id}>{item._name}</NavLink>
                </li>
            )
        });
        return item;
    }

    render() {
        return (
            <ul className="dropdown-menu multi-column columns-3">
                {this._renderMenuItem()}
            </ul>
        );
    }
}