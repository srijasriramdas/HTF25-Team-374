
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
  const statusColor = item.status === 'lost' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <img className="w-full h-48 object-cover" src={item.image} alt={item.title} />
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
            <span className={`text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ${statusColor}`}>{item.status.toUpperCase()}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{item.description.substring(0, 100)}...</p>
        <div className="text-xs text-gray-500">
          <p><strong>Location:</strong> {item.location}</p>
          <p><strong>Date:</strong> {new Date(item.datetime).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="p-4 bg-gray-50">
        <Link to={`/item/${item.id}`} className="w-full text-center block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ItemCard;
