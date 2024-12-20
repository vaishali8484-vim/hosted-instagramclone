import React, { useEffect, useState } from 'react';
import "../css/Profile.css";
import Postdet from './Postdet';
import { useParams } from 'react-router-dom';


export default function Userprofile() {
   var piclink="https://cdn-icons-png.flaticon.com/128/149/149071.png"
    const{userid} =useParams()
    // console.log(userid)
 const [user,setUser]=useState("")
const[isFollow,setIsFollow]=useState(false)
 const[posts,setPosts]=useState([])
// to follow user
const followuser=(userId)=>{
  fetch("/follow", {
    method:"put",
    headers: { 
      "content-Type":"application/json",
      "Authorization": "Bearer " + localStorage.getItem("jwt") },
      body:JSON.stringify({
        followId:userId
      })
})
.then(res=>res.json())
// .then(result=>console.log(result))
 .then((data)=>{console.log(data);
                setIsFollow(true)
 })
}
// to unfollow user
const unfollowuser=(userId)=>{
  fetch("/unfollow", {
    method:"put",
    headers: { 
      "content-Type":"application/json",
      "Authorization": "Bearer " + localStorage.getItem("jwt") },
      body:JSON.stringify({
        followId:userId
      })
})
.then(res=>res.json())
// .then(result=>console.log(result))
 .then((data)=>{console.log(data);
                 setIsFollow(false)
 })
}

useEffect(()=>{
  fetch(`/user/${userid}`, {
      
    headers: { "Authorization": "Bearer " + localStorage.getItem("jwt") },
    
  }).then(res=>res.json())
  
   .then((result)=>{console.log(result);
                    setUser(result.user);
                    setPosts(result.posts);
                  if(result.user.followers.includes(JSON.parse(localStorage.getItem("user"))._id)){
                    setIsFollow(true)
                  }
                  });
},[isFollow]);

  return (
    <>
    <div className='profile'>
      <div className='profile-frame'>
        {/* profile-pic */}
        <div className='profile-pic'>
          <img src={user.Photo?user.Photo:piclink} alt="profile"/>
        </div>
        {/* profile data */}
        <div className='profile-data'>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <h1>{user.name}</h1>
          <button className='followbtn' onClick={()=>{
                                                  if(isFollow){
                                                    unfollowuser(user._id)
                                                  }else{
                                                    followuser(user._id)
                                                  }
                                                  }}>{isFollow?"Unfollow":"Follow"}</button>

          </div>
          
          <div className='profile-info' style={{display:"flex"}}>
            <p>{posts.length}  posts</p>
            <p>{user.followers?user.followers.length:"0"} followers</p>
            <p>{user.folllowing?user.following.length:"0"} following</p>
          </div>
        </div>
        
        </div>
<hr style={{width:"90%",margin:"auto", opacity:"0.8",margin:"25px auto"}}/>
        
        <div className='gallery'>
         {posts.map((datas)=>{
          return <img key={datas._id} src={datas.photo} className='item'/>
         })}
        </div>
        
         
  
    
    </div>
    </>
  )
}

