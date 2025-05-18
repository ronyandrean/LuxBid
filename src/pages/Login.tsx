import './Login.css'
import logo from "../assets/LXRe.png";
import arrowLeft from "../assets/arrow-narrow-left.png"
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div>
      <div className="main-container">
        <div className="container-outer">
          <img src={logo} alt="luxure-logo" />
          <p>Bidding E-commerce System Using Smart Contracts</p>

          <div className='user-input'>
            <p>Enter Identity to Continue</p>
            <input type="text" placeholder='Internet Identity' />
          </div>

          <div className="container-inner">
            <Link to="" className="button-green">Continue</Link>
            <Link to="" className="button-white">Continue with another device</Link>
          </div>
          <div>
            <div className="link-style">
              <Link to="" className="text-underline">← Back</Link>
              <Link to="" className="text-underline-2">Lost Access</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}