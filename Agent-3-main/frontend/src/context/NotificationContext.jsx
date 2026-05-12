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

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      isRead: false,
      time: 'Just now',
      ...notification
    };
    setNotifications(prev => [newNotification, ...prev]);
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
