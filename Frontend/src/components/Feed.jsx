import React from 'react'
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch,useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import { useEffect } from 'react';
import UserCard from './UserCard';






export const Feed = () => {
   const feed = useSelector((store)=>store.feed); //accessing feed state from the Redux store using useSelector hook and storing it in the feed variable
  const dispatch = useDispatch();
  const getFeed = async()=>{  
    if(feed)
      return ;
   try {
    const res = await axios.get(BASE_URL+"/user/feed",{
      withCredentials:true,
    })
    dispatch(addFeed(res?.data?.data))
   }catch(err){
    console.error(err)
   }
  }

  useEffect(()=>{
      getFeed();
  },[])
  if(!feed)
    return;
  if(feed.length <= 0)
    return <h1 className='flex justify-center '> NO NEW USER FOUND</h1>
  return (
    feed &&(
        <div className="flex justify-center my-7">
      <UserCard  user={feed[0]}/>
    </div>
    )

  
  )
}

export default Feed 