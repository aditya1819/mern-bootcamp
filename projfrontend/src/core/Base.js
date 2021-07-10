import React from "react";
import Navbar from "./Navbar";

const Base = ({
  title = "My Title",
  description = "My description",
  className = "bg-dark text-white p-4",
  children,
}) => {
  return (
    <div>
      <Navbar/>
      <div className="container-fluid">
        <div className="jumbotron bg-dark text-white text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className="footer bg-dark mt-auto py-3">
        <div className="container-fluid bg-success text-white text-center">
          <p>if you got any questions ask</p>
          <button className="btn btn-warning">Contact Us</button>
        <br />
        </div>

        <div className="container">
          <span className="text-white">An Amazing place to buy T shirts</span>
        </div>
      </footer>
    </div>
  );
};

export default Base;
