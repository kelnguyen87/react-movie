import React, {Component} from 'react';

export default class Currency extends Component {

   
    render() {
       
        return (
            
            <div className="headerTopBlock section-currency">
                <div className="pull-right dropdown">
                    <a className="dropdown-toggle" href='/'  title="USD" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">USD</a>
                    <ul className="drop-left dropdown-menu" aria-labelledby="dropdownMenuButton">

                    <li className="dropdown-item"><a href='/'  title="USD" data-value="USD">USD</a></li>
                    
                    <li className="dropdown-item"><a href='/'  title="EUR" data-value="EUR">EUR</a></li>
                    
                    <li className="dropdown-item"><a href='/'  title="GBP" data-value="GBP">GBP</a></li>
                    
                    </ul>

                </div>
            </div>


        );
    }
}

