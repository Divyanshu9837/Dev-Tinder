import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import UserCard from './UserCard'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'


 


const EditProfile = ({user}) => {
     const[firstName,setFirstName]= useState(user.firstName);
     const[lastName,setLastName]= useState(user.lastName);
     const[age,setAge]= useState(user.age);
     const[about,setAbout]= useState(user.about);
     const[gender,setGender]= useState(user.gender);
     const[photUrl ,setPhotoUrl]= useState(user.photUrl);
     const[showToast, setShowToast]= useState(false);
     const dispatch = useDispatch()
     

     const saveProfile = async()=>{
      try{

        const res = await axios.patch(BASE_URL +"/profile/edit",{
          firstName,
          lastName,
          age,
          about,
          gender,
          photUrl
        },{
          withCredentials:true,
        });
        setError("")
        dispatch(addUser(res?.data?.data))
        setShowToast(true);
        setTimeout(()=>{
          setShowToast(false)
        },3000)



      }catch(err){
        setError(err.response.data)
      }
     }

    const[Error,setError]= useState("")
  return (
    <>
    <div className="flex justify-center my-10 ">
    <div className="flex justify-center mx-10 ">
  <div className="card bg-base-300 w-96  shadow-sm">
  <div className="card-body ">
    <h2 className="card-title justify-center">Edit Profile</h2>
    <div>
      <fieldset className="fieldset ">
  <legend className="fieldset-legend">FirstName</legend>
  <input type="text"
   className="input" 
   placeholder='Type your firstName'
   value={firstName}
   onChange={(e) => setFirstName(e.target.value)}
   //added onChange event to update email state when user types in the input field{binding email state to input value and updating it on change}
   />
</fieldset>

<fieldset className="fieldset">
  <legend className="fieldset-legend">Last Name</legend>
  <input type="text"
   className="input"
    placeholder="Type your lastName" 
    value={lastName}
    onChange={(e)=>setLastName(e.target.value)}
    />
</fieldset>

   <fieldset className="fieldset">
  <legend className="fieldset-legend">Age</legend>
  <input type="text"
   className="input" 
   placeholder="Type your Age" 
   value={age}
   onChange={(e) => setAge(e.target.value)}
   //added onChange event to update email state when user types in the input field{binding email state to input value and updating it on change}
   />
</fieldset>

   <fieldset className="fieldset">
  <legend className="fieldset-legend">Gender</legend>
  <input type="text"
   className="input" 
   placeholder="Type your Gender" 
   value={gender}
   onChange={(e) => setGender(e.target.value)}
   //added onChange event to update email state when user types in the input field{binding email state to input value and updating it on change}
   />
</fieldset>

   <fieldset className="fieldset">
  <legend className="fieldset-legend">About</legend>
  <input type="text"
   className="input" 
   placeholder="Type your About" 
   value={about}
   onChange={(e) => setAbout(e.target.value)}
   //added onChange event to update email state when user types in the input field{binding email state to input value and updating it on change}
   />
</fieldset>


   <fieldset className="fieldset">
  <legend className="fieldset-legend">Photo URL</legend>
  <input type="text"
   className="input" 
   placeholder="Type your Photo URL" 
   value={photUrl}
   onChange={(e) => setPhotoUrl(e.target.value)}
   //added onChange event to update email state when user types in the input field{binding email state to input value and updating it on change}
   />
</fieldset>
  </div>
    <p className='text-red-500'>{Error}</p>
    <div className="card-actions justify-center ">
      <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
    </div>
  </div>
</div>
    </div>
    <UserCard user={{firstName,lastName,age,about,gender,photUrl}}/>
    </div>
    

   {showToast &&( <div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>Profile updated successfully.</span>
  </div>
</div>)}
    </>
  )
}

export default EditProfile