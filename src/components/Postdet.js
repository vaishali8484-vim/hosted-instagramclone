import React from 'react';
import '../css/Postdet.css';
import { Link, useNavigate } from "react-router-dom";

export default function Postdet({item , toggleDetails}) {
          const navigate = useNavigate();
          const removepost=(postId)=>{
            // console.log(postId)
            if(window.confirm("Do you really want to delete this post?"))
            {
              fetch(`/Deletepost/${postId}`, {
                method:"delete",
                headers: { "Authorization": "Bearer " + localStorage.getItem("jwt") },
                
              }).then(res=>res.json())
              // .then(result=>console.log(result))
               .then((result)=>{console.log(result);
                                toggleDetails();
                                navigate("/");
               })
            }
            
          }

  return (
    
        <div className="showComment">
        <div className="container">
          <div className="postPic">
          <img src={item.photo} alt="" />
          </div>
          <div className="details">
            {/* card-header */}
            <div className="card-header" style={{borderBottom:"1px solid #00000029"}}>
            <div className='card-pic'>
            <img src="https://images.unsplash.com/photo-1698610654585-45d30dc86add?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3F1YXJlJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D" alt=""/>
          </div>
          <h5>{item.postedby.name}</h5>
          <div className="deletePost" onClick={()=>{removepost(item._id)}} >
          <span className="material-symbols-outlined">delete</span></div></div>
          
          {/* comment-section */}
          <div className="comment-section" style={{borderBottom:"1px solid #00000029"}}>

          {item.comments.map((comment)=>{
            return (
           <p className="comm">
            <span className="commenter" style={{fontWeight:"bolder"}}>{comment.postedby.name}</span>
            <span className="commentText">  {comment.comment}</span>
          </p>
            )
          })}
          </div>
          {/* card content */}
        <div className='card-content'>
          <p>{item.likes.length} Likes</p>
        <p>{item.body}</p>
        </div>
          {/* comment */}
        <div className='add-comment'>
        <span className="material-symbols-outlined">mood</span>
        <input type="text" placeholder='add a comment'/>
        <button className='comment'>post</button>
        </div>
        
        </div>
      </div>
      <div className="close-comment">
      <span className="material-symbols-outlined material-symbols-outlined-comment" 
      onClick={()=>{toggleDetails()}}
      >close</span>
      </div>
      </div>
      
  )
}
