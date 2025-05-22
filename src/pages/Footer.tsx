import React from "react"
import logo from "../assets/LXRe.png"
import '../style/Footer.css'

const AboutFooter = () => {
  return (
    <footer className="about-footer">
      <div className="footer-logo"><img src={logo} alt="" /></div>
      <hr />
      <div className="footer-copyright">© 2025 Luxure</div>
    </footer>
  );
};

export default AboutFooter;