import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import account from "../pages/Account";
import Admin from "../pages/Admin";
import Examples from "../pages/Examples";
import Explore from "../pages/Explore";
import Home from "../pages/Home";


import Login from "../components/Auth/Login";
import Header from "./Header";

import useAuth from "./Auth/useAuth";
import firebase, { FirebaseContext } from "../firebase";
import Forgot from "../pages/Forgot";

function App() {

  const user = useAuth();

  return (
    <BrowserRouter>
      <FirebaseContext.Provider value={{ user, firebase }}>
        <div className="app-container">
          <Header />
          <div>
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/home" />} />
              <Route path="/home" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/account" component={account} />
              <Route path="/forgot" component={Forgot} />
              <Route path="/admin" component={Admin} />
              <Route path="/explore" component={Explore} />
              <Route path="/examples" component={Examples} />
            </Switch>
          </div>
        </div>
      </FirebaseContext.Provider>
    </BrowserRouter>
  );
}

export default App;
