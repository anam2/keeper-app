import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import TestNote from "./TestNote";
import NoteDashboard from "./NoteDashboard";
import Home from "./Home";
import CreateAccount from "./CreateAccount";

function App() {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/create" component={CreateAccount}></Route>
          <Route path="/note/:id" component={NoteDashboard}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
