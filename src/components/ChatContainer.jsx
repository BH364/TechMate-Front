import { useEffect, useRef } from 'react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './MessageSkeleton';
import { formateMessageTime } from '../utils/utils.js';
import { DEFAULT_IMG } from '../utils/constants.js';
import { X } from 'lucide-react'; // Back button icon
import { FiMessageCircle } from 'react-icons/fi';
import Prism from 'prismjs'; // Syntax highlighting library
import 'prismjs/themes/prism.css'; // Include Prism CSS
import emoji from 'emoji-dictionary'; 
const ChatContainer = ({ setIsSidebarVisible }) => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser && selectedUser._id) {
      getMessages(selectedUser._id); // Fetch previous messages
      subscribeToMessages(); // Subscribe to real-time message updates
    }

    return () => unsubscribeFromMessages(); // Unsubscribe when component unmounts or selected user changes
  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages.length > 0) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    // Highlight code snippets whenever messages change
    Prism.highlightAll();
  }, [messages]);
  const renderEmojis = (text) => {
    
      if (typeof text !== 'string') {
        return text || ''; // Return as is if it's not a string
      }
    
     
  const replacedText = text.replace(/:[a-zA-Z0-9_]+:/g, (match) => {
    const emojiName = match.slice(1, -1); // Remove the colons
    const emojiCharacter = emoji.getUnicode(emojiName);
    return emojiCharacter || match; // Replace with emoji or leave the original text if no match
  });

  return replacedText || text;

   
  };

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  if (!selectedUser) {
    return (
      <div className="flex-1 flex flex-col mr-10 my-10 justify-center items-center text-center p-6 transition-all opacity-90">
        <FiMessageCircle className={`text-6xl text-yellow-600 dark:text-pink-600 mb-4 animate-pulse mt-10`} />
        <h2 className={`text-xl font-semibold text-yellow-400 dark:text-pink-400 mb-4`}>
          No user selected
        </h2>
        <p className="text-yellow-500 dark:text-pink-500">
          Select a user to start chatting and continue the conversation.
        </p>
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-full my-6"
          onClick={() => setIsSidebarVisible(true)} // Show sidebar when no user is selected
        >
          Select User
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-auto">
       <ChatHeader setIsSidebarVisible={setIsSidebarVisible} />
        <div className="flex-1 overflow-y-auto p-1 space-y-4 min-h-80">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div
              key={message._id}
              className={`chat ${message.senderId === authUser._id ? 'chat-end' : 'chat-start'}`}
              ref={messageEndRef}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      message.senderId === authUser._id
                        ? authUser.profilePic || DEFAULT_IMG
                        : selectedUser.profilePic || DEFAULT_IMG
                    }
                    alt="profile pic"
                  />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {formateMessageTime(message.createdAt)}
                </time>
              </div>
              <div className="chat-bubble flex flex-col">
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="rounded-lg max-w-[500px] object-cover max-h-72 mb-2"
                  />
                )}
                <div className='text-white'>{renderEmojis(message.text)}</div>
                {message.codeSnippet && (
                  <pre className="whitespace-pre-wrap break-words p-2 bg-gray-800 text-white rounded-md overflow-auto max-h-72">
                    <code className={`language-${message.language || 'javascript'}`}>
                      {message.codeSnippet}
                    </code>
                  </pre>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className='min-h-[500px] sm:min-h-[940px] md:min-h-[900px] lg:min-h-[300px] text-gray-500 text-center'>
            No messages yet. Start the conversation!
          </div>
        )}
      </div>
       <MessageInput />
    </div>
  );
};

export default ChatContainer;
