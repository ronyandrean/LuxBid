import React from 'react';
import '../style/BidCard-2.css';
import jordanshoes from '../assets/bidcard2.png';

const BidCard2 = () => {
  return (
    <div className="BidCard-2">
     
      <div className="Content-Card-1-2">
        <img src={jordanshoes} alt="Jordan 1 Low Travis Scott x Fragment" />
      </div>

      
      <div className="Content-Card-2-2">
        <div className="product-title-2">
          <div className="product-header-2">
            <div className="bid-text-1-2">
              <h3>Jordan 4 Retro</h3>
              <h3>White Laser</h3>
            </div>
            <div className="button-bid-1-2">
              <button>End</button>
            </div>
          </div>

          <div className="product-footer-2">
            <p>Athletic shoe made with laser cut designs and premium materials.</p>
          </div>
        </div>

        <div className="bid-info-2">
          <div>
            <p className="label-2">Current Bid</p>
            <p className="value">5.4 ICP</p>
          </div>
          <div>
            <p className="label-2">Ends in</p>
            <p className="value-2">Ended</p>
          </div>
        </div>

        <div className="footer-info-2">
          <p className="bids-count-2">21 bids</p>
          <button className="place-bid-btn-2">Auction Ended</button>
        </div>
      </div>
    </div>
  );
};

export default BidCard2;