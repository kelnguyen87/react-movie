import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

class WriteAuthor extends Component {
    render() {
        return (
            <div className="admin-text">
                    <h5>WRITTEN BY ADMIN</h5>
                    <div className="admin-text-left">
                        
                        <NavLink to="/">
                            <img src="http://placehold.jp/130x130.png" alt=""/>
                        </NavLink>
                    </div>
                    <div className="admin-text-right">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit,There are many variations of passages of Lorem Ipsum available, 
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <span>View all posts by :
                         <NavLink to="/"> Admin </NavLink></span>
                    </div>
                    <div className="clearfix"> </div>
            </div>
        );
    }
}

export default WriteAuthor;