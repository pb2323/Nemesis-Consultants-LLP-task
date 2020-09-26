import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import HomePage from "./pages/homePage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
