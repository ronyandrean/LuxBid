import React from 'react';
import '../style/BidCard.css';
import jordanshoes from '../assets/jordanXtravisscott.png';

const BidCard = () => {
  return (
    <div className="BidCard">
     
      <div className="Content-Card-1">
        <img src={jordanshoes} alt="Jordan 1 Low Travis Scott x Fragment" />
      </div>

      
      <div className="Content-Card-2">
        <div className="product-title">
          <div className="product-header">
            <div className="bid-text-1">
              <h3>Jordan 1 Low Travis</h3>
              <h3>Scott x Fragment</h3>
            </div>
            <div className="button-bid-1">
              <button>Live</button>
            </div>
          </div>

          <div className="product-footer">
            <p>Limited edition timepiece with exquisite craftsmanship</p>
          </div>
        </div>

        <div className="bid-info">
          <div>
            <p className="label">Current Bid</p>
            <p className="value">2.5 ICP</p>
          </div>
          <div>
            <p className="label">Ends in</p>
            <p className="value">6H 23M</p>
          </div>
        </div>

        <div className="footer-info">
          <p className="bids-count">18 bids</p>
          <button className="place-bid-btn">Place Bid</button>
        </div>
      </div>
    </div>
  );
};

export default BidCard;

