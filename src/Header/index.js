/* eslint-disable */
import {withRouter} from 'react-router-dom';
import React, {Component} from 'react';
import Mainmenu from './Mainmenu';
import Search from './Search';
import Banner from './Banner';
import Register from './Register';
import Logo from './Logo';
import Slideshow from '../Sections/Slideshow';

class Header extends Component {

    componentDidUpdate(prevProps) {
      window.initHomeSlider();
    }

    _renderLayout= () =>{
        const pathNameLength = this.props.location.pathname.length;
        const slideShow = pathNameLength === 1  ? <Slideshow />: '' ;
        const banner = pathNameLength > 1  ? <Banner/>: '' ;
        return (
            <div className="mainheader">
                <div id="demo-1"  data-zs-src={slideShow} data-zs-overlay="dots" className ={window.location.pathname.length > 1 ? "banner-inner": "zs-enabled overlay-dots"}>
                    <div className= "demo-inner-content">
                        <div className="header-w3-agileits" id="home">
                            <div className="inner-header-agile part2">
                                <nav className="navbar navbar-default">
                                    <Logo/>
                                    <Mainmenu/>
                                </nav>

                                <Search/>
                            </div>

                        </div>


                    </div>
                    {/* Check is Homepage*/}
                    {slideShow}


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

export default withRouter(Header);
