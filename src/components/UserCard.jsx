import React from 'react'
import { DEFAULT_IMG } from '../utils/constants';

const UserCard = ({ user }) => {
  const { firstName, lastName, photourl, about, skills, age, gender } = user;
  return (
    <div className=''>
      <div className="card bg-slate-800 font-medium text-white w-96 h-auto shadow-xl mx-4">
        <figure>
          <img
            src={photourl || DEFAULT_IMG}
            alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + (lastName || "")}</h2>
          <p>{skills || ""}</p>
          <p>{ gender || ""}</p>
          <p>{age || ""}</p>
          <p>{about}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserCard