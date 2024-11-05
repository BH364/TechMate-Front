import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';
const Feed = () => {
  const  feed= useSelector((store)=>store.feed);
  
  const navigate= useNavigate();
  const dispatch =useDispatch();
  const fetchFeed = async () =>{
    if(feed) return ;
    
    
    try{
     const res= await axios.get(BASE_URL+"/user/feed",{
      withCredentials:true,
     })
     dispatch(addFeed(res.data));

    }
    catch(err){
      navigate('/error');
    }
  }

  useEffect(()=>{
      fetchFeed();
  },[]);
  if(!feed) return;
  if(feed.length == 0){
    return (
      <h1 className='text-xl md:text-2xl lg:text-4xl font-bold text-center mt-10 mb-96'>No new users found🤕</h1>
    )
  }
  return (
    feed && (
     <div className='flex justify-center my-8 md:my-10 mb-48'>
     <UserCard user={feed[0]} />
    </div>

    )


  )
}

export default Feed