import React from 'react';
import '../style/Profile.css';
import profilepic from '../assets/profile-testing.jpg';
import { Link } from 'react-router-dom';
import editlogo from '../assets/user-edit.png';
import selllogo from '../assets/shirt.png';
import historylogo from '../assets/history.png';
import settinglogo from '../assets/settings-cog.png';
import logoutlogo from '../assets/logout.png';
import Navbar from './Navbar';
import Footer from './Footer';

const profile = () => {
  return (
    <div className="profile-body">
      <Navbar />
      <hr />
      <div className="full-profile">
        <div className="upper-profile">
          <div className="profile-picture">
            <img src={profilepic} alt="" />
          </div>
          <div className="profile-desc">
            <p>
              Internet Identity : <span>2546371</span>
            </p>
            <h2>Kim Min-Ju</h2>
            <h1>IDR 5.000.000</h1>
            <Link to="" className="button-profile">
              Top Up
            </Link>
          </div>
        </div>

        <hr className="hr-line-profile" />

        <div className="lower-profile">
          <div className="button-profile-lower">
            <img src={editlogo} alt="" />
            <Link to="" className='link-profile'>Edit Profile</Link>
          </div>
          <div className="button-profile-lower">
            <img src={selllogo} alt="" />
            <Link to="" className='link-profile'>Sell items's</Link>
          </div>
          <div className="button-profile-lower">
            <img src={historylogo} alt="" />
            <Link to="/history-bidding" className='link-profile'>History</Link>
          </div>
          <div className="button-profile-lower">
            <img src={settinglogo} alt="" />
            <Link to="" className='link-profile'>Account Settings</Link>
          </div>
          <div className="button-profile-lower">
            <img src={logoutlogo} alt="" />
            <Link to="" className='link-profile'>Logout</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default profile;
