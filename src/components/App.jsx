import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import TestNote from "./TestNote";
import NoteDashboard from "./NoteDashboard";

function App() {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route path="/" exact component={NoteDashboard}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

/* <Router>
      
    </Router> */
