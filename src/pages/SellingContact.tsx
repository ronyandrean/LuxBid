import React from 'react';
import '../style/SellingContact.css';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const SellingContact = () => {
  return (
    <div className="selling-contact-body">
      <Navbar />

      <div className="outer-content-selling">
        <div className="form-contact-style">
          <form action="">
            <div className="form-title-selling">
              <h2 id='title-contact'>Get Started</h2>
              <p>CONTACT INFORMATION</p>
            </div>
            <div className="input-style-outer">
              <p>First Name*</p>
              <input
                type="text"
                className="input-style-contact"
                placeholder="Type your first name"
              />
            </div>
            <div className="input-style-outer">
              <p>Last Name*</p>
              <input
                type="text"
                className="input-style-contact"
                placeholder="Type your last name"
              />
            </div>
            <div className="input-style-outer">
              <p>Email*</p>
              <input
                type="text"
                className="input-style-contact"
                placeholder="Type your email"
              />
            </div>
            <div className="input-style-outer">
              <p>Phone Number*</p>
              <input
                type="text"
                className="input-style-contact"
                placeholder="+62"
              />
            </div>
            <div className='check-box-style'>
              <input type="checkbox" name="" id="" />
              <p>I CONFIRM THAT I HAVE READ AND UNDERSTOOD THE TERMS AND CONDITIONS
              AND PRIVACY POLICY</p>
            </div>
            <div className='button-selling'>
              <Link to="/selling-item" className='button-selling-style-green'>CONTINUE</Link>
              <Link to="/" className='button-selling-style-white'>BACK</Link>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SellingContact;
