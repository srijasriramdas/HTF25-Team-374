
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { MOCK_USERS } from '../data/mockData';

// This page acts as the user's inbox, showing a summary of all their conversations.
const MessagesPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { getConversations } = useData();
  const navigate = useNavigate();

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const conversations = getConversations(currentUser.id);

  const getUserName = (id: number) => MOCK_USERS.find(u => u.id === id)?.name || 'Unknown User';

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">My Messages</h1>
      {conversations.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {conversations.map(({ item, otherUser, lastMessage }, index) => (
            <li 
              key={`${item?.id}-${otherUser}-${index}`} 
              className="p-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => navigate(`/item/${item.id}`)}
            >
              <div className="flex space-x-4">
                <img className="h-20 w-20 rounded-md object-cover" src={item?.image || 'https://picsum.photos/200'} alt={item?.title} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-blue-600">
                      Conversation about "{item?.title}" with {getUserName(otherUser)}
                    </p>
                    <p className="text-sm text-gray-500">{new Date(lastMessage.timestamp).toLocaleDateString()}</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-600 truncate">
                    <span className="font-semibold">{lastMessage.senderId === currentUser.id ? 'You' : getUserName(otherUser)}:</span> {lastMessage.content}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">You have no messages yet.</p>
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
