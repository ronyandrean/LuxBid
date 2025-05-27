import React from 'react';
import '../style/HistorySelling.css';
import { Link } from 'react-router-dom';
import sampleshoes from '../assets/sample-shoes.png';
import Navbar from './Navbar';
import Footer from './Footer';

const HistorySelling = () => {
  return (
    <div className="history-selling-body">
      <Navbar />
      <hr />

      <div className="header-history">
        <div className="header-inner-history">
          <Link to="/history-bidding">
            <p className="tab-history">BIDDING</p>
          </Link>
          <Link to="/history-selling">
            <p className="active-page-history tab-history">SELLING</p>
          </Link>
        </div>
        <h2>History</h2>
      </div>

      <div className="hr-style">
        <hr />
      </div>

      <div className="product-list-selling">
        <div className="product-card-selling">
          <div className="border-image-selling">
            <img src={sampleshoes} alt="" />
          </div>
          <div className="product-selling-card">
            <div className="status-history-bidding">
              <div className="green-circle-bid"></div>
              <p>In Progress</p>
            </div>
            <h2>Jordan 1 Low Travis Scott x Fragment</h2>
            <p>
              <span>Highest Bid : </span>IDR 8.900.000
            </p>
            <div className="link-selling">
              <Link to="" className="see-bid">
                See Selling Status
              </Link>
              <Link to="" className="see-bid">
                See Product Details
              </Link>
            </div>
          </div>
        </div>
        <div className="product-card-selling">
          <div className="border-image-selling">
            <img src={sampleshoes} alt="" />
          </div>
          <div className="product-selling-card">
            <div className="status-history-bidding">
              <div className="white-circle-bid"></div>
              <p>Done</p>
            </div>
            <h2>Jordan 1 Low Travis Scott x Fragment</h2>
            <p>
              <span>Highest Bid : </span>IDR 8.900.000
            </p>
            <div className="link-selling">
              <Link to="" className="see-bid">
                See Selling Status
              </Link>
              <Link to="" className="see-bid">
                See Product Details
              </Link>
            </div>
          </div>
        </div>
        <div className="product-card-selling">
          <div className="border-image-selling">
            <img src={sampleshoes} alt="" />
          </div>
          <div className="product-selling-card">
            <div className="status-history-bidding">
              <div className="red-circle-bid"></div>
              <p>Cancelled</p>
            </div>
            <h2>Jordan 1 Low Travis Scott x Fragment</h2>
            <p>
              <span>Highest Bid : </span>IDR 8.900.000
            </p>
            <div className="link-selling">
              <Link to="" className="see-bid">
                See Selling Status
              </Link>
              <Link to="" className="see-bid">
                See Product Details
              </Link>
            </div>
          </div>
        </div>

        <div className="page-history-button">
          <Link to="" className="button-next">
            1
          </Link>
          <Link to="" className="button-next">
            2
          </Link>
          <Link to="" className="button-next">
            3
          </Link>
          <Link to="" className="button-next">
            <i className="arrow right"></i>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HistorySelling;
