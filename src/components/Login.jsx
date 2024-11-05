import React from 'react'
import { useState } from 'react';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice';
import { BASE_URL}  from '../utils/constants';
const Login = () => {
    const [emailId,setEmailId]=useState("");
    const [password,setPassword]=useState("");
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName]=useState("");
    const [isLogin,setLogin]= useState(true);

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
}
    }

    const handleSign =async ()=>{
        try{
            const res= await axios.post(BASE_URL + '/signup',{
                firstName,lastName,password,emailId
            },
        {
            withCredentials:true
        });
            dispatch(addUser(res.data.data));
            navigate("/profile")
        }
        catch (err){
               setError(err?.response?.data || "Something went wrong");
        }
    }
    return (
        <div className="flex justify-center bg-fixed bg-[url('https://videos.pexels.com/video-files/9667568/9667568-hd_1920_1080_25fps.mp4')]">
            <div className="card my-5 bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center text-blue-400 font-extrabold">{isLogin ? "Login" : "Sign Up"}</h2>
                   {!isLogin && <div className=''>
                        <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text text-blue-400 font-medium">First Name :</span>
                            </div>
                            <input 
                            type="text" 
                            placeholder="Enter your First Name.." 
                            value={firstName}
                            className="input input-bordered w-full max-w-xs" 
                            onChange={(e)=>{ setFirstName(e.target.value)}}/>
                           
                        </label>
                        <label className="form-control w-full max-w-xs mt-4">
                            <div className="label">
                                <span className="label-text text-blue-400 font-medium">Last Name :</span>
                            </div>
                            <input 
                            type="text" 
                            placeholder="Enter your Last Name.." 
                            value={lastName}
                            className="input input-bordered w-full max-w-xs" 
                            onChange={(e)=>{ setLastName(e.target.value)}}/>
                           
                        </label>
                    </div>
}
                    
                        <label className="form-control w-full max-w-xs mt-2">
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
                            type="password" 
                            placeholder="Enter your password.." 
                            value={password}
                            className="input input-bordered w-full max-w-xs" 
                            onChange={(e)=>{ setPassword(e.target.value)}}/>
                           
                        </label>
            
                    <p className='text-red-500'>{error}</p>
                    <div className="card-actions justify-center m-2">
                        <button className="btn btn-primary" onClick={()=>{isLogin? handleLogin() : handleSign()}}>
                            {isLogin ? "Login" : "Sign up"}
                        </button>
                    </div>
                    <p className='text-center cursor-pointer' onClick={()=>{setLogin((val)=> !val)} }>
                        {isLogin ?"New User , Sign up here" : "Already have account , login here"} 
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login