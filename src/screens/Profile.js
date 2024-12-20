import React, { useEffect, useState } from 'react';
import "../css/Profile.css";
import Postdet from '../components/Postdet';
import Profilepic from '../components/Profilepic';


export default function Profile() {
  var piclink="https://cdn-icons-png.flaticon.com/128/149/149071.png"
 const [data,setData]=useState([]);
 const[show,setShow]=useState(false);
 const[posts,setPosts]=useState([])
const[changePic,setChangePic]=useState(false)
const[user,setUser]=useState("")
 const toggleDetails=(posts)=>{
  if(show){
    setShow(false);
  }
  else{
    setShow(true);
    setPosts(posts);
   }
}

const changeprofile=()=>{
  
  if(changePic){
    setChangePic(false)
  }else{
    setChangePic(true)
  }
}


useEffect(()=>{
  fetch(`/user/${JSON.parse(localStorage.getItem("user"))._id}`, {
      
    headers: { "Authorization": "Bearer " + localStorage.getItem("jwt") },
    
  }).then(res=>res.json())
  // .then(result=>console.log(result))
   .then((result)=>{setData(result.posts)
    setUser(result.user)
    console.log(result)})
},[]);

  return (
    <>
    <div className='profile'>
      <div className='profile-frame'>
        {/* profile-pic */}
        <div className='profile-pic'>
          <img onClick={changeprofile} src={user.Photo?user.Photo:piclink} alt="profile"/>
        </div>
        {/* profile data */}
        <div className='profile-data'>
          <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
          <div className='profile-info' style={{display:"flex"}}>
            <p>{data?data.length:"0"} posts</p>
            <p>{user.followers?user.followers.length:"0"} followers</p>
            <p>{user.following?user.following.length:"0"} following</p>
          </div>
        </div>
        
        </div>
<hr style={{width:"90%",margin:"auto", opacity:"0.8",margin:"25px auto"}}/>
        
        <div className='gallery'>
         {data.map((datas)=>{
          return <img key={datas._id} src={datas.photo}
          onClick={()=>{toggleDetails(datas)}}
          className='item'/>
         })}
        </div>
        {show && <Postdet item={posts} toggleDetails={toggleDetails}/>}
         
        {
          changePic && <Profilepic changeprofile={changeprofile}  />
        }
    
    </div>
    </>
  )
}

