import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Services = () => {
  const servicesList = [
    {
      title: "Full-Stack Web Development with React",
      type: "web-development",
      image:
        "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2ViJTIwY291cnNlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "Create and Design Digital Products using Canva",
      type: "graphic-design",
      image:
        "https://images.unsplash.com/photo-1620912189868-30778f884588?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fGdyYXBoaWMlMjBkZXNpZ258ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      title: "Java Programming and Software Engineering Fundamentals",
      type: "app-wevelopment",
      image:
        "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YW5kcm9pZCUyMGRldmVsb3BtZW50fGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
  ];
  return (
    <div className="my-5 py-5">
      <Container>
        <h1 className="text-center">
          Our <span className="text-warning">Services</span>
        </h1>
        <Row>
          {servicesList.map((service, index) => (
            <Col lg={4} key={index}>
              <Card className="my-3 position-relative">
                <h2 className="card-header-title text-capitalize text-center py-4">
                  {
                    `${service.type.split("-")[0]} ${service.type.split("-")[1]}`
                  }
                </h2>
                <Card.Img variant="top" src={service.image} />
                <div className="cardBodyAnimation card-body text-center rounded">
                  <Card.Title>{service.title}</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card content.
                  </Card.Text>
                  <Link to={`/course/${service.type}`}>
                    <button className="w-100 btn btn-warning">
                      Enroll Now
                    </button>
                  </Link>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Services;
