import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { Item, ItemStatus } from '../types';

// This is the control panel for the admin. It allows them to moderate content.
const AdminDashboardPage: React.FC = () => {
  const { items, updateItemStatus, loading } = useData();
  const [filter, setFilter] = useState<ItemStatus | 'all'>('all');

  const filteredItems = useMemo(() => {
    if (filter === 'all') return items;
    return items.filter(item => item.status === filter);
  }, [items, filter]);
  
  // A simple function to find potential duplicates based on title similarity.
  // In a real app, this would be a more sophisticated algorithm.
  const findDuplicates = (currentItem: Item): Item[] => {
    return items.filter(item => 
        item.id !== currentItem.id &&
        item.title.toLowerCase().includes(currentItem.title.toLowerCase().substring(0,5)) &&
        item.status !== 'pending'
    );
  };
  
  const handleStatusChange = async (itemId: number, newStatus: ItemStatus) => {
    await updateItemStatus(itemId, newStatus);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-2xl">
      <h1 className="text-3xl font-bold text-white mb-6">Admin Dashboard</h1>

      {/* Filter Buttons */}
      <div className="flex space-x-2 mb-6 border-b border-gray-700 pb-4 overflow-x-auto">
        {(['all', 'lost', 'found', 'pending', 'resolved', 'rejected'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm font-medium rounded-md flex-shrink-0 transition-colors duration-300 ${filter === f ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)} ({f === 'all' ? items.length : items.filter(i => i.status === f).length})
          </button>
        ))}
      </div>

      {/* Items Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {loading ? (
                <tr><td colSpan={4} className="text-center py-8 text-gray-400">Loading items...</td></tr>
            ) : filteredItems.map(item => {
                const duplicates = findDuplicates(item);
                return (
              <tr key={item.id} className="hover:bg-gray-700/50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full object-cover" src={item.image || 'https://picsum.photos/seed/default/200'} alt={item.title} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-100">{item.title}</div>
                      <div className="text-sm text-gray-400">{item.location}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-200 max-w-xs truncate">{item.description}</div>
                  <div className="text-sm text-gray-500">{new Date(item.datetime).toLocaleString()}</div>
                  {duplicates.length > 0 && <div className="text-sm text-orange-400 mt-1">Possible duplicate of: {duplicates.map(d => `#${d.id}`).join(', ')}</div>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.status === 'lost' ? 'bg-red-900 text-red-300' : 
                    item.status === 'found' ? 'bg-emerald-900 text-emerald-300' :
                    item.status === 'pending' ? 'bg-yellow-900 text-yellow-300' :
                    item.status === 'rejected' ? 'bg-red-900/50 text-red-400' :
                    'bg-gray-700 text-gray-300'
                    }`}>{item.status}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {(item.status === 'lost' || item.status === 'found') && (
                    <div className="flex space-x-2">
                       <button onClick={() => handleStatusChange(item.id, 'resolved')} className="text-blue-400 hover:text-blue-300 transition-colors">Resolve</button>
                       <button onClick={() => handleStatusChange(item.id, 'rejected')} className="text-red-400 hover:text-red-300 transition-colors">Reject</button>
                    </div>
                  )}
                </td>
              </tr>
            )})}
          </tbody>
        </table>
        {!loading && filteredItems.length === 0 && <p className="text-center text-gray-500 py-8">No items match the current filter.</p>}
      </div>
    </div>
  );
};

export default AdminDashboardPage;