import React, { useState, useEffect } from 'react';
import SideBar from './SideBar.jsx';
import ChatContainer from './ChatContainer.jsx';

const Chat = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Manage sidebar visibility
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024); // Check screen width

  // Handle screen size change to toggle sidebar visibility
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // Update if screen is mobile or large
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setIsSidebarVisible(true); // Always show sidebar on large screens
    }
  }, [isMobile]);

  return (
    <div className="flex h-screen">
      {/* Sidebar: only shown on small screens when a contact is selected */}
      <div className={`lg:w-1/3 w-full ${isSidebarVisible ? 'block' : 'hidden'}`}>
        <SideBar setIsSidebarVisible={setIsSidebarVisible} />
      </div>

      {/* Chat Container: Adjusts based on sidebar visibility */}
      <div className={`flex-1 overflow-auto ${isSidebarVisible ? 'lg:w-2/3 w-full' : 'w-full'}`}>
        <ChatContainer setIsSidebarVisible={setIsSidebarVisible} />
      </div>
    </div>
  );
};

export default Chat;
