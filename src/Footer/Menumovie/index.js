import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Menumovie extends Component {
  render() {
    return (
        <div className="col-md-2 footer-grid">
            <h4>Movies</h4>
            <ul> 
                <li><NavLink to="/"title="Release ADVENTURE">ADVENTURE</NavLink></li> 
                <li><NavLink to="/"title="Release COMEDY">COMEDY</NavLink></li> 
                <li><NavLink to="/"title="Release COMEDY">COMEDY</NavLink></li> 
                <li><NavLink to="/"title="Release ACTION">ACTION</NavLink></li> 
                <li><NavLink to="/"title="Release MOVIES">MOVIES</NavLink></li> 
                <li><NavLink to="/"title="Release HORROR">HORROR</NavLink></li> 

                
            </ul>
        </div>

    );
  }
}
 
