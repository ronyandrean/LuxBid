import "../style/Register.css";
import logo from "../assets/LXRe.png";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div>
      <div className="main-container">
        <div className="container-outer">
          <img src={logo} alt="luxure-logo" />
          <p>Bidding E-commerce System Using Smart Contracts</p>

          <div className="container-inner">
            <Link to="" className="button-green">Create Internet Identity</Link>
            <Link to="" className="button-white">Use Existing</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
