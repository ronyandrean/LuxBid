import React from 'react';
import '../style/Profiles.css';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import sampleimage from '../assets/profile-testing.jpg';

const Profiles = () => {
  return (
    <div className="body-profiles">
      <Navbar />

      <div className="profiles-header">
        <div className="profiles-image">
          <img src={sampleimage} alt="" />
        </div>
        <div className="profiles-content-2">
          <div className="profiles-name">
            <h1>Rony Andrean</h1>
            <h3>Verified</h3>
          </div>
          <p>
            Passionate collector of vintage watches and rare art pieces. Active
            on LXRe since 2024
          </p>
          <p>with over 50 successful transactions.</p>
        </div>
        <div className="edit-profiles">
          <Link to="" className="edit-profiles-button">
            Edit Profile
          </Link>
        </div>
      </div>

      <div id='outer-showcase-profile'>
        <div className="showcase-profile">
          <div className="showcase-profile-inner">
            <h3>Total Bids</h3>
            <h1>100</h1>
          </div>
          <div className="showcase-profile-inner">
            <h3>Auction Won</h3>
            <h1>100</h1>
          </div>
          <div className="showcase-profile-inner">
            <h3>Profits</h3>
            <h1>200%</h1>
          </div>
        </div>

        <div className="wallet-payments">
          <div className="header-wallet-payments">
            <h1>Wallets & Payments</h1>
            <Link to="" className="wallet-link-style">
              Create New Auction
            </Link>
          </div>
          <div className="inner-wallet-payments">
            <h3>Wallet Balance</h3>
            <div className="most-inner-wallet-payments">
              <h1>1000.0 ICP</h1>
              <p>≈ $110,000 USD</p>
              <Link to="" className="most-inner-button-1">
                Deposit
              </Link>
              <Link to="" className="most-inner-button-2">
                Withdraw
              </Link>
              <Link to="" className="most-inner-button-2">
                Deposit
              </Link>
            </div>
          </div>
        </div>

        <div className="transaction-container">
          <h1 className="transaction-title">Transaction History</h1>

          <table className="transaction-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="user-info">
                    <div className="user-avatar">R</div>
                    <span className="user-name">Rony Andrean</span>
                  </div>
                </td>
                <td>
                  <span className="transaction-type">Deposit</span>
                </td>
                <td>
                  <span className="transaction-description">
                    Added funds to wallet
                  </span>
                </td>
                <td>
                  <span className="amount-positive">+300.0 ICP</span>
                </td>
                <td>
                  <span className="status-badge status-completed">
                    Completed
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="user-info">
                    <div className="user-avatar">R</div>
                    <span className="user-name">Rony Andrean</span>
                  </div>
                </td>
                <td>
                  <span className="transaction-type">Purchase</span>
                </td>
                <td>
                  <span className="transaction-description">
                    Payment for auction item #1002
                  </span>
                </td>
                <td>
                  <span className="amount-negative">-300.0 ICP</span>
                </td>
                <td>
                  <span className="status-badge status-pending">Pending</span>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="user-info">
                    <div className="user-avatar">R</div>
                    <span className="user-name">Rony Andrean</span>
                  </div>
                </td>
                <td>
                  <span className="transaction-type">Withdraw</span>
                </td>
                <td>
                  <span className="transaction-description">
                    Transferred to external wallet
                  </span>
                </td>
                <td>
                  <span className="amount-negative">-300.0 ICP</span>
                </td>
                <td>
                  <span className="status-badge status-failed">Failed</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profiles;
