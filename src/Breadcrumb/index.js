import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

class Breadcrumb extends Component {

    _linkHome = {
        'link': '/',
        'title': 'Home'
    }

    _renderItemHome = () => {
        return(
            <li className="breadcrumb-item">
                <NavLink
                    exact={true}
                    activeClassName="active"
                    to={this._linkHome.link}>{this._linkHome.title} </NavLink>
            </li>
        );
    }

    _renderItemGenres = () => {
        if(this.props.link) {
            return(
                <li className="active">
                    <NavLink
                        exact={true}
                        to={this.props.link}>{this.props.name}</NavLink>
                </li>
            );
        }else {
            return(
                <li className="active">{this.props.name}</li>
            );
        }
    }

    _renderChildItem = () => {
        if(this.props.subitem) {
            return(
                <li className="breadcrumb-item active"> {this.props.subitem}</li>
            );
        }else {
            return '';
        }
    }

    _renderLayout = () => {
        return(
            <ul className="breadcrumb">
                {this._renderItemHome()}
                {this._renderItemGenres()}
                {this._renderChildItem()}
            </ul>
        );
    }

    render() {
        return (
            <div className="w3_breadcrumb">
                <div className="breadcrumb-inner">
                {this._renderLayout()}
                </div>
            </div>
        );
    }
}

export default Breadcrumb;