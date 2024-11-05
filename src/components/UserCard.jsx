import React from 'react'
import { BASE_URL, DEFAULT_IMG } from '../utils/constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {
  const {_id, firstName, lastName, photourl, about, skills, age, gender } = user;
  const dispatch = useDispatch();
  const handleFeed = async (status,userId)=>{
      
    try{
      const res= await axios.post(BASE_URL+"/request/send/"+status + "/"+ userId,{},{
        withCredentials:true,
      });
      dispatch(removeFeed(userId));
    }
    catch(err){
      console.log(err.message);
    }
  }
  return (
    <div className=''>
      <div className="card bg-slate-800 font-medium text-white w-96 shadow-xl">
        <figure>
          <img
            src={photourl || DEFAULT_IMG}
            alt="User Photo" className='w-56 m-2'/>
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + (lastName || "")}</h2>
        {skills &&  <p className='pt-1'>{skills || ""}</p>}
    {  <p className='pt-1'>{ gender || ""}   {age || ""} </p>}
          <p className='pt-4'>{about}</p>
          <div className="card-actions justify-center m-2 my-6">
            <button className="btn btn-primary mx-2 items-center text-center justify-center" onClick={()=> {handleFeed ("ignored",_id) }}>Ignore</button>
            <button className="btn btn-secondary mx-2" onClick={()=> {handleFeed ("interested",_id) }}>Interested</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserCard