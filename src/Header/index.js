import React, {Component} from 'react';
import Logo from './Logo';
import Mainmenu from './Mainmenu';
import Search from './Search';
import Banner from './Banner';
import Register from './Register';
import Slideshow from '../Sections/Slideshow';

export default class Header extends Component {


    render() {
        return (
            <div className="mainheader">
                <div id="demo-1"  className ="zs-enabled overlay-dots">
                    <div className="demo-inner-content">
                        <div className="header-w3-agileits" id="home">
                            <div className="inner-header-agile part2">	
                                <nav className="navbar navbar-default">
                                    <Logo/>
                                    <Mainmenu/>
                                </nav>
                                
                                <Search/>
                            </div> 
                            
                        </div>
                        <Banner/>
                    </div>
                    <Slideshow />
                    
                </div>
                <Register/>

                
            </div>
            
        );
    }
}

