import React, { useEffect, useState } from 'react';
import { useChatStore } from '../store/useChatStore';
import SidebarSkeleton from './SidebarSkeleton';
import { MessageCircleXIcon, MessageSquareDashed, MessageSquareDiff, MessageSquareText, Users } from 'lucide-react';
import { DEFAULT_IMG } from '../utils/constants';
import { useAuthStore } from '../store/useAuthStore';

const SideBar = ({ setIsSidebarVisible }) => {
  const { getUsers, users, selectedUser, setSelectedUser, isUserLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024); // Track screen size

  useEffect(() => {
    // Fetch users when component mounts
    getUsers();

    // Handle window resize to update screen size
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // Update screen size state
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [getUsers]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    if (isMobile) {
      setIsSidebarVisible(false); // Hide sidebar on small screens when contact is selected
    }
  };

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUserLoading) return <SidebarSkeleton />;

  return (
    <div className="h-full flex flex-col lg:w-80 w-full transition-all duration-200 border-r-0 shadow-xl border-base-300 dark:border-base-200 dark:shadow-2xl  mx-2 p-2">
      <aside className="h-full w-full flex flex-col">
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-base-300">
          
            <MessageSquareText className="size-8" />
            <span className="text-md font-medium">Chats</span>
        </div>

        {/* Show online only toggle */}
        <div className="mt-3 flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-lg checkbox-info checked:checkbox-primary"
            />
            <span className="text-md font-semibold">Show online only</span>
          </label>
        </div>

        {/* Contacts List */}
        <div className="overflow-y-auto w-full py-3">
          {Array.isArray(filteredUsers) &&
            filteredUsers.map((user) => (
              <button
                key={user._id}
                onClick={() => handleUserClick(user)}
                className={`w-full p-3 flex items-center gap-3 dark:hover:bg-base-100 hover:bg-slate-300 transition-colors ${
                  selectedUser?._id === user._id ? `dark:bg-base-300 bg-gray-100 dark:ring-1 dark:ring-base-300` : ''
                }`}
              >
                <div className="relative mx-auto lg:ml-1 lg:mr-4 ml-4 mr-4">
                  <img
                    src={user.photourl || DEFAULT_IMG}
                    alt={user.name}
                    className="size-12 object-cover rounded-full"
                  />
                  {onlineUsers.includes(user._id) && (
                    <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
                  )}
                </div>

                <div className="text-left min-w-0">
                  <div className="font-medium truncate">
                    {user.firstName + ' ' + user.lastName}
                  </div>
                  <div className="text-sm text-zinc-400">
                    {onlineUsers.includes(user._id) ? 'Online' : 'Offline'}
                  </div>
                </div>
              </button>
            ))}
          {filteredUsers.length === 0 && showOnlineOnly && (
            <div className="text-center text-zinc-500 py-4">No online users</div>
          )}
          {filteredUsers.length === 0 && !showOnlineOnly && (
            <div className="text-center text-zinc-500 py-4">No Connections</div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
