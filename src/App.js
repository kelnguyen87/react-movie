import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Home';


function App() {
  return (
     <Router>
            <div className="App">
                <div className="page-wrapper wrapper-full">
                   <Route exact path="/" component={Home} />
                    
                </div>
            
            </div>
            
            </Router>
  );
}

export default App;
