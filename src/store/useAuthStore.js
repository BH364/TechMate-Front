import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { BASE_URL } from "../utils/constants";

// const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:7777" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  // Check authentication status
  checkAuth: async () => {
    try {
      const res = await axios.get(`${BASE_URL}/auth/check`, {
        withCredentials: true,
      });

      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.error("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // User signup
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axios.post(`${BASE_URL}/signup`, data, {
        withCredentials: true,
      });

      set({ authUser: res.data.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.response?.data || "Signup failed. Please try again.");
    } finally {
      set({ isSigningUp: false });
    }
  },

  // User login
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axios.post(`${BASE_URL}/login`, data, {
        withCredentials: true,
      });

      set({ authUser: res.data.data });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data || "Login failed. Please try again.");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // User logout
  logout: async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.response?.data || "Logout failed. Please try again.");
    }
  },

  // Update profile
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axios.put(`${BASE_URL}/profile`, data, {
        withCredentials: true,
      });

      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Update profile error:", error);
      toast.error(error.response?.data || "Failed to update profile.");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  // Connect to Socket.IO
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: { userId: authUser._id },
      withCredentials: true,
    });
     socket.connect()
    set({ socket:socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });
  },

  // Disconnect from Socket.IO
  disconnectSocket: () => {
    const socket = get().socket;
    if (socket?.connected) socket.disconnect();
  },
}));
