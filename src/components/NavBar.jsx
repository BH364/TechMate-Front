import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { ArrowBigLeft, Home, LogOutIcon, MenuIcon, MessageSquareIcon, MessageSquareTextIcon, SendToBack, User, UserPenIcon, UserPlus, Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import Tech from '../assets/Tech.png';
import axios from "axios";
import { BASE_URL, DEFAULT_IMG } from "../utils/constants";

const NavBar = ({ toggleTheme, theme }) => {
  const { disconnectSocket } = useAuthStore();
  const [visible, setVisible] = useState(false);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, {
        withCredentials: true,
      });
      dispatch(removeUser());
      disconnectSocket();
      navigate("/login");
    } catch (err) {
      navigate("/landing");
    }
  };
 

  return (
    <div className="navbar bg-[rgba(255, 255, 255, 1)] shadow-md">
      {/* Logo */}
      <div className="flex-1">
        <Link className="" to='/'>
          <img src={Tech} className="w-32" alt="Logo" />
        </Link>

      </div>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="btn btn-ghost text-sm mx-10 md:text-base hidden md:block"
      >
        {theme === "light" ? "🌙 Dark Mode" : "🌞 Light Mode"}
      </button>

      {/* Navbar links */}
      <div className="flex-none gap-2 mt-6">
        {!user ? (
          <div className="flex space-x-4">
            <Link to="/login" className="btn btn-primary">Login</Link>
          </div>
        ) : (
          <div className="flex">
            <ul className="hidden sm:flex gap-14">
              <li>
                <NavLink to='/chat' className="font-semibold flex flex-col items-center gap-1 hover:text-red-500">
              <div className="flex">
                <MessageSquareIcon />   <p>Chats</p>
                </div>
                  <hr className='w-2/4 border-none h-[1.5px] hidden' /></NavLink>
              </li>
              <li>
                <NavLink to='/requests' className="font-semibold flex flex-col items-center gap-1 hover:text-red-500">
                <div className="flex"> <UserPlus /><p>Requests</p></div>
             
                  <hr className='w-2/4 border-none h-[1.5px] hidden' />
                </NavLink>
              </li>
              <li>
                <NavLink to='/connections' className="font-semibold flex flex-col items-center gap-1 hover:text-red-500">
               <div className="flex"> <Users /> <p>Connections</p></div>
                
                  <hr className='w-2/4 border-none h-[1.5px] hidden' />
                </NavLink>

              </li>
            </ul>
            {/* <div className="form-control text-sm md:text-lg">
              Welcome, {user.firstName}

            </div> */}

            {/* User Avatar and Dropdown */}
            <div className="dropdown dropdown-end relative z-50 md:mx-5 sm:mx-0">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-12 rounded-full">
                  <img
                    alt="User Photo"
                    src={user.photourl || DEFAULT_IMG} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className={`menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 bg-white shadow-md dark:bg-base-200`}>

                <li>
                  <Link to="/profile" className="flex items-center space-x-2">
                    <UserPenIcon />
                    <span>Profile</span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={toggleTheme}
                    className="flex items-center space-x-2 md:hidden dark:bg-base-200"
                  >
                    {theme === "light" ? "🌙 Dark Mode" : "🌞 Light Mode"}
                  </button>
                </li>
              
                <li>
                  <button onClick={handleLogout} className="flex items-center space-x-2">
                    <LogOutIcon />
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
            <p onClick={() => setVisible(true)} className={`w-5 ${visible ? "hidden" : "block"} cursor-pointer mx-2 my-2 sm:hidden`}><MenuIcon /></p>



            <div className={`absolute z-50 top-0 right-0 bottom-0 overflow-hidden bg-black transition-all ${visible ? 'w-full' : 'w-0'}`} >
              <div className='flex flex-col text-current'>
                <div onClick={() => { setVisible(false) }} className='flex items-center gap-4 p-3 cursor-pointer'>
                  <ArrowBigLeft />
                  <p>Back</p>
                </div>
                <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border flex flex-row gap-2' to='/'><Home />HOME</NavLink>
                <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border flex flex-row gap-2' to='/chat'><MessageSquareTextIcon />Chats</NavLink>
                <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border flex flex-row gap-2' to='/connections'><Users />Connections</NavLink>
                <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border flex flex-row gap-2' to='/requests'><UserPlus />Requests</NavLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

  );
};

export default NavBar;
