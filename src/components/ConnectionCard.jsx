import React from 'react'
import { DEFAULT_IMG } from '../utils/constants';


const ConnectionCard = ({ user }) => {
    const { firstName, lastName, age, about, photourl, skills, gender } = user;
    return (
        <div>
        <div className="bg-slate-800 text-white font-light rounded-md p-1 m-4">
            <div className="flex flex-col justify-around lg:flex-row m-4">
               <div className='w-1/3'> <img
                    src={photourl || DEFAULT_IMG}
                    className="w-32 rounded-full shadow-xl my-10" />
                    </div>
                <div className='items-start flex flex-col w-2/3'>
                    <h1 className="text-lg font-bold">{firstName + " " + lastName}</h1>

                    {  gender &&  <p className="py-1">{gender}</p>}
                    {  age &&  <p className="py-1">{age} </p>}
                    {  skills &&  <p className="py-1"> {skills}</p>}
                    {  about &&  <p className="py-1 text-start">{about}</p>}
                    


                 
</div>
            </div>
        </div>
     
    </div>
    )
}

export default ConnectionCard