import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { Item, ItemStatus } from '../types';

// This is the control panel for the admin. It allows them to moderate content.
const AdminDashboardPage: React.FC = () => {
  const { items, updateItemStatus, loading } = useData();
  const [filter, setFilter] = useState<ItemStatus | 'all'>('pending');

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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      {/* Filter Buttons */}
      <div className="flex space-x-2 mb-6 border-b pb-4 overflow-x-auto">
        {(['pending', 'lost', 'found', 'resolved', 'rejected', 'all'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm font-medium rounded-md flex-shrink-0 ${filter === f ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)} ({f === 'all' ? items.length : items.filter(i => i.status === f).length})
          </button>
        ))}
      </div>

      {/* Items Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
                <tr><td colSpan={4} className="text-center py-8 text-gray-500">Loading items...</td></tr>
            ) : filteredItems.map(item => {
                const duplicates = findDuplicates(item);
                return (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full object-cover" src={item.image || 'https://picsum.photos/seed/default/200'} alt={item.title} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{item.title}</div>
                      <div className="text-sm text-gray-500">{item.location}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-xs truncate">{item.description}</div>
                  <div className="text-sm text-gray-500">{new Date(item.datetime).toLocaleString()}</div>
                  {duplicates.length > 0 && <div className="text-sm text-orange-500 mt-1">Possible duplicate of: {duplicates.map(d => `#${d.id}`).join(', ')}</div>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    item.status === 'lost' ? 'bg-red-100 text-red-800' : 
                    item.status === 'found' ? 'bg-green-100 text-green-800' :
                    item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                    }`}>{item.status}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {item.status === 'pending' && (
                    <div className="flex space-x-2">
                      <button onClick={() => handleStatusChange(item.id, 'found')} className="text-green-600 hover:text-green-900">Approve (Found)</button>
                       <button onClick={() => handleStatusChange(item.id, 'lost')} className="text-green-600 hover:text-green-900">Approve (Lost)</button>
                      <button onClick={() => handleStatusChange(item.id, 'rejected')} className="text-red-600 hover:text-red-900">Reject</button>
                    </div>
                  )}
                   {item.status !== 'pending' && item.status !== 'resolved' && (
                    <button onClick={() => handleStatusChange(item.id, 'resolved')} className="text-blue-600 hover:text-blue-900">Mark as Resolved</button>
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