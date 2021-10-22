import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Courses from "./components/Courses/Courses";
import NoMatch from "./components/NoMatch/NoMatch";

export const UserContext = createContext();

function App() {
  const [authUser, setAuthUser] = useState({});
  // console.log(authUser)
  return (
    <UserContext.Provider value={[authUser, setAuthUser]}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Courses />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
