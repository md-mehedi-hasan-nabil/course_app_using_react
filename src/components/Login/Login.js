import React, { useContext, useEffect } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebaseConfig";
import swal from "sweetalert";
import { UserContext } from "../../App";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";

initializeApp(firebaseConfig);

const Login = () => {
  const [contextData, setContextData] = useContext(UserContext);
  const auth = getAuth();

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setContextData(user.providerData[0]);
        console.log(user.providerData[0]);
        swal("SignIn successful", "Account Sign In successful", "success");
        history.replace(from);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error(errorMessage);
        swal("SignIn Error", errorMessage, "error");
        console.error(error);
      });
  };
  return (
    <>
      <Container className="d-flex justify-content-center mt-5">
        <Link to="/">
          <h3>Logo</h3>
        </Link>
      </Container>
      <Container>
        <Row className="mt-3">
          <Col lg={5} className="mx-auto mt-5 py-5 border text-center">
            <div className="p-4">
              <h5 className="mb-3 font-weight-bold">Login With</h5>
              <button
                className="btn w-100 m-2 mb-2 rounded-pill border"
                onClick={googleSignIn}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-google"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                </svg>
                <span className="ms-2">SignIn With Google</span>
              </button>
              <p>
                Don’t have an account?
                <span style={{ color: "#3F90FC", cursor: "pointer" }}>
                  {" "}
                  Create an account{" "}
                </span>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
