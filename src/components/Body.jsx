import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import Landing from "./Landing";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { socket } = useAuthStore();
  const userData = useSelector((store) => store.user);
  const [theme, setTheme] = useState("light"); // Default to light mode

  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Save theme preference to localStorage
  };

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.add(savedTheme);
  }, []);

  // Update theme class on root element when `theme` changes
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  // Fetch user profile data
  const fetchData = async () => {
    if (userData) return; // Avoid re-fetching if user data already exists

    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if(err.status===401){
        return navigate('/login')
      }
      return navigate("/landing"); // Redirect to login on error
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
   
    fetchData();
  }, [userData, dispatch]);

  // Setup Socket.IO listeners
  useEffect(() => {
    if (!socket) return;

    socket.on("getOnlineUsers", (onlineUsers) => {
      console.log("Online users updated:", onlineUsers);
      useChatStore.setState({ onlineUsers });
    });

    return () => {
      socket.off("getOnlineUsers"); // Cleanup on unmount
    };
  }, [socket]);
    
  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <NavBar toggleTheme={toggleTheme} theme={theme} />
            <Outlet /> {/* Render dynamic content */}
      <Footer />
    </div>
  );
};

export default Body;
