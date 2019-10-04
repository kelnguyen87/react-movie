import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Home';
import Header from './Header';
import Footer from './Footer';


function App() {
  return (
     <Router>
        <div className="App">
            <Header/>
            <Route exact path="/" component={Home} />
            <Footer/>
        </div>
        
    </Router>
  );
}

export default App;
