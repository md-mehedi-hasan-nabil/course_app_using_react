import React, { useContext, useEffect, useState } from "react";
import { Card, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router";
import swal from "sweetalert";
import { UserContext } from "../../App";
import Header from "../Header/Header";

const CourseDetails = () => {
  const [courseDetail, setCourseDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authUser] = useContext(UserContext);
  const id = useParams().id;

  useEffect(() => {
    fetch(`http://localhost:4000/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authUser.accessToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourseDetail(data);
        setLoading(false);
      })
      .catch((error) => {
        swal("Error", "Backend Problem", "error");
        console.error(error);
      });
  }, [id, authUser]);

  return (
    <div>
      <Header />
      <section className="container">
        <Row className="mt-3">
          {loading ? (
            <Spinner className="mx-auto my-5" animation="border" />
          ) : (
            courseDetail.map((item) => (
              <article key={item._id} className="col-lg-8 mx-auto" data-aos="zoom-out-up">
                <Card className="my-3 mx-auto">
                  <div className="image-size">
                    <Card.Img variant="top" src={item.background} />
                  </div>
                  <Card.Body>
                    <small>{item._id}</small>
                    <Card.Title className="text-ellipsis">
                      {item.name}
                    </Card.Title>
                    <Card.Title>Price: ${item.price}</Card.Title>
                    <small>Time: {item.registered}</small> <br />
                    <small>Company: {item.company}</small> <br />
                    <small>Address: {item.address}</small>
                    <Card.Title>Descriptopn: {item.descriptopn}</Card.Title>
                  </Card.Body>
                </Card>
              </article>
            ))
          )}
        </Row>
      </section>
    </div>
  );
};

export default CourseDetails;
