import React, {Component} from 'react';
import { NavLink } from "react-router-dom";

export default class Logo extends Component {
    render() {
        return (
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <h1>
                    <NavLink to="/" title="Home" className="site-header-logo-image">
                        <span>M</span>ovies <span>P</span>ro
                    </NavLink>
                </h1>
            </div>

          

        );
    }
}

