import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import { Card, Col, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router";
import swal from "sweetalert";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const CourseDetails = () => {
  const [courseDetail, setCourseDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const { courseId } = useParams();



  useEffect(() => {
    setLoading(true)
    fetch(window.location.origin + "/courses.json")
      .then((res) => res.json())
      .then((data) => {
        setCourseDetail(data.find(course => course?._id === courseId));
        setLoading(false);
      })
      .catch((error) => {
        swal("Error", "Data fetch Problem", "error");
        console.error(error);
      });
  }, [courseId]);

  const { _id, name, price, company, address, background, description, registered } = courseDetail || {}

  return (
    <div>
      <Header />
      <section className="container my-5">
        <Link to="/" className="btn btn-primary" >Go Home</Link>
        <div className="mt-3">
          {loading ? (
            <Spinner className="mx-auto my-5" animation="border" />
          ) : (
            <div key={_id} data-aos="zoom-out-up">
              <Row className="my-3 mx-auto">
                <Col md={6}>
                  <img className="w-100 rounded" src={background} alt={name} />
                </Col>
                <Col md="6">
                  <small>{_id}</small>
                  <Card.Title className="text-ellipsis">
                    {name}
                  </Card.Title>
                  <Card.Title>Price: ${price}</Card.Title>
                  <small>Time: {registered}</small> <br />
                  <small>Company: {company}</small> <br />
                  <small>Address: {address}</small>
                  <Card.Title>Description: {description}</Card.Title>
                </Col>
              </Row>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CourseDetails;
