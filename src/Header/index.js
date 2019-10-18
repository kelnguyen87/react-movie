/* eslint-disable */
import React, {Component} from 'react';
import Mainmenu from './Mainmenu';
import Search from './Search';
import Banner from './Banner';
import Register from './Register';
import Logo from './Logo';
import Slideshow from '../Sections/Slideshow';

export default class Header extends Component {

    componentDidUpdate(prevProps) {
      window.initHomeSlider();
    }

   
   
    _renderLayout= () =>{
        return (
            <div className="mainheader">
                <div id="demo-1"  data-zs-src='["images/2.jpg", "images/1.jpg", "images/3.jpg","images/4.jpg"]' data-zs-overlay="dots" className ={window.location.pathname.length > 1 ? "banner-inner": "zs-enabled overlay-dots"}>
                    <div className={window.location.pathname.length > 1 ? "banner-inner-dott": "demo-inner-content"}>
                        <div className="header-w3-agileits" id="home">
                            <div className="inner-header-agile part2">	
                                <nav className="navbar navbar-default">
                                    <Logo/>
                                    <Mainmenu/>
                                </nav>
                                
                                <Search/>
                            </div> 
                            
                        </div>

                        {/* Check is Homepage*/}
                        {window.location.pathname.length > 1  ? '': <Banner/>}
                    </div>
                    {/* Check is Homepage*/}
                    {/*window.location.pathname.length > 1  ? '':<Slideshow />*/}
                    
                    
                </div>
                <Register/>

                
            </div>
            
        );
    }
    
    render() {
    
        return (
            this._renderLayout()
            
        );
    }
}

