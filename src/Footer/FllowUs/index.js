import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class FllowUs extends Component {
  render() {
    return (
        <div>
                <h3 className="text-center follow">Connect <span>Us</span></h3>
                <ul className="social-icons1 agileinfo">
                    <li><NavLink to="/"title="Release ADVENTURE"><i className="fa fa-facebook"></i></NavLink></li>
                    <li><NavLink to="/"title="Release ADVENTURE"><i className="fa fa-twitter"></i></NavLink></li>
                    <li><NavLink to="/"title="Release ADVENTURE"><i className="fa fa-linkedin"></i></NavLink></li>
                    <li><NavLink to="/"title="Release ADVENTURE"><i className="fa fa-youtube"></i></NavLink></li>
                    <li><NavLink to="/"title="Release ADVENTURE"><i className="fa fa-google-plus"></i></NavLink></li>
                </ul>
        </div>
       	

    );
  }
}
 
