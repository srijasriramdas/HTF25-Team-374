import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

// This page contains the form for users to submit new items.
// It handles form state, validation (basic), and submission.
const ReportItemPage: React.FC = () => {
  const navigate = useNavigate();
  const { addItem, setFlashMessage } = useData();
  const { currentUser } = useAuth();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [datetime, setDatetime] = useState(new Date().toISOString().slice(0, 16));
  const [status, setStatus] = useState<'lost' | 'found'>('lost'); // User selects 'lost' or 'found'
  const [image, setImage] = useState<string | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handles image selection and converts the file to a base64 string for storage/display.
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String);
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
        setFlashMessage("You must be logged in to report an item.");
        return;
    }
    
    setIsSubmitting(true);
    // The item is now submitted with the status selected by the user ('lost' or 'found').
    // This makes it appear immediately on the corresponding list page.
    await addItem({
      title,
      description,
      location,
      datetime,
      status: status, 
      userId: currentUser.id,
      image,
    });
    
    setIsSubmitting(false);
    setFlashMessage('Item successfully reported!');
    navigate(`/items/${status}`);
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg shadow-2xl">
      <h1 className="text-3xl font-bold text-white mb-6">Report an Item</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300">I have...</label>
          <div className="mt-2 grid grid-cols-2 gap-4">
            <button type="button" onClick={() => setStatus('lost')} className={`px-4 py-3 rounded-md w-full transition-colors duration-300 ${status === 'lost' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Lost an Item</button>
            <button type="button" onClick={() => setStatus('found')} className={`px-4 py-3 rounded-md w-full transition-colors duration-300 ${status === 'found' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>Found an Item</button>
          </div>
        </div>
        
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300">Item Name</label>
          <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
          <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} required rows={4} className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"></textarea>
        </div>
        
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-300">{status === 'lost' ? 'Last Seen' : 'Location Found'}</label>
          <input type="text" id="location" value={location} onChange={e => setLocation(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" />
        </div>
        
        <div>
          <label htmlFor="datetime" className="block text-sm font-medium text-gray-300">Date and Time</label>
          <input type="datetime-local" id="datetime" value={datetime} onChange={e => setDatetime(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500" />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-300">Upload Image</label>
            <div className="mt-2 flex items-center space-x-6 p-4 bg-gray-700/50 rounded-lg">
                <span className="h-24 w-24 rounded-md overflow-hidden bg-gray-700 flex-shrink-0 border border-gray-600">
                    {imagePreview ? <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" /> : <svg className="h-full w-full text-gray-500" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.997A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
                </span>
                <input type="file" onChange={handleImageChange} accept="image/*" className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-100/10 file:text-emerald-300 hover:file:bg-emerald-100/20"/>
            </div>
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full bg-emerald-600 text-white py-3 px-4 border border-transparent rounded-md shadow-sm font-medium hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:bg-emerald-800 disabled:cursor-not-allowed transition-colors duration-300">
          {isSubmitting ? 'Submitting...' : 'Submit Report'}
        </button>
      </form>
    </div>
  );
};

export default ReportItemPage;