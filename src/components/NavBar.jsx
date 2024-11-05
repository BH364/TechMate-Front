import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL, DEFAULT_IMG } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
const NavBar = ()=>{
   
    const user=useSelector((store)=>store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout =async()=>{
      try{
        await axios.post(BASE_URL + "/logout",{},{
               withCredentials:true,
        })
        dispatch(removeUser());
        navigate('/login');


      }
      catch(err){
         navigate('/error');
      }
    }
    return(
        <div className="navbar bg-[rgba(255, 255, 255, 1)]">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-[#f62121] font-bold font-serif italic text-xl md:text-2xl  lg:text-3xl">👩‍💻TechMate</Link>
        </div>
        {!user && (<div><Link to='/login' className="btn btn-primary mx-2">Login </Link> </div>) }

        { user && 
        <div className="flex-none gap-2">
         <div className="form-control text-[14px] md:text-[16px]">Welcome , {user.firstName} 
          </div>
        
          <div className="dropdown dropdown-end md:mx-5 sm:mx-0">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User Photo"
                  src={user.photourl ||  DEFAULT_IMG }/>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to='/connections'>Connections</Link>
                </li>
                <li>
                <Link to='/requests'>Requests</Link>
                </li>
              <li><a onClick={handleLogout}>Logout</a></li>
            </ul>
          </div>
        </div>
}
      </div>
    );
}
export default NavBar;