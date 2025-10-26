import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Item, Message, User } from '../types';
import { MOCK_USERS } from '../data/mockData'; // In a real app, you'd fetch user data

// This page shows all details for a single item. It also handles the
// messaging logic between the current user and the item's poster.
const ItemDetailPage: React.FC = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { getItemById, messages, sendMessage, loading } = useData();
  const { currentUser } = useAuth();
  
  const [item, setItem] = useState<Item | null>(null);
  const [itemOwner, setItemOwner] = useState<User | null>(null);
  const [conversation, setConversation] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Effect to load item data and conversation when the component mounts or itemId changes.
  useEffect(() => {
    if (loading) return; // Wait for initial data to be fetched

    const id = Number(itemId);
    if (isNaN(id)) {
      navigate('/');
      return;
    }
    const foundItem = getItemById(id);
    if (foundItem) {
      setItem(foundItem);
      // Find the user who posted the item (from mock data for this example)
      const owner = MOCK_USERS.find(u => u.id === foundItem.userId);
      setItemOwner(owner || null);

      // Filter messages for this item and between the current user and the owner
      if (currentUser && owner) {
        const relevantMessages = messages.filter(
          msg => msg.itemId === id &&
          ((msg.senderId === currentUser.id && msg.receiverId === owner.id) ||
           (msg.senderId === owner.id && msg.receiverId === currentUser.id))
        ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        setConversation(relevantMessages);
      }
    } else {
      navigate('/404'); // Or a "not found" page
    }
  }, [itemId, getItemById, navigate, messages, currentUser, loading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUser || !itemOwner || isSending) return;

    setIsSending(true);
    await sendMessage({
      senderId: currentUser.id,
      receiverId: itemOwner.id,
      itemId: item!.id,
      content: newMessage,
    });
    setNewMessage('');
    setIsSending(false);
  };

  if (loading || !item || !itemOwner) {
    return <div className="text-center p-10">Loading item details...</div>;
  }
  
  const isMyItem = currentUser?.id === item.userId;

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
            {/* Item Info Column */}
            <div>
                <img src={item.image} alt={item.title} className="w-full h-80 object-cover rounded-lg mb-4" />
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.title}</h1>
                <span className={`capitalize px-3 py-1 text-sm font-semibold rounded-full ${item.status === 'lost' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {item.status}
                </span>
                <div className="mt-6 space-y-4 text-gray-700">
                    <p><strong className="font-semibold">Description:</strong> {item.description}</p>
                    <p><strong className="font-semibold">Location:</strong> {item.location}</p>
                    <p><strong className="font-semibold">Date:</strong> {new Date(item.datetime).toLocaleString()}</p>
                    <p><strong className="font-semibold">Posted by:</strong> {itemOwner.name}</p>
                </div>
            </div>

            {/* Messaging Column */}
            <div>
                <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
                    {isMyItem ? 'Messages about your item' : `Contact ${itemOwner.name}`}
                </h2>
                {!currentUser ? (
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md">
                        <p>You must be <a href="#/login" className="font-bold underline">logged in</a> to send a message.</p>
                    </div>
                ) : isMyItem ? (
                     <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-md">
                        <p>This is your item. You can view messages from other users here.</p>
                    </div>
                ) : (
                    <div className="h-96 bg-gray-50 p-4 rounded-lg flex flex-col">
                        <div className="flex-grow overflow-y-auto mb-4 space-y-4">
                            {conversation.map(msg => (
                                <div key={msg.id} className={`flex ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.senderId === currentUser.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                        <p>{msg.content}</p>
                                        <p className="text-xs opacity-75 mt-1">{new Date(msg.timestamp).toLocaleTimeString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handleSendMessage}>
                            <div className="flex">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-grow border border-gray-300 rounded-l-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                                    disabled={isSending}
                                />
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 disabled:bg-blue-300" disabled={isSending}>
                                    {isSending ? '...' : 'Send'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default ItemDetailPage;