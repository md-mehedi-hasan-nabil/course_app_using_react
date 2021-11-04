import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Spinner, Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import { UserContext } from "../../App";
import CoursesCard from "../CoursesCard/CoursesCard";
import EnrollCourse from "../EnrollCourse/EnrollCourse";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Navigation from "../Navigation/Navigation";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [subject, setSubject] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [contextData, setContextData] = useContext(UserContext);

  const courseType = useParams().id;

  useEffect(() => {
    fetch("http://localhost:4000/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + contextData.accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourses(
          shuffleArray(data.filter((el) => el.course_type === courseType))
        );
        setLoading(false);
      })
      .catch((error) => {
        swal("Error", "Backend Problem", "error");
        console.error(error);
      });
  }, []);

  const addCourses = (courseItem) => {
    let sameSubject = subject.some((item) => item._id === courseItem._id);
    if (!sameSubject) {
      const total = [...subject, courseItem];
      let subjectPrice = totalPrice + courseItem.price;
      setSubject(total);
      setTotalPrice(subjectPrice);
      swal("Thanks! for enroll course", "Course add successful", "success");
    } else {
      swal("Error", "Can't take a course twice !", "error");
    }
  };

  const deleteCourse = (deleteItem) => {
    swal({
      title: "Are you sure?",
      text: "Do tou want to delete this course?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        let prev_subject = [...subject];
        const index = prev_subject.findIndex(
          (item) => item._id === deleteItem._id
        );
        prev_subject.splice(index, index + 1);
        setSubject(prev_subject);
        swal("Enroll course delete successful", "", "success");
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  const shuffleArray = (arr) => {
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

  return (
    <>
      <section className="container-fluid">
        <Header courseType={courseType} />
        <Navigation subject={subject} totalPrice={totalPrice} />
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
                      deleteCourse={deleteCourse}
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
                        addCourses={addCourses}
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
