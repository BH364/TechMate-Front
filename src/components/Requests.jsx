import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants';
import { addRequest } from '../utils/requestSlice';
import RequestCard from './RequestCard';

const Requests = () => {
  const requests=useSelector((store)=>store.requests);
  const dispatch = useDispatch();
  const fetchRequests = async ()=>{
    try{
       const res = await axios.get(BASE_URL+"/user/requests/recieved",{
        withCredentials:true,
       });
       dispatch(addRequest(res?.data?.data));
       
    }
    catch(err){
      console.log(err.message)

    }
  }
    

  useEffect(()=>{
     fetchRequests();
  },[])
  
  if(!requests) return;
  if(requests.length==0) return (
    <div>
      <h1 className='text-4xl font-bold text-center my-10'>No requests found🔍☹️</h1>
    </div>
  );

  return (
    <div className='text-center h-full mb-20 mt-10'>
    <h1 className='text-3xl text-blue-400'>Requests</h1>
    <div className='mx-auto w-1/2 my-4'>
          {requests.map((request)=>{
            return ( <RequestCard key={request._id} user={request}/> )})}
       </div>
       </div>
 
  )
}

export default Requests