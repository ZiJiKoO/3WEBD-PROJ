import React from "react";
import "../assets/css/footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <p>&copy; {new Date().getFullYear()} Our Library</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

