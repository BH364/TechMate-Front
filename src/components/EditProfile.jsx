import React, { useState } from 'react';
import UserCard from './UserCard';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addUser  } from '../utils/userSlice';

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photourl, setPhotourl] = useState(user.photourl);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);
    const [skills, setSkills] = useState(user.skills);
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isPreview, setIsPreview] = useState(false); // State to toggle between edit and preview
    const dispatch = useDispatch();

    const saveProfile = async () => {
        setError("");
        setLoading(true);
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName, lastName, age, photourl, skills, about, gender,
            }, {
                withCredentials: true
            });
            dispatch(addUser (res?.data?.data));
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center my-10'>
            <div className="items-center mb-4">
                <button 
                    className="btn md:px-36 bg-blue-800 font-bold text-white mr-10 md:mx-4" 
                    onClick={() => setIsPreview(false)} // Show edit form
                >
                    Edit Profile
                </button>
                <button 
                    className="btn md:px-40 bg-blue-800 font-bold text-white ml-5 md:mx-0" 
                    onClick={() => setIsPreview(true)} // Show user card
                >
                    Preview
                </button>
            </div>

            <div className='flex flex-row justify-center'>
                {/* Show UserCard on large screens and toggle on smaller screens */}
               
                
                {/* Show Edit Form */}
                <div className={`flex justify-center ${isPreview ? 'hidden md:flex' : ''}`}>
                    <div className="card bg-slate-800 font-medium text-white md:w-96 shadow-md mx-1">
                        <div className="card-body">
                            <h2 className="card-title justify-center text-blue-400 font-extrabold">Edit Profile</h2>
                            <div className=''>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text text-blue-400 font-medium">First Name</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Enter your first name.."
                                        value={firstName}
                                        className="input input-bordered w-full max-w-xs"
                                        onChange={(e) => { setFirstName(e.target.value) }} />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text text-blue-400 font-medium">Last Name</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Enter your last name.."
                                        value={lastName}
                                        className="input input-bordered w-full max-w-xs"
                                        onChange={(e) => { setLastName(e.target.value) }} />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    
                                    <div className="label">
                                        <span className="label-text text-blue-400 font-medium">Age:</span>
                                    </div>
                                    <input
                                        type="number"
                                        placeholder="Enter your age.."
                                        value={age}
                                        className="input input-bordered w-full max-w-xs"
                                        onChange={(e) => { setAge(e.target.value) }} />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text text-blue-400 font-medium">Gender:</span>
                                    </div>
                                    <div className='flex'>
                                        <div className='flex'>
                                            <input type="radio"
                                                name="gender"
                                                className="radio radio-info mx-2"
                                                value="Male"
                                                checked={gender === "Male"}
                                                onChange={(e) => setGender(e.target.value)} />
                                            <label className='mx-2'> Male</label>
                                        </div>
                                        <div className='flex'>
                                            <input type="radio"
                                                name="gender"
                                                className="radio radio-info mx-2"
                                                value="Female"
                                                checked={gender === "Female"}
                                                onChange={(e) => setGender(e.target.value)} />
                                            <label className='mx-2'> Female</label>
                                        </div>
                                        <div className='flex'>
                                            <input type="radio"
                                                name="gender"
                                                className="radio radio-info mx-2"
                                                value="Other"
                                                checked={gender === "Other"}
                                                onChange={(e) => setGender(e.target.value)} />
                                            <label className='mx-2'>Other</label>
                                        </div>
                                    </div>
                                </label>
                                <label className="form-control w-full max-w-xs mt-1">
                                    <div className="label">
                                        <span className="label-text text-blue-400 font-medium">About:</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Enter your about.."
                                        value={about}
                                        className="input input-bordered w-full max-w-xs"
                                        onChange={(e) => { setAbout(e.target.value) }} />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text text-blue-400 font-medium">Photo:</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Enter your photo URL.."
                                        value={photourl}
                                        className="input input-bordered w-full max-w-xs"
                                        onChange={(e) => { setPhotourl(e.target.value) }} />
                                </label>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text text-blue-400 font-medium">Skills:</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Enter your skills.."
                                        value={skills}
                                        className="input input-bordered w-full max-w-xs"
                                        onChange={(e) => { setSkills(e.target.value) }} />
                                </label>
                            </div>
                            <p className='text-red-500'>{error}</p>
                            <div className="card-actions justify-center m-2">
                                <button className="btn btn-primary" onClick={saveProfile} disabled={loading}>
                                    {loading ? 'Saving...' : 'Save Profile'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`md:block ${isPreview ? 'block' : 'hidden'}`}>
                    <UserCard user={{ firstName, lastName, age, gender, skills, photourl, about }} className='w-40' />
                </div>
                
            </div>
            {showToast &&
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>Profile updated successfully.</span>
                    </div>
                </div>}
        </div>
    );
}

export default EditProfile;