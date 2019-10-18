import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Home';
import Header from './Header';
import Footer from './Footer';
import VideoDetail from './Product';
import Genres from './Category';
import Children from './Category/Children';

function App() {
  return (
     <Router>
        <div className="App">
            
            <Header/>
            <Route  exact path="/" component={Home} />
            <Route path="/video/:id" component={VideoDetail} />
            <Route path="/genres/" component={Genres} />
            <Route path="/genres/:id" component={Children} />
          
            <Footer/>
        </div>
        
    </Router>
  );
}

export default App;
