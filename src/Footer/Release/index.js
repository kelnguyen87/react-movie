import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Release extends Component {
  render() {
    return (
        <div className="col-md-2 footer-grid">
            <h4>Release</h4>
            <ul> 
                <li><NavLink to="/"title="Release 2016">2016</NavLink></li> 
                <li><NavLink to="/"title="Release 2016">2015</NavLink></li> 
                <li><NavLink to="/"title="Release 2016">2014</NavLink></li> 
                <li><NavLink to="/"title="Release 2016">2013</NavLink></li> 
                <li><NavLink to="/"title="Release 2016">2012</NavLink></li> 
                <li><NavLink to="/"title="Release 2016">2011</NavLink></li> 

                
            </ul>
        </div>

    );
  }
}
 
