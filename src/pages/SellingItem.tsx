import React from 'react';
import { Link } from 'react-router-dom';
import '../style/SellingItem.css';
import Navbar from './Navbar';
import Footer from './Footer';
import buttonupload from '../assets/button-upload.png';
import { Principal } from '@dfinity/principal';

interface NewAuctionFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

interface FormDataType {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  productName: string;
  startPrice: string;
  fixPrice: string;
  duration: string;
  description: string;
  image: string;
}

const SellingItem = () => {
  return (
    <div className="selling-item-body">
      <Navbar />

      <div className="selling-item-title">
        <h1>Create Your Auction</h1>
        <p>
          List your luxury items securely on our blockchain-based platform. Each
          listing is
        </p>
        <p>verified and protected by smart contracts.</p>
      </div>

      <div className="outer-selling-item">
        <div className='outin-sell-item'>
          <div className="insert-file-sell">
            <label htmlFor="file-upload" className="label-upload">
              <img src={buttonupload} alt="" />
              Click or drag to upload item images
            </label>
            <input id="file-upload" type="file" style={{ display: 'none' }} />
          </div>

          <div className="selling-item-desc">
            <div className="desc-item-1">
              <div className="style-desc-1">
                <p>Item Name</p>
                <input type="text" placeholder="e.g Rony Andrean" />
              </div>
              <div className="style-desc-1">
                <p>Description</p>
                <textarea
                  name=""
                  id=""
                  placeholder="e.g Rony Andrean"
                ></textarea>
              </div>
            </div>

            <div className="desc-item-2">
              <div className="style-desc-2">
                <p>Starting Price</p>
                <input type="text" placeholder="0.00" />
              </div>
              <div className="style-desc-2">
                <p>Fixed Price</p>
                <input type="text" placeholder="0.00" />
              </div>
              <div className="style-desc-2">
                <p>Duration</p>
                <select name="" id="">
                  <option value="">Select Duration</option>
                </select>
              </div>
              <div className="sell-item-link">
                <Link to="" className="sell-item-link-inner">
                  Create Auction
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SellingItem;
