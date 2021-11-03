import React from "react";

const Footer = () => {
  return (
    <footer className="text-center bg-light">
      <div className="fw-bold">
        <h3 className="py-4">Subscribe More Info</h3>
        <form>
          <input
            className="form-control w-25 mx-auto my-2"
            type="email"
            name="email"
            required
          />
          <button className="btn btn-warning">Subscribe</button>
        </form>
      </div>
      <div className="text-center p-4">
        &copy; {new Date().getFullYear()} Copyright:{" "}
        <span className="text-dark">Md. Mehedi Hasan Nabil</span>
      </div>
    </footer>
  );
};

export default Footer;
