import React from 'react'
import { BASE_URL, DEFAULT_IMG } from '../utils/constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeRequest } from '../utils/requestSlice';

const RequestCard = ({user}) => {
    const { firstName, lastName, age, about, photourl, skills, gender } = user.fromUserId;
    const dispatch = useDispatch();
    const reviewRequest = async (status,_id) =>{
        try{
            const res= await axios.post(BASE_URL+"/request/review/"+status+'/'+_id,{},{
                withCredentials:true,
            });
            dispatch(removeRequest(_id));

        }
        catch(err){
            console.log(err.message);
        }
    }
    return (
        <div>
            <div className="bg-slate-800 text-white font-light rounded-md p-1 m-4">
                <div className="flex flex-col justify-around lg:flex-row m-4">
                   <div className='w-1/3'> <img
                        src={photourl || DEFAULT_IMG}
                        className="w-32 rounded-full shadow-xl justify-center items-center my-10" />
                        </div>
                    <div className='items-start flex flex-col w-2/3'>
                        <h1 className="text-lg font-bold">{firstName + " " + lastName}</h1>

                        {  gender &&  <p className="py-1">{gender}</p>}
                        {  age &&  <p className="py-1">{age} </p>}
                        {  skills &&  <p className="py-1"> {skills}</p>}
                        {  about &&  <p className="py-1 text-left">{about}</p>}
                    <div className='flex flex-row m-2'>
                        <button className="btn btn-primary mr-2" onClick={()=>{reviewRequest("rejected",user._id)}}>Reject</button>
                        <button className="btn btn-secondary ml-4" onClick={()=>{reviewRequest("accepted",user._id)}}>Accept</button>
                        </div>


                     
</div>
                </div>
            </div>
         
        </div>
    )
}

export default RequestCard