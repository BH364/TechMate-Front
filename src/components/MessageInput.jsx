import { Image, Send, X, Code ,Smile} from 'lucide-react';
import React, { useRef, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css'; // Theme
import 'prismjs/components/prism-clike';  // Dependency for cpp
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import { useChatStore } from '../store/useChatStore.js';
import EmojiPicker from 'emoji-picker-react'; 
const MessageInput = () => {
  const [text, setText] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isCodeMode, setIsCodeMode] = useState(false);
  const [language, setLanguage] = useState('javascript');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { sendMessage, selectedUser } = useChatStore();

  useEffect(() => {
    if (isCodeMode && text) {
      try {
        if (Prism.languages[language]) {
          Prism.highlightAll();
        } else {
          console.error(`Prism language ${language} not found`);
          toast.error(`Language ${language} is not supported by Prism.js.`);
        }
      } catch (error) {
        console.error('Error highlighting code with Prism.js:', error);
        toast.error('Error highlighting code. Please check your syntax.');
      }
    }
  }, [text, isCodeMode, language]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/') || file.size > 5 * 1024 * 1024) {
      toast.error('Invalid image file (only images under 5MB allowed)');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setImageFile(file);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };


  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imageFile) {
      toast.error('Message content is required!');
      return;
    }
  
    if (!selectedUser) {
      toast.error('No user selected for the chat.');
      return;
    }
  
    const messageData = new FormData();
    if (imageFile) {
      messageData.append('image', imageFile);
    }
    if (isCodeMode) {
      messageData.append('codeSnippet', text.trim());
      messageData.append('codeLanguage', language);
    } else {
      messageData.append('text', text.trim());
    }
  
 
    const formDataObject = {};
    for (let [key, value] of messageData.entries()) {
      formDataObject[key] = value instanceof File ? value.name : value;
    }
    try {
      await sendMessage(formDataObject);
      toast.success('Message sent successfully!');
      setText('');
      setImagePreview(null);
      setImageFile(null);
      setIsCodeMode(false);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message.');
    }
  };
  const handleEmojiSelect = (emoji) => {
    setText(text + emoji.emoji); // Append the selected emoji to the text
    setShowEmojiPicker(false);  // Close the emoji picker after selection
  };

  return (
    <div className="p-4 w-full">
      <form
        onSubmit={handleSendMessage}
        className="flex flex-col gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
      >
        {imagePreview && (
          <div className="relative w-full max-w-md mx-auto">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => {
                setImagePreview(null);
                setImageFile(null);
              }}
              className="absolute top-2 right-2 bg-gray-100 rounded-full p-1 hover:bg-gray-300"
            >
              <X size={20} />
            </button>
          </div>
        )}

        {isCodeMode && text && (
          <pre className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-x-auto">
            <code className={`language-${language}`}>{text}</code>
          </pre>
        )}

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsCodeMode((prev) => !prev)}
            className={`p-2 rounded-md ${isCodeMode ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          >
            <Code size={20} />
          </button>

          {isCodeMode && (
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="p-2 border rounded-md text-white"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>
          )}

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={isCodeMode ? 'Write your code...' : 'Type a message...'}
            className="flex-1 text-white p-2 border rounded-md resize-none overflow-auto focus:outline-none"
            style={{ height: 'auto' }}
          />
               <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 rounded-md"
          >
            <Smile size={20} />
          </button>

          {showEmojiPicker && (
            <div className="absolute bottom-16 z-10">
              <EmojiPicker onEmojiClick={handleEmojiSelect} />
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            hidden
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded-md"
          >
            {isUploading ? 'Uploading...' : <Image size={20} />}
          </button>

          <button
            type="submit"
            disabled={!text.trim() && !imageFile}
            className="p-2 rounded-md bg-blue-500 text-white"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
