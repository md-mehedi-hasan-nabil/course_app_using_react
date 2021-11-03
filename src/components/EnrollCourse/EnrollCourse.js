import React from "react";
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

export default EnrollCourse;
