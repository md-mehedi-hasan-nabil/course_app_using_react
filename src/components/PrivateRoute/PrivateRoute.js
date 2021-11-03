import React, { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../../App";

function PrivateRoute({ children, ...rest }) {
  const [loginUser, setloginUser] = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        loginUser.emailVerified ? (
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
