import React, { useContext, useEffect } from "react";
import { Badge, Container, Nav, Navbar, Image } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { UserContext } from "../../App";
import swal from "sweetalert";

const Navigation = ({ subject, totalPrice }) => {
  const [contextData, setContextData] = useContext(UserContext);
  const auth = getAuth();
  console.log(contextData);

  useEffect(() => {
    loggedInUser();
  }, []);

  const loggedInUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { accessToken, displayName, email, photoURL } = user;
        setContextData({ accessToken, displayName, email, photoURL });
      } else {
        setContextData({});
      }
    });
  };

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        swal("SignOut successful", "Account Sign Out successful", "success");
      })
      .catch((error) => {
        swal("SignOut Error", error.message, "error");
      });
  };
  const toggleSidenav = () => {
    document.getElementById("toggleNav").classList.toggle("d-none");
  };
  return (
    <nav className="navbar navbar-expand-lg d-flex justify-content-between align-items-center text-center py-3 sticky-top shadow">
      <Container fluid>
        <>
          <button
            type="button"
            id="toggleBtn"
            onClick={toggleSidenav}
            className="btn btn-primary ms-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>{" "}
            {subject && (
              <span className="badge bg-secondary">{subject.length}</span>
            )}
          </button>
        </>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <NavLink className="btn btn-primary mx-1" to="/">
              Home
            </NavLink>
            <NavLink className="btn btn-primary mx-1" to="/about">
              About
            </NavLink>
            {subject && (
              <button className="btn btn-warning">
                Total courses: <Badge bg="secondary">{subject.length}</Badge>
                <span className="visually-hidden"></span>
              </button>
            )}
            {totalPrice === true && (
              <button className="btn btn-success mx-1">
                Total Price: ${totalPrice.toFixed(2)}
              </button>
            )}
            {contextData.displayName ? (
              <>
                <button className="btn btn-primary">
                  {contextData.displayName}
                </button>
                {contextData.photoURL && (
                  <div style={{width: "75px"}}>
                    <Image
                      className="w-50 rounded-circle "
                      src={contextData.photoURL}
                    />
                  </div>
                )}
                <button
                  className="btn btn-outline-danger mx-1"
                  onClick={userSignOut}
                >
                  SignOut
                </button>
              </>
            ) : (
              <Link to="/login">
                <button className="btn btn-info px-3 me-4">
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
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </nav>
  );
};

export default Navigation;
