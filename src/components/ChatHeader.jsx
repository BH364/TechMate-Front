import React from 'react'
import { useChatStore } from '../store/useChatStore'
import { DEFAULT_IMG } from '../utils/constants';
import { X } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const ChatHeader = ({setIsSidebarVisible}) => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  // Fallback when selectedUser is not available
  if (!selectedUser) {
    return (
      <div className="p-2.5 border-b border-base-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="size-10 rounded-full relative">
                <img src={DEFAULT_IMG} alt="Default" />
              </div>
            </div>
            <div>
              <h3 className="font-medium">No user selected</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2.5 border-b shadow-2xl dark:border-base-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser.photourl || DEFAULT_IMG}
                alt={selectedUser.firstName || 'User'}
              />
            </div>
          </div>
          <div>
            <h3 className="font-medium">
              {selectedUser.firstName || 'Unnamed'} {selectedUser.lastName || ''}
            </h3>
            <p className="text-sm text-base-content/70">
              {Array.isArray(onlineUsers) && onlineUsers.includes(selectedUser?._id)
                ? 'Online'
                : 'Offline'}
            </p>
          </div>
        </div>
        <button onClick={() =>{ setSelectedUser(null);
                   setIsSidebarVisible(true)

        }}>
          <X size={24}/>
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
