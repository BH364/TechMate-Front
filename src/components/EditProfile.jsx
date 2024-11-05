import React, { useState } from 'react'
import UserCard from './UserCard';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';

const EditProfile = ({user}) => {
    const [firstName,setFirstName] = useState(user.firstName);
    const [lastName,setLastName] = useState(user.lastName);
    const [photourl,setphotourl] = useState(user.photourl);
    const [age,setAge] = useState(user.age);
    const [gender,setGender] = useState(user.gender);
    const [about,setAbout] = useState(user.about);
    const [skills,setSkills] = useState(user.skills);
    const [error,setError]= useState("");
    const [showToast,setShowToast] = useState(false);
    const dispatch = useDispatch();
    
    const saveProfile =async () =>{
        setError("");
        try{
       const res=await axios.patch(BASE_URL+"/profile/edit",{
        firstName,lastName,age,photourl,skills,about,gender,
    },{

    withCredentials:true
});
     dispatch(addUser(res?.data?.data));
    setShowToast(true);
    setTimeout(()=>{
        setShowToast(false);
    },3000);

    }
    catch(err){
        setError(err.response?.data?.message || "error occured");
    }
    }


  return (
    <div className='flex flex-row my-10 justify-center'>
    <div>
        <div className='flex justify-center'>
            <div className="card bg-slate-800 font-medium text-white w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center text-blue-400 font-extrabold">Edit Profile</h2>
                    <div className=''>
                        <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text text-blue-400 font-medium">FirstName</span>
                            </div>
                            <input 
                            type="text" 
                            placeholder="Enter your firstName.." 
                            value={firstName}
                            className="input input-bordered w-full max-w-xs" 
                            onChange={(e)=>{ setFirstName(e.target.value)}}/>
                           
                        </label>
                        <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text text-blue-400 font-medium">LastName</span>
                            </div>
                            <input 
                            type="text" 
                            placeholder="Enter your LastName.." 
                            value={lastName}
                            className="input input-bordered w-full max-w-xs" 
                            onChange={(e)=>{ setLastName(e.target.value)}}/>
                           
                        </label>
                        <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text text-blue-400 font-medium">Age : </span>
                            </div>
                            <input 
                            type="Number" 
                            placeholder="Enter your Age.." 
                            value={age}
                            className="input input-bordered w-full max-w-xs" 
                            onChange={(e)=>{ setAge(e.target.value)}}/>
                           
                        </label>
                        <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text text-blue-400 font-medium">Gender : </span>
                            </div>
                        <div className='flex'>
                        <div className='flex'>
                        <input type="radio" 
                           name="gender" 
                           className="radio radio-info mx-2" 
                           value="Male" 
                           checked={gender === "Male"} 
                           onChange={(e)=>setGender(e.target.value)} />
                           <label className='mx-2'> Male</label>
                           </div>
                        <div className='flex'>
                        
                        <input type="radio" 
                           name="gender" 
                           className="radio radio-info mx-2" 
                           value="Female" 
                           checked={gender === "Female"} 
                           onChange={(e)=>setGender(e.target.value)} />
                           <label className='mx-2'> Female</label> 
                           </div>
                        <div className='flex'>

                        <input type="radio" 
                           name="gender" 
                           className="radio radio-info mx-2" 
                           value="Other" 
                           checked={gender === "Other"} 
                           onChange={(e)=>setGender(e.target.value)} />
                           <label className='mx-2'>Other</label>
                        </div>   
                        </div>
 
                           

                        </label>
                        <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text text-blue-400 font-medium">About : </span>
                            </div>
                            <input 
                            type="text" 
                            placeholder="Enter your About.." 
                            value={about}
                            className="input input-bordered w-full max-w-xs" 
                            onChange={(e)=>{ setAbout(e.target.value)}}/>
                           
                        </label>
                        <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text text-blue-400 font-medium">Photo :</span>
                            </div>
                            <input 
                            type="text" 
                            placeholder="Enter your photo url.." 
                            value={photourl}
                            className="input input-bordered w-full max-w-xs" 
                            onChange={(e)=>{ setphotourl(e.target.value)}}/>
                           
                        </label>
                        <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text text-blue-400 font-medium">Skills : </span>
                            </div>
                            <input 
                            type="text" 
                            placeholder="Enter your skills.." 
                            value={skills}
                            className="input input-bordered w-full max-w-xs" 
                            onChange={(e)=>{ setSkills(e.target.value)}}/>
                           
                        </label>

                      
                    </div>
                    <p className='text-red-500'>{error}</p>
                    <div className="card-actions justify-center m-2">
                        <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className=''>
    <UserCard user={{firstName,lastName,age,gender,skills,photourl,about}}/>
    </div>
    {showToast && 
     <div className="toast toast-top toast-center">
    
      <div className="alert alert-success">
    <span>Profile updated successfully.</span>
  </div>
  </div>}
    </div>
  )
}

export default EditProfile