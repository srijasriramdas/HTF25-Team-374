
import { User, Admin, Item, Message } from '../types';

// In a real application, this data would come from a backend server and a database.
// For this frontend-only prototype, we're using hardcoded arrays to simulate that data.
// This allows us to build and test the UI without a backend.

export const MOCK_USERS: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', password: 'password123' },
  { id: 2, name: 'Bob', email: 'bob@example.com', password: 'password123' },
];

export const MOCK_ADMIN: Admin = { id: 1, email: 'admin@example.com', password: 'adminpassword' };

export const MOCK_ITEMS: Item[] = [
  {
    id: 1,
    title: 'Black Leather Wallet',
    description: 'A standard black leather wallet containing various cards. Found near the library entrance.',
    image: 'https://picsum.photos/seed/wallet/400/300',
    location: 'Library Entrance',
    datetime: '2024-07-20T14:30:00Z',
    status: 'found',
    userId: 2,
  },
  {
    id: 2,
    title: 'iPhone 13 with Blue Case',
    description: 'Lost my iPhone 13, it has a cracked screen protector and a navy blue case.',
    image: 'https://picsum.photos/seed/iphone/400/300',
    location: 'Campus Cafeteria',
    datetime: '2024-07-21T12:00:00Z',
    status: 'lost',
    userId: 1,
  },
  {
    id: 3,
    title: 'University Keychain',
    description: 'A set of keys on a keychain with the university logo. Found on the main lawn.',
    image: 'https://picsum.photos/seed/keys/400/300',
    location: 'Main Lawn',
    datetime: '2024-07-22T09:00:00Z',
    status: 'found',
    userId: 1,
  },
  {
    id: 4,
    title: 'Red Water Bottle',
    description: 'A large red hydroflask-style water bottle, covered in stickers. Left it in the gym.',
    image: 'https://picsum.photos/seed/bottle/400/300',
    location: 'Gymnasium',
    datetime: '2024-07-22T18:00:00Z',
    status: 'lost',
    userId: 2,
  },
  {
    id: 5,
    title: 'Calculus Textbook',
    description: 'A heavy calculus textbook, looks brand new. Submitted for review.',
    image: 'https://picsum.photos/seed/book/400/300',
    location: 'Lecture Hall 3',
    datetime: '2024-07-23T11:00:00Z',
    status: 'pending',
    userId: 1,
  },
];

export const MOCK_MESSAGES: Message[] = [
    {
        id: 1,
        senderId: 1,
        receiverId: 2,
        itemId: 1,
        content: "Hi, I think that's my wallet you found!",
        timestamp: "2024-07-21T10:00:00Z"
    },
    {
        id: 2,
        senderId: 2,
        receiverId: 1,
        itemId: 1,
        content: "Great! Can you describe one of the cards inside to confirm?",
        timestamp: "2024-07-21T10:05:00Z"
    }
];
