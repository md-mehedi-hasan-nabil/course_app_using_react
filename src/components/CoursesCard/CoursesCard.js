import React from "react";
import PropTypes from "prop-types";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";

const CoursesCard = ({ course, addCourses }) => {
  const { name, background, price, registered, company, _id } = course;
  return (
    <article className="col-lg-4" data-aos="zoom-out-up">
      <Card className="my-3 mx-auto">
        <Link to={`/course-details/${_id}`}>
          <div className="image-size">
            <Card.Img variant="top" src={background} />
          </div>
        </Link>
        <Card.Body>
          <small>{_id}</small>
          <Card.Title className="text-ellipsis">
            <Link to={`/course-details/${_id}`} style={{textDecoration: "none"}}>{name}</Link>
          </Card.Title>
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
