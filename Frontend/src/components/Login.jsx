import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const[firstName,setFirstName]=useState("");
  const[lastName, setLastName] = useState("")
  const[Email,setEmail]= useState("");
  const[age,setAge]=useState("");
  const[gender,setGender]=useState("");
  const[IsLoginForm,setIsLoginForm]=useState(true)
  const[Password,setPassword]= useState("");
  const[Error,setError]= useState("")
  const dispatch = useDispatch()
    const navigate = useNavigate();

  const handleLogin = async() => { 
    try {
      const res = await axios.post(BASE_URL+"/login", {
       Email,
       Password,
      },{withCredentials:true});
      dispatch(addUser(res.data.data));
      return navigate("/")
    }catch(err){
      setError(err?.response?.data ||"Something went Wrong")
    }
  }
  const handleSignUp=async()=>{
    try{
      const res = await axios.post(BASE_URL+"/signup",{
        firstName,
        lastName,
        Email,
        Password,
        age,
        gender
      },{withCredentials:true});
      dispatch(addUser(res.data))
      return navigate("/profile")


    }catch(err){
      setError(err?.response?.data||"Something went wrong")
    }
  }

  return (
    
<div className="flex justify-center mt-8 mb-5">
  <div className="card bg-base-300 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title justify-center">{IsLoginForm?"Login":"SignUp"}</h2>
    <div>
        {!IsLoginForm && (
          <>
          <fieldset className="fieldset">
  <legend className="fieldset-legend">First Name</legend>
  <input type="text"
   className="input" 
   placeholder="Type of your FirstName" 
   value={firstName}
   onChange={(e) => setFirstName(e.target.value)}
   />
</fieldset>
   <fieldset className="fieldset">
  <legend className="fieldset-legend">LastName</legend>
  <input type="text"
   className="input" 
   placeholder="Type of your LastName" 
   value={lastName}
   onChange={(e) => setLastName(e.target.value)}
   />
</fieldset>
<fieldset className="fieldset">
  <legend className="fieldset-legend">Gender</legend>
  <input type="text"
   className="input" 
   placeholder="Type of your Gender" 
   value={gender}
   onChange={(e) => setGender(e.target.value)}
   />
</fieldset>
<fieldset className="fieldset">
  <legend className="fieldset-legend">Age</legend>
  <input type="Number"
   className="input" 
   placeholder="Type of your Age" 
   value={age}
   onChange={(e) => setAge(e.target.value)}
   />
</fieldset>
</>
)}
      <fieldset className="fieldset">
  <legend className="fieldset-legend">Email ID</legend>
  <input type="text"
   className="input" 
   placeholder="Type of your Email" 
   value={Email}
   onChange={(e) => setEmail(e.target.value)}
   //added onChange event to update email state when user types in the input field{binding email state to input value and updating it on change}
   />
</fieldset>

<fieldset className="fieldset">
  <legend className="fieldset-legend">Password</legend>
  <input type="password"
   className="input"
    placeholder="Type your Password" 
    value={Password}
    onChange={(e)=>setPassword(e.target.value)}
    />
</fieldset>


    </div>
    <p className='text-red-500'>{Error}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={IsLoginForm?handleLogin:handleSignUp}>{IsLoginForm?"login":"SignUp"}</button>
    </div>
    <p className='m-auto cursor-pointer py-2'onClick={()=>setIsLoginForm((value)=>!value)}>
      {IsLoginForm?"New User? SignUp Here"
       :"Existing User?Login Here"}</p>
  </div>
</div>
</div>

  )
}

export default Login