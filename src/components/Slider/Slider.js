import React from "react";
import { Carousel, Container, Image } from "react-bootstrap";

const Slider = () => {
  return (
    <Container>
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100 h-50"
            src="https://images.unsplash.com/photo-1543966888-7c1dc482a810?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGphdmFzY3JpcHR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
            alt="First slide"
          />
          <div className="slider-information text-center p-5 rounded w-50">
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 h-50"
            src="https://images.unsplash.com/photo-1610018556010-6a11691bc905?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fGphdmF8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
            alt="Second slide"
          />

          <div className="slider-information text-center p-5 rounded w-50">
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 h-50"
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGphdmF8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
            alt="Third slide"
          />

          <div className="slider-information text-center p-5 rounded w-50">
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </div>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

export default Slider;
