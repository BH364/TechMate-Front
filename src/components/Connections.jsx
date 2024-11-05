import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';
import ConnectionCard from './ConnectionCard';



const Connections = () => {
   const connections = useSelector((store) => store.connection);
   const dispatch=useDispatch();
   const fetchConnections = async ()=>{

    try{
    const res=await axios.get(BASE_URL+"/user/requests/connections",{
    withCredentials: true,
    });
    
      dispatch(addConnection(res?.data?.data))

   }
   catch(err){
       console.log(err.response?.data?.message)
   }
}
    useEffect(()=>{
        fetchConnections();
    },[]);
  if(!connections) return;
  if(connections.length==0){
    return (
        <h1 className='text-xl md:text-2xl lg:text-4xl font-bold text-center my-10 mb-96'>No connections found ☹️🔍</h1>
    )
  }
  return (
    <div className='text-center mb-52 mt-10'>
        <h1 className='md:text-3xl text-2xl text-blue-400'>Connections</h1>
        <div className='mx-auto lg:w-1/2 md:w-2/3 my-4'>
        {connections.map((connection)=>{
            return (
                <ConnectionCard key={connection._id} user={connection}/>
            
            )
            })}
        </div>
        </div>
  )
}

export default Connections;