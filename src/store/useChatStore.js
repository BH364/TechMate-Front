import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthStore } from "./useAuthStore";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:7777" : "/";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  // Fetch all users for chat
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axios.get(`${BASE_URL}/messages/users`, { withCredentials: true });
      set({ users: res.data.data });
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error(error.response?.data || "Failed to fetch users.");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  // Fetch messages for the selected user
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axios.get(`${BASE_URL}/messages/${userId}`, { withCredentials: true });
      set({ messages: res.data.messages });
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error(error.response?.data || "Failed to fetch messages.");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // Send a message to the selected user
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axios.post(
        `${BASE_URL}/messages/send/${selectedUser._id}`,
        messageData,
        { withCredentials: true }
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(error.response?.data || "Failed to send message.");
    }
  },

  // Subscribe to new messages via Socket.IO
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) return; // Ensure socket is initialized

    // Unsubscribe from previous "newMessage" event to avoid duplicates

    socket.on("newMessage", (newMessage) => {
       if (newMessage.senderId === selectedUser._id) {
        set({ messages: [...get().messages, newMessage] });
       }
    });
  },

  // Subscribe to online users via Socket.IO

  // Unsubscribe from new messages and online users
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return; // Ensure socket is initialized

    socket.off("newMessage");
  },

  // Set the selected user for chat
  setSelectedUser: (selectedUser) => {
    set({ selectedUser });
    // Immediately subscribe to messages when a user is selected
    get().subscribeToMessages();
  },
}));
