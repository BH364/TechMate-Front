import React from 'react'
import { useState } from 'react';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice';
import { BASE_URL}  from '../utils/constants';
const Login = () => {
    const [emailId,setEmailId]=useState("balaga@harika.com");
    const [password,setPassword]=useState("Harika@123");
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const [error,setError] = useState("");

    const handleLogin= async ()=>{
    try{

        const res=await axios.post(BASE_URL+"/login",{
            emailId,
            password
        },{
            withCredentials:true
        })
        dispatch(addUser(res.data));
        navigate("/");
    }

catch(err){
     setError(err?.response?.data || "Something went wrong");
    console.log(err);
}
    }
    return (
        <div className='flex justify-center my-10'>
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center text-blue-400 font-extrabold">Login</h2>
                    <div className=''>
                        <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text text-blue-400 font-medium">Email ID :</span>
                            </div>
                            <input 
                            type="text" 
                            placeholder="Enter your email Id.." 
                            value={emailId}
                            className="input input-bordered w-full max-w-xs" 
                            onChange={(e)=>{ setEmailId(e.target.value)}}/>
                           
                        </label>
                        <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text text-blue-400 font-medium">Password :</span>
                            </div>
                            <input 
                            type="text" 
                            placeholder="Enter your password.." 
                            value={password}
                            className="input input-bordered w-full max-w-xs" 
                            onChange={(e)=>{ setPassword(e.target.value)}}/>
                           
                        </label>
                    </div>
                    <p className='text-red-500'>{error}</p>
                    <div className="card-actions justify-center m-2">
                        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login