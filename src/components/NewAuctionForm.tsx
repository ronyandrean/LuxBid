// src/components/NewAuctionForm.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
// import { backend } from '../declarations/backend';
import { createActor, canisterId } from '../declarations/backend';

const backend = createActor(canisterId);

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

const NewAuctionForm: React.FC<NewAuctionFormProps> = ({
  onSuccess,
  onCancel,
}) => {
  const [formData, setFormData] = useState<FormDataType>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
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
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.productName ||
      !formData.startPrice ||
      !formData.fixPrice
    ) {
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

      await backend.addProduct(
        formData.productName,
        BigInt(Number(formData.startPrice)),
        BigInt(Number(formData.fixPrice)),
        BigInt(Number(deadline)),
        formData.description,
        formData.image,
      );

      onSuccess();
    } catch (error) {
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
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Create New Auction</h2>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name *
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Name *
            </label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Price (ICP) *
            </label>
            <input
              type="number"
              name="startPrice"
              value={formData.startPrice}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fixed Price (ICP) *
            </label>
            <input
              type="number"
              name="fixPrice"
              value={formData.fixPrice}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Auction Duration
            </label>
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
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-500"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 h-32 object-contain rounded border"
            />
          )}
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className={`px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {submitting ? 'Submitting...' : 'Create Auction'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewAuctionForm;
