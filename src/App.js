import React, { createContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css";
import NoMatch from "./components/NoMatch/NoMatch";
import Home from "./pages/Home/Home";
import CourseDetails from "./pages/CourseDetails/CourseDetails";

export const UserContext = createContext(null);

function App() {
  useEffect(() => {
    AOS.init({
      once: true
    });
  }, []);

  return (

    <Router>
      <Switch>
        <Route path="/course-details/:courseId">
          <CourseDetails />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
