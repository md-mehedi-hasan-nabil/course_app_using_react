import React, { useEffect, useState } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import CoursesCard from "../../components/CoursesCard/CoursesCard";
import EnrollCourse from "../../components/EnrollCourse/EnrollCourse";
import Navigation from "../../components/Navigation/Navigation";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

export default function Home() {
    const [courses, setCourses] = useState([]);
    const [subject, setSubject] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);

    const courseType = useParams().id;

    useEffect(() => {
        setLoading(true)
        fetch("courses.json")
            .then((res) => res.json())
            .then((data) => {
                setCourses(
                    shuffleArray(data.filter((el) => el.course_type === courseType))
                );
                setLoading(false);
            })
            .catch((error) => {
                swal("Error", "Data fetch Problem", "error");
                console.error(error);
            });
    }, [courseType]);

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
                <Header />
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
