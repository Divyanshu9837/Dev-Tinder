import React, { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';
import { useSelector } from 'react-redux';



const Connection = () => {
  const connection = useSelector((store)=> store.connection)
  const dispatch = useDispatch()
  const fetchConnection = async()=>{
    try{
      const res = await axios.get(BASE_URL+"/user/connection",{
        withCredentials:true,
      })
      dispatch(addConnection(res.data.data))

    }
    catch(err){
      console.error(err)
    }
  }

  useEffect(()=>{
    fetchConnection()
  },[]);

  if(!connection)return;
  if(connection.length === 0) return <h1>No Connectin found</h1>
  return (
    <div className=' text-center my-10'>

      <h1 className=' text-bold text-3xl text-white'>Connections</h1>
      
      {connection.map((connection)=>
      {
        const {_id,firstName,lastName,photUrl,age,gender,about}= connection;
        return(
          <div key={_id}className=' flex  m-4 p-4 rounded-lg bg-base-200 w-1/2 mx-auto'>
            <div> 
               <img src={photUrl} alt="Photo" className='w-20 h-20 rounded-full'/>
               </div>
            <div className='text-left mx-4'> 
              <h2 className='font-bold text-xl'>{firstName +" "+lastName}</h2>
             <p>{about}</p>
             {age && gender&&
             <p>{age +" " + gender}</p>}
             </div>
        
             </div>
        )
      })}

    </div>
  )
}

export default Connection