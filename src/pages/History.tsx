import React from 'react';
import '../style/History.css';
import sampleshoes from '../assets/sample-shoes.png';
import { Link } from 'react-router-dom';
import arrownext from '../assets/arrow-next.png'
import Navbar from './Navbar';
import Footer from './Footer';

const History = () => {
  return (
    <div className="history-body">

      <Navbar />
      <hr />

      <div className="header-history">
        <div className='header-inner-history'>
          <Link to="/history-bidding"><p className="active-page-history tab-history">BIDDING</p></Link>
          <Link to="/history-selling"><p className='tab-history'>SELLING</p></Link>
        </div>
        <h2>History</h2>
      </div>

      <div className='hr-style'><hr /></div>

      <div className='row-product-history'>
        <div className='product-card'>
          <div className='border-image'>
            <img src={sampleshoes} alt="" />
          </div>
          <div className='history-bid-desc'>
            <div className='status-history-bidding'>
              <div className="green-circle-bid"></div>
              <p>In Highest Position</p>
            </div>
            <h2>Jordan 1 Low Travis Scott x Fragment</h2>
            <p>IDR 8.900.000</p>
            <Link to="" className='see-bid'>See Bidding Status</Link>
          </div>
        </div>

        <div className='product-card'>
          <div className='border-image'>
            <img src={sampleshoes} alt="" />
          </div>
          <div className='history-bid-desc'>
            <div className='status-history-bidding'>
              <div className="red-circle-bid"></div>
              <p>Under Price</p>
            </div>
            <h2>Jordan 1 Low Travis Scott x Fragment</h2>
            <p>IDR 8.900.000</p>
            <Link to="" className='see-bid'>See Bidding Status</Link>
          </div>
        </div>

        <div className='product-card'>
          <div className='border-image'>
            <img src={sampleshoes} alt="" />
          </div>
          <div className='history-bid-desc'>
            <div className='status-history-bidding'>
              <div className="red-circle-bid"></div>
              <p>Under Price</p>
            </div>
            <h2>Jordan 1 Low Travis Scott x Fragment</h2>
            <p>IDR 8.900.000</p>
            <Link to="" className='see-bid'>See Bidding Status</Link>
          </div>
        </div>
      </div>

      <div className='row-product-history'>
        <div className='product-card'>
          <div className='border-image'>
            <img src={sampleshoes} alt="" />
          </div>
          <div className='history-bid-desc'>
            <div className='status-history-bidding'>
              <div className="white-circle-bid"></div>
              <p>Bidding Ended</p>
            </div>
            <h2>Jordan 1 Low Travis Scott x Fragment</h2>
            <p>IDR 8.900.000</p>
            <Link to="" className='see-bid'>See Bidding Status</Link>
          </div>
        </div>

        <div className='product-card'>
          <div className='border-image'>
            <img src={sampleshoes} alt="" />
          </div>
          <div className='history-bid-desc'>
            <div className='status-history-bidding'>
              <div className="white-circle-bid"></div>
              <p>Bidding Ended</p>
            </div>
            <h2>Jordan 1 Low Travis Scott x Fragment</h2>
            <p>IDR 8.900.000</p>
            <Link to="" className='see-bid'>See Bidding Status</Link>
          </div>
        </div>

        <div className='product-card'>
          <div className='border-image'>
            <img src={sampleshoes} alt="" />
          </div>
          <div className='history-bid-desc'>
            <div className='status-history-bidding'>
              <div className="white-circle-bid"></div>
              <p>Bidding Ended</p>
            </div>
            <h2>Jordan 1 Low Travis Scott x Fragment</h2>
            <p>IDR 8.900.000</p>
            <Link to="" className='see-bid'>See Bidding Status</Link>
          </div>
        </div>
      </div>

      <div className='page-history-button'>
        <Link to="" className='button-next'>1</Link>
        <Link to="" className='button-next'>2</Link>
        <Link to="" className='button-next'>3</Link>
        <Link to="" className='button-next'><i className="arrow right"></i></Link>
      </div>
    <Footer />
    </div>
  );
};

export default History;
