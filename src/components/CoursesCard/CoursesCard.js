import React from "react";
import PropTypes from "prop-types";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";

const CoursesCard = ({ course, addCourses }) => {
  const { name, background, price, registered, company, _id } = course;
  return (
    <article className="col-lg-4">
      <Card className="my-3 mx-auto">
        <Card.Img variant="top" src={background} />
        <Card.Body>
          <small>{_id}</small>
          <Card.Title>{name}</Card.Title>
          <Card.Title>Price: ${price}</Card.Title>
          <small>Time: {registered}</small> <br />
          <small>Company: {company}</small>
          <OverlayTrigger
            overlay={
              <Tooltip id={_id}>
                Take Course <strong>{name}</strong>.
              </Tooltip>
            }
          >
            <button
              onClick={() => addCourses(course)}
              className="btn btn-primary w-100 text-capitalize fs-6 mt-1"
            >
              <i className="fas fa-cart-plus me-2"></i>
              Enroll Now
            </button>
          </OverlayTrigger>
        </Card.Body>
      </Card>
    </article>
  );
};

CoursesCard.propTypes = {
  course: PropTypes.object.isRequired,
  addCourses: PropTypes.func.isRequired,
};

export default CoursesCard;
