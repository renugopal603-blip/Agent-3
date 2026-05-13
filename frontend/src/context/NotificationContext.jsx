import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Welcome to AgentHub!',
      message: 'Your account is ready. Start exploring your dashboard.',
      time: 'Just now',
      isRead: false,
      type: 'info'
    },
    {
      id: 2,
      title: 'KYC Status',
      message: 'Please complete your KYC to unlock all features.',
      time: '2 hours ago',
      isRead: false,
      type: 'warning'
    }
  ]);

  useEffect(() => {
    const syncGlobalNotifications = () => {
      const globalNotes = JSON.parse(localStorage.getItem('globalNotifications') || '[]');
      if (globalNotes.length > 0) {
        // Filter out notifications already in our local state to avoid duplicates
        setNotifications(prev => {
          const prevIds = new Set(prev.map(n => n.id));
          const newNotes = globalNotes.filter(n => !prevIds.has(n.id));
          if (newNotes.length === 0) return prev;
          return [...newNotes, ...prev];
        });
      }
    };

    syncGlobalNotifications();
    window.addEventListener('storage', (e) => {
      if (e.key === 'globalNotifications') {
        syncGlobalNotifications();
      }
    });
    return () => window.removeEventListener('storage', syncGlobalNotifications);
  }, []);

  const addNotification = (notification) => {
    const newNotification = {
      id: notification.id || Date.now(),
      isRead: false,
      time: notification.time || 'Just now',
      ...notification
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const pushGlobalNotification = (notification) => {
    const newNote = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      isRead: false,
      time: 'Just now',
      ...notification
    };
    
    // Add locally
    addNotification(newNote);
    
    // Sync to localStorage
    const globalNotes = JSON.parse(localStorage.getItem('globalNotifications') || '[]');
    localStorage.setItem('globalNotifications', JSON.stringify([newNote, ...globalNotes.slice(0, 49)])); // Keep last 50
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      pushGlobalNotification,
      markAsRead,
      markAllAsRead,
      clearNotifications,
      unreadCount
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
