import React from 'react'
import axios from "axios";
import { BASE_URL } from '../utils/constants';
import {useDispatch} from "react-redux";
import {removeFeed} from "../utils/feedSlice.js"




const UserCard = ({ user }) => {
   const{_id,firstName,lastName,age,gender,about} = user;
   const dispatch = useDispatch()
   const handleSendRequest =async(status,userId)=>{
    
    try{
       await axios.post(BASE_URL+"/request/send/"+status+"/"+userId,{},
        {withCredentials:true}
      );
      dispatch(removeFeed(userId))
   }
   catch(err){
    console.error(err)
   }
  }
  return (
    <div className="card bg-base-300 w-80   shadow-sm">
  <figure>
    <img
            alt="user photo"
            src={user.photUrl} />
  </figure>
  <div className="card-body  ">
    <h2 className="card-title">{firstName+" "+lastName}</h2>
    {age&& gender&&(<p>{age+","+gender}</p>)}

    <p> {about}</p>
    <div className="card-actions justify-center my-4">
      <button className="btn btn-primary" onClick={()=>handleSendRequest("ignored",_id)}>Ignore</button>

      <button className="btn btn-secondary"onClick={()=>handleSendRequest("interested",_id)}>Interest</button>
    </div>
  </div>
</div>
  )
}

export default UserCard