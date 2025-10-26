import React from 'react';
import { useData } from '../context/DataContext';

// This component displays global notifications (flash messages).
// It gets the message from the DataContext and displays it at the top of the screen.
// The message automatically disappears after a few seconds (logic in DataContext).
const FlashMessage: React.FC = () => {
  const { flashMessage } = useData();

  if (!flashMessage) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-down">
      {flashMessage}
    </div>
  );
};

export default FlashMessage;