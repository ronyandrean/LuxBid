import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import '../style/SellingItem.css';
import Navbar from './Navbar';
import Footer from './Footer';
import buttonupload from '../assets/button-upload.png';
import { Principal } from '@dfinity/principal';
import { createActor, canisterId } from '../declarations/backend';
import ProductPage from './ProductPage_Revisi';
import { useNavigate } from 'react-router-dom';

const backend = createActor(canisterId);

interface SellingItemProps {
  onSuccess: () => void;
  onCancel: () => void;
}

interface FormDataType {
  productName: string;
  startPrice: string;
  fixPrice: string;
  duration: string;
  description: string;
  image: string;
}

const SellingItem: React.FC<SellingItemProps> = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState<FormDataType>({
    productName: '',
    startPrice: '',
    fixPrice: '',
    duration: '86400', // Default 1 day in seconds
    description: '',
    image: '',
  });

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string>('');

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

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // Check file type pastikan itu image!
    if (!file.type.match('image.*')) {
      setError('Please select an image file');
      return;
    }

    // Check file size limit at 2MB
    if (file.size > 2 * 1024 * 1024) {
      setError('Image size should be less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target && event.target.result) {
        const result = event.target.result as string;
        setImagePreview(result);
        setFormData({
          ...formData,
          image: result,
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.productName || !formData.startPrice || !formData.fixPrice) {
      setError('Please fill in all required fields');
      return;
    }

    if (Number(formData.startPrice) <= 0) {
      setError('Starting price must be greater than 0');
      return;
    }

    if (Number(formData.fixPrice) <= Number(formData.startPrice)) {
      setError('Fixed price must be greater than starting price');
      return;
    }

    setSubmitting(true);

    try {
      // Calculate deadline in nanoseconds because motoko using nanoseconds!@!!

      const now = Date.now() * 1000000; // Current time in nanoseconds
      const durationNanos = BigInt(Number(formData.duration) * 1000000000); // Convert seconds to nanoseconds
      const deadline = now + Number(durationNanos);

      const result = await backend.addProduct(
        formData.productName,
        BigInt(Number(formData.startPrice)),
        BigInt(Number(formData.fixPrice)),
        BigInt(Number(deadline)),
        formData.description,
        formData.image,
      );
      console.log('Seller creation result:', result);

      if (result > 0n) {
        onSuccess();
        navigate(`/product/${result.toString()}`);
      } else {
        setError('Seller creation failed. Please try again.');
      }
      onSuccess();
    } catch (error: any) {
      // So we know something went wrong from THIS CODE!

      console.error('Error creating auction:', error);
      setError('Failed to create auction. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Helper function to convert duration to human-readable format (NICE GPT I DONT KNOW WHAT THE HELL IS THAT!)
  const formatDuration = (seconds: number): string => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  };

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

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="outer-selling-item">
          <div className="outin-sell-item">
            <div className="insert-file-sell">
              <label htmlFor="file-upload" className="label-upload">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-2 h-32 object-contain rounded border"
                  />
                )}
                <img src={buttonupload} alt="" />
                Click or drag to upload item images
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full text-sm text-gray-500"
              />
            </div>

            <div className="selling-item-desc">
              <div className="desc-item-1">
                <div className="style-desc-1">
                  <p>Item Name</p>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    // className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div className="style-desc-1">
                  <p>Description</p>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    // className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="desc-item-2">
                <div className="style-desc-2">
                  <p>Starting Price</p>
                  <input
                    type="number"
                    name="startPrice"
                    value={formData.startPrice}
                    onChange={handleChange}
                    // className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    required
                    min="0"
                  />
                </div>
                <div className="style-desc-2">
                  <p>Fixed Price</p>
                  <input
                    type="number"
                    name="fixPrice"
                    value={formData.fixPrice}
                    onChange={handleChange}
                    // className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    required
                    min="0"
                  />
                </div>
                <div className="style-desc-2">
                  <p>Duration</p>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="3600">1 Hour</option>
                    <option value="86400">1 Day</option>
                    <option value="604800">7 Days</option>
                  </select>
                  <p className="text-sm text-gray-500 mt-1">
                    Selected: {formatDuration(Number(formData.duration))}
                  </p>
                </div>
                <div className="sell-item-link">
                  <button
                    type="button"
                    onClick={onCancel}
                    className="btn-cancel"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`btn-submit ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {submitting ? 'Submitting...' : 'Create Auction'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      <Footer />
    </div>
  );
};

export default SellingItem;
