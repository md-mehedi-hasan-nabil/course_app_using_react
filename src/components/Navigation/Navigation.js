import React from "react";
import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Login from "../Login/Login";

const Navigation = ({ subject }) => {
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
            { (
              <span className="badge bg-secondary">{0}</span>
            )}
          </button>
        </>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <NavLink className="btn btn-outline-primary mx-1" to="/">
              Home
            </NavLink>
            <NavLink className="btn btn-outline-primary mx-1" to="/about">
              About
            </NavLink>
            <button className="btn btn-outline-primary">
              {/* Total courses: <Badge bg="secondary">{subject.length}</Badge> */}
              <span className="visually-hidden">unread messages</span>
            </button>
            <button className="btn btn-outline-success mx-1">
              {/* Total Price: ${totalPrice.toFixed(2)} */}
            </button>
            <Login />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </nav>
  );
};

export default Navigation;
