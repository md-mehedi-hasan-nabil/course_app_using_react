import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";

const EnrollCourse = ({ enrollSubject, deleteCourse }) => {
  return (
    <>
      {enrollSubject.map((item) => (
        <article className="col-md-12 my-3" key={item._id}>
          <Card className="mx-auto shadow">
            <Card.Body>
              <small>{item._id}</small>
              <Card.Text>Name: {item.name}</Card.Text>
              <Card.Text>Price: ${item.price}</Card.Text>
              <Button
                variant="danger"
                size="sm"
                onClick={() => deleteCourse(item)}
              >
                Delect
              </Button>
            </Card.Body>
          </Card>
        </article>
      ))}
    </>
  );
};

EnrollCourse.propTypes = {
  enrollSubject: PropTypes.array.isRequired,
  deleteCourse: PropTypes.func.isRequired,
};

export default EnrollCourse;
