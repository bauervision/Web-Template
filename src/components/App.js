import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import account from "../pages/Account";
import Admin from "../pages/Admin";
import Examples from "../pages/Examples";
import Explore from "../pages/Explore";
import Home from "../pages/Home";


import Login from "../components/Auth/Login";
import Header from "./Header";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <div>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/account" component={account} />
            <Route path="/admin" component={Admin} />
            <Route path="/explore" component={Explore} />
            <Route path="/examples" component={Examples} />
          </Switch>
        </div>
      </div>

    </BrowserRouter>
  );
}

export default App;
