import React from "react";
import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Navigation = ({ subject, totalPrice, courseSearchHandler }) => {

  const toggleSidenav = () => {
    document.getElementById("toggleNav").classList.toggle("d-none");
  };

  const handleSearch = (e) => {
    courseSearchHandler(e.target.value)
  }

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
            </svg>
            {subject && (
              <span className="badge bg-secondary">{subject.length}</span>
            )}
          </button>
        </>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <NavLink className="btn btn-primary mx-2" to="/">
              Home
            </NavLink>
            {subject && (
              <button className="btn btn-warning">
                Total courses: <Badge bg="secondary">{subject.length}</Badge>
                <span className="visually-hidden"></span>
              </button>
            )}
            {totalPrice === true && (
              <button className="btn btn-success mx-2">
                Total Price: ${totalPrice.toFixed(2)}
              </button>
            )}
            <div className="mx-2 d-flex">
              <input onChange={e => handleSearch(e)} className="form-control me-2" type="search" placeholder="Search course..." aria-label="Search" style={{ borderRadius: '0.5rem' }} />
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </nav>
  );
};

export default Navigation;
