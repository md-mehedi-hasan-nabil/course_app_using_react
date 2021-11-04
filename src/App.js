import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Courses from "./components/Courses/Courses";
import NoMatch from "./components/NoMatch/NoMatch";
import CourseDetails from "./components/CourseDetails/CourseDetails";
import Home from "./components/Home/Home";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Login from "./components/Login/Login";

export const UserContext = createContext(null);

function App() {
  const [contextData, setContextData] = useState({});
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <UserContext.Provider value={[contextData, setContextData]}>
      <Router>
        <Switch>
          <PrivateRoute path="/course/:id">
            <Courses />
          </PrivateRoute>
          {/* <Route path="/course-details/:id">
            <CourseDetails />
          </Route> */}
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Home />
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
