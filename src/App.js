import React from 'react'
import './App.css';
import { motion } from "framer-motion";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Game from './Components/game';
import StartGame from './Components/startGame';
import Continue from './Components/Countinue';







function App() {

    

    return (
        <div className="App">

          <Router>
              <Switch>
                  <Route exact path="/">
                      <div><Game/></div>
                  </Route>

                  <Route exact path="/startGame">
                    <StartGame />
                  </Route>
                  
                  <Route exact path="/startGameContinue">
                      <Continue />
                  </Route>



              </Switch>

          </Router>
      
    </div>
  );
}



export default App; 
