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
    <div className='h-full'>
        <NavBar />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Body