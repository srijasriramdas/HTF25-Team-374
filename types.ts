
// types.ts: This file centralizes all the data structure definitions for our app.
// Using TypeScript types helps prevent common errors by ensuring that data
// (like users, items, messages) always has the expected shape.

export type ItemStatus = 'lost' | 'found' | 'pending' | 'rejected' | 'resolved';

export interface Item {
  id: number;
  title: string;
  description: string;
  image?: string; // base64 string
  location: string;
  datetime: string;
  status: ItemStatus;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string; // Should not be stored long-term in a real app
}

export interface Admin {
  id: number;
  email: string;
  password?: string;
}

export interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  itemId: number;
  content: string;
  timestamp: string;
}

export interface Conversation {
  itemId: number;
  otherUserId: number;
  messages: Message[];
}
