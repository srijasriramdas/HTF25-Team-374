import React from 'react';
import { Link } from 'react-router-dom';
import { Item } from '../types';

interface ItemCardProps {
  item: Item;
}

// The ItemCard is a reusable component to display a single item's summary.
// It's used on the homepage and the lost/found list pages.
// Using components like this keeps the code DRY (Don't Repeat Yourself).
const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const statusColor = item.status === 'lost' ? 'bg-red-900 text-red-300' : 'bg-emerald-900 text-emerald-300';

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-emerald-900/50 hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <img className="w-full h-48 object-cover" src={item.image} alt={item.title} />
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-100">{item.title}</h3>
            <span className={`text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full ${statusColor}`}>{item.status.toUpperCase()}</span>
        </div>
        <p className="text-gray-400 text-sm mb-4 flex-grow">{item.description.substring(0, 100)}...</p>
        <div className="text-xs text-gray-500">
          <p><strong>Location:</strong> {item.location}</p>
          <p><strong>Date:</strong> {new Date(item.datetime).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="p-4 bg-gray-900/50">
        <Link to={`/item/${item.id}`} className="w-full text-center block bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors duration-300">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ItemCard;