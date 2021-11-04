import React, { useContext, useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserContext } from "../../App";
import { Container, Row, Spinner } from "react-bootstrap";

function PrivateRoute({ children, ...rest }) {
  const [contextData, setContextData] = useContext(UserContext);
  const [user, setUser] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    loggedInUser();
  }, []);

  const loggedInUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { accessToken, displayName, email, photoURL } = user;
        setContextData({ accessToken, displayName, email, photoURL });
        setUser(true);
      } else {
        setContextData({});
      }
    });
  };
  console.log(contextData);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !user ? (
          <Container>
            <Row className="mt-5">
              <Spinner
                className="mx-auto my-5 mt-5 mx-auto"
                animation="border"
              />
            </Row>
          </Container>
        ) : contextData.displayName ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
