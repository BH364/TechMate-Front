import React, { useEffect } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const userData= useSelector((store)=>store.user);
  const fetchData = async()=>{
    if(userData) return ;

    try{
      const res=await axios.get(BASE_URL+"/profile/view",{
        withCredentials:true,
      });
      dispatch(addUser(res.data));

    }
    catch(err){
      if(err.status===401){
        return navigate('/login');
      }
      return navigate('/error')

    }
  }
  useEffect(()=>{
    fetchData();
  },[]);
  return (
    <div className='relative h-full'>
    <video className="fixed top-0 left-0 w-full h-full object-cover z-0" autoPlay loop muted>
      <source src="https://videos.pexels.com/video-files/9667568/9667568-hd_1920_1080_25fps.mp4" type="video/mp4" />
    </video>
    <div className="relative z-10 font-bold text-white">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  </div>
  )
}

export default Body