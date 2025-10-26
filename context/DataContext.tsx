import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { Item, Message, ItemStatus } from '../types';
import { MOCK_ITEMS, MOCK_MESSAGES } from '../data/mockData';

// The DataContext provides a global state for all items and messages.
// It centralizes data management, making it easier to update and access
// data from anywhere in the application.

interface DataContextType {
  items: Item[];
  messages: Message[];
  loading: boolean;
  addItem: (item: Omit<Item, 'id'>) => Promise<void>;
  updateItemStatus: (itemId: number, status: ItemStatus) => Promise<void>;
  sendMessage: (message: Omit<Message, 'id' | 'timestamp'>) => Promise<void>;
  getConversations: (userId: number) => any[];
  getItemById: (itemId: number) => Item | undefined;
  setFlashMessage: (message: string | null) => void;
  flashMessage: string | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [flashMessage, setFlashMessageState] = useState<string | null>(null);

  // Simulate fetching initial data from an API when the app loads.
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network latency
      setItems(MOCK_ITEMS);
      setMessages(MOCK_MESSAGES);
      setLoading(false);
    };
    fetchInitialData();
  }, []);

  const setFlashMessage = (message: string | null) => {
    setFlashMessageState(message);
    if (message) {
      setTimeout(() => setFlashMessageState(null), 3000); // Hide after 3 seconds
    }
  };

  const addItem = async (itemData: Omit<Item, 'id'>) => {
    await new Promise(resolve => setTimeout(resolve, 600)); // Simulate API call
    const newItem: Item = {
      ...itemData,
      id: Date.now(), // Use timestamp for a simple unique ID
    };
    setItems(prevItems => [newItem, ...prevItems]);
  };

  const updateItemStatus = async (itemId: number, status: ItemStatus) => {
    await new Promise(resolve => setTimeout(resolve, 400)); // Simulate API call
    setItems(prevItems =>
      prevItems.map(item => (item.id === itemId ? { ...item, status } : item))
    );
  };

  const sendMessage = async (messageData: Omit<Message, 'id' | 'timestamp'>) => {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API call
    const newMessage: Message = {
      ...messageData,
      id: Date.now(),
      timestamp: new Date().toISOString(),
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  const getItemById = useCallback((itemId: number) => {
    return items.find(item => item.id === itemId);
  }, [items]);
  
  const getConversations = (userId: number) => {
    const conversations: { [key: string]: { item: Item | undefined, otherUser: number, lastMessage: Message } } = {};

    messages
      .filter(msg => msg.senderId === userId || msg.receiverId === userId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .forEach(msg => {
        const otherUserId = msg.senderId === userId ? msg.receiverId : msg.senderId;
        const key = `${msg.itemId}-${otherUserId}`;
        if (!conversations[key]) {
          conversations[key] = {
            item: getItemById(msg.itemId),
            otherUser: otherUserId,
            lastMessage: msg,
          };
        }
      });
      return Object.values(conversations);
  };

  return (
    <DataContext.Provider value={{ items, messages, loading, addItem, updateItemStatus, sendMessage, getItemById, getConversations, flashMessage, setFlashMessage }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook for easy access to data context
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};