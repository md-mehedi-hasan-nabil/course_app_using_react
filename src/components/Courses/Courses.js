import React, { Component } from "react";
import { Container, Row, Spinner, Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import swal from "sweetalert";
import { UserContext } from "../../App";
import CoursesCard from "../CoursesCard/CoursesCard";
import EnrollCourse from "../EnrollCourse/EnrollCourse";
import Footer from "../Footer/Footer";
import Login from "../Login/Login";

class Courses extends Component {
  state = {
    courses: [],
    subject: [],
    loading: true,
    totalPrice: 0,
  };

  componentDidMount() {
    // fetch("http://localhost:4000/", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     auth: "",
    //   },
    // })
    fetch("courses.json")
      .then((res) => res.json())
      .then((data) =>
        this.setState({ courses: this.shuffleArray(data), loading: false })
      )
      .catch((error) => {
        swal("Error", "Backend Problem", "error");
        console.error(error);
      });
  }

  toggleSidenav() {
    document.getElementById("toggleNav").classList.toggle("d-none");
  }

  addCourses = (courseItem) => {
    let sameSubject = this.state.subject.some(
      (item) => item._id === courseItem._id
    );
    if (!sameSubject) {
      const total = [...this.state.subject, courseItem];
      let subjectPrice = this.state.totalPrice + courseItem.price;
      this.setState({
        subject: total,
        totalPrice: subjectPrice,
      });
      swal("Thanks! for enroll course", "Course add successful", "success");
    } else {
      swal("Error", "Can't take a course twice !", "error");
    }
  };

  deleteCourse = (deleteItem) => {
    swal({
      title: "Are you sure?",
      text: "Do tou want to delete this course?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const subject = this.state.subject;
        const index = subject.findIndex((item) => item._id === deleteItem._id);
        subject.splice(index, index + 1);
        this.setState({
          subject: subject,
        });
        swal("Enroll course delete successful", "", "success");
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  shuffleArray = (arr) => {
    const n = arr.length;
    let myArray = [...arr];
    for (let i = n - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = myArray[j];
      myArray[j] = myArray[i];
      myArray[i] = temp;
    }
    return myArray;
  };

  render() {
    const { subject, totalPrice, loading, courses } = this.state;
    // console.log(this.UserContext)
    console.log(this.shuffleArray(courses));
    return (
      <>
        <section className="container-fluid">
          <header>
            <h2 className="text-center text-primary py-3 border-bottom">
              Web Development Courses
            </h2>
          </header>
          <nav className="navbar navbar-expand-lg d-flex justify-content-between align-items-center text-center py-3 sticky-top shadow">
            <Container fluid>
              <Navbar.Brand href="#home">
                <button
                  type="button"
                  id="toggleBtn"
                  onClick={this.toggleSidenav}
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
                </button>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mx-auto">
                  <NavLink className="btn btn-primary mx-1 text-light" to="/">
                    Home
                  </NavLink>
                  <NavLink
                    className="btn btn-primary mx-1 text-light"
                    to="/about"
                  >
                    About
                  </NavLink>
                  <button className="btn btn-warning mx-1">
                    Total courses: {subject.length}
                  </button>
                  <button className="btn btn-success mx-1">
                    Total Price: ${totalPrice.toFixed(2)}
                  </button>
                  <Login />
                </Nav>
              </Navbar.Collapse>
            </Container>
          </nav>
          <section className="row">
            <aside className="col-lg-3 d-none" id="toggleNav">
              <Container fluid>
                <Container fluid>
                  <Row>
                    <div className="fixed-enroll bg-light">
                      {subject.length ? (
                        <h2 className="badge bg-primary my-2 fs-2 w-100">
                          See your courses
                        </h2>
                      ) : (
                        <h2 className="badge bg-danger my-2 fs-2 w-100">
                          No content here
                        </h2>
                      )}
                      <EnrollCourse
                        deleteCourse={this.deleteCourse}
                        enrollSubject={subject}
                      />
                    </div>
                  </Row>
                </Container>
              </Container>
            </aside>
            <aside className="col">
              <Container fluid>
                <Container>
                  <Row className="mt-3">
                    {loading ? (
                      <Spinner className="mx-auto my-5" animation="border" />
                    ) : (
                      courses.map((item) => (
                        <CoursesCard
                          key={item._id}
                          course={item}
                          addCourses={this.addCourses}
                          deleteCourse={this.deleteCourse}
                        ></CoursesCard>
                      ))
                    )}
                  </Row>
                </Container>
              </Container>
            </aside>
          </section>
        </section>
        <Footer />
      </>
    );
  }
}

// Courses.contextType = UserContext;

export default Courses;
