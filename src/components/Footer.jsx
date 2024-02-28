import React from "react";
import "../assets/css/footer.css";
import { RiTwitterXLine } from "react-icons/ri";
import { CiFacebook } from "react-icons/ci";

const Footer = () => {
  return (
    <footer className="site-footer">
        <div className="footer-row">
          <div className="col-md-12 text-center">
            <p>&copy; {new Date().getFullYear()} Our Library</p>
          </div>
          <a href="https://twitter.com/votreProfilTwitter" target="_blank" rel="noopener noreferrer" className="Twitter"><RiTwitterXLine size="2em" /></a>
          <a href="https://www.facebook.com/votrePageFacebook" target="_blank" rel="noopener noreferrer" className="Facebook"><CiFacebook size="2.4em" /></a>
        </div>
    </footer>
  );
};

export default Footer;

