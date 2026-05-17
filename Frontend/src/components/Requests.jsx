import React from 'react'
import { addRequests, removeRequests }  from '../utils/requestsSlice'
import { useDispatch, useSelector} from 'react-redux';
import{useEffect} from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
const Requests = () => {
  const dispatch = useDispatch();

  

  const reviewRequests = async(status,_id)=>{
    try{
       await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},{
        withCredentials:true,
      })
    
      dispatch(removeRequests(_id))
      
    } catch(err){
      console.error(err)
    }
  }
  
  const requests = useSelector((store)=> store.requests)

  const fetchRequests = async()=>{
    try{
      const res = await axios.get(BASE_URL+"/user/request/received",
      {
        withCredentials:true,
      });
    dispatch(addRequests(res.data.data))
  }catch(err){
    console.error(err)
    }
  }
  useEffect(()=>{
    fetchRequests();
  },[])

  if(!requests) return
 if(requests.length === 0) return <h1 className='justify-center flex mx-2'>No Requests found</h1>
  return (
    <div className=' text-center my-10'>

      <h1 className=' text-bold text-3xl text-white'>Connection Requests</h1>
      
      {requests.map((requests)=>
      {
        const {_id ,firstName,lastName,photUrl,age,gender,about}= requests.fromUserId;
        return(
          <div  key={_id}className=' flex  justify-between 
          item-center  m-4 p-4 rounded-lg bg-base-200 w-2/3 mx-auto'>
            <div> 
               <img src={photUrl} alt="Photo" className='w-20 h-20 rounded-full'/>
               </div>
            <div className='text-left mx-4'> 
              <h2 className='font-bold text-xl'>{firstName +" "+lastName}</h2>
             <p>{about}</p>
             {age && 
             <p>{age +" " + gender}</p>}
             </div>
             <div>
             <button
              className='btn btn-primary mx-2' onClick={()=> reviewRequests("rejected",requests._id)}>Reject</button>
             <button 
             className='btn btn-secondary mx-2' onClick={()=>reviewRequests("accepted",requests._id)}>Accept</button>

             </div>
        
             </div>
        )
      })}

    </div>
  )
}

export default Requests