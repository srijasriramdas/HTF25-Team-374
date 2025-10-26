import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useData } from '../context/DataContext';
import ItemCard from '../components/ItemCard';
import { Item } from '../types';

interface ItemsListPageProps {
  type: 'lost' | 'found';
}

// This page displays either all "lost" items or all "found" items,
// depending on the 'type' prop it receives. It also includes a search bar.
const ItemsListPage: React.FC<ItemsListPageProps> = ({ type }) => {
  const { items, loading } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get search query from URL if it exists
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get('search') || '';

  // Set initial search term from URL
  useState(() => {
    setSearchTerm(initialSearch);
  });
  
  // useMemo is a React Hook that lets you cache the result of a calculation between re-renders.
  // Here, it prevents re-filtering the items list on every key press if the underlying
  // data hasn't changed, which is a performance optimization.
  const filteredItems = useMemo(() => {
    return items
      .filter(item => item.status === type)
      .filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [items, type, searchTerm]);

  const pageTitle = type === 'lost' ? 'Lost Items' : 'Found Items';

  const SkeletonCard = () => (
    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse">
        <div className="w-full h-48 bg-gray-700"></div>
        <div className="p-4">
            <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-full mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        </div>
        <div className="p-4 bg-gray-900/50">
            <div className="h-10 bg-gray-700 rounded"></div>
        </div>
    </div>
  );

  return (
    <div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">{pageTitle}</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search by keyword, description, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-emerald-500 focus:border-emerald-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : filteredItems.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-800 rounded-lg">
          <h2 className="text-2xl font-semibold text-white">No items found.</h2>
          <p className="text-gray-400 mt-2">Try adjusting your search or check back later.</p>
        </div>
      )}
    </div>
  );
};

export default ItemsListPage;