import React, { useState, ChangeEvent, FormEvent } from 'react';
import '../style/SellingContact.css';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { Principal } from '@dfinity/principal';
import { createActor, canisterId } from '../declarations/backend';
import { on } from 'events';
import { useNavigate } from 'react-router-dom';

const backend = createActor(canisterId);

interface SellingContactProps {
  onSuccess: () => void;
  onCancel: () => void;
}

interface FormDataType {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

const SellingContact: React.FC<SellingContactProps> = ({
  onSuccess,
  onCancel,
}) => {
  const [formData, setFormData] = React.useState<FormDataType>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });

  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');
  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // Validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phoneNumber
    ) {
      setError('Please fill in all required fields');
      return;
    }

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!/^\+?\d{10,15}$/.test(formData.phoneNumber)) {
      setError('Please enter a valid phone number');
      return;
    }

    setSubmitting(true);

    try {
      const result = await backend.addSeller(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.phoneNumber,
      );
      console.log('Seller creation result:', result);

      if (result > 0n) {
        onSuccess();
        navigate('/selling-item');
      } else {
        setError('Seller creation failed. Please try again.');
      }
    } catch (error: any) {
      console.error('Error creating Seller Account:', error);
      setError('Failed to create Seller Account. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="selling-contact-body">
      <Navbar />

      <div className="outer-content-selling">
        <div className="form-contact-style">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="form-selling-contact">
            <div className="form-title-selling">
              <h2 id="title-contact">Get Started</h2>
              <p>CONTACT INFORMATION</p>
            </div>
            <div className="input-style-outer">
              <p>First Name*</p>
              <input
                type="text"
                name="firstName"
                className="input-style-contact"
                placeholder="Type your first name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-style-outer">
              <p>Last Name*</p>
              <input
                type="text"
                name="lastName"
                className="input-style-contact"
                placeholder="Type your last name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-style-outer">
              <p>Email*</p>
              <input
                type="email"
                name="email"
                className="input-style-contact"
                placeholder="Type your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-style-outer">
              <p>Phone Number*</p>
              <input
                type="phone"
                name="phoneNumber"
                className="input-style-contact"
                placeholder="+62"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="check-box-style">
              <input type="checkbox" name="" id="" required />
              <p>
                I CONFIRM THAT I HAVE READ AND UNDERSTOOD THE TERMS AND
                CONDITIONS AND PRIVACY POLICY
              </p>
            </div>
            <div className="button-selling">
              <button
                type="submit"
                onClick={onSuccess}
                disabled={submitting}
                className={`button-selling-style-green ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {submitting ? 'Submitting...' : 'CONTINUE'}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="button-selling-style-white"
              >
                BACK
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SellingContact;
