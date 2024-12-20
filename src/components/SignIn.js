import React, { useState , createContext, useContext } from 'react';
import '../css/SignIn.css';
import logo from '../img/logo.png';
import { Link, useNavigate } from "react-router-dom";
import {toast } from 'react-toastify';
import { Logincontext } from '../context/Logincontext';


export default function SignIn() {

    const{setIsLoggedIn}=useContext(Logincontext)
    const navigate=useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const notifyA=(msg)=>toast.error(msg);
    const notifyB=(msg)=>toast.success(msg);
    const emailRegex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const postData = () => {
      if ( !email.trim() && !password.trim()) {
        notifyA("All fields are required");
        return;
      }
        if (!emailRegex.test(email)){
            notifyA("Invalid Email")
            return
        }
       
    
        fetch("/SignIn", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({  email,  password })
        })
        
          .then((res) => {
            if (!res.ok) {
              return res.text().then((errorText) => {
                throw new Error(`Server error: ${errorText}`);
              });
            }
            return res.json();
          })
          .then((data) => {
            if(data.error){
                notifyA(data.error)
                
            }
        
            else{
                // notifyB(data.message ||"Sign-in successfully");
                notifyB("Signed In Successfully")
                console.log("token stored:",data.token);
                localStorage.setItem("jwt",data.token);
                localStorage.setItem("user",JSON.stringify(data.user));
                setIsLoggedIn(true)
                navigate("/")
            }
            //  console.log("Success:", data);
          })
          .catch((err) => {
            notifyA(err.message);
            console.error("Error:", err.message);
          });
        
}

  return (
    <div className='SignIn'>
        <div>
            <div className='loginForm'>
            <img className="signUpLogo" src={logo}/>
            <div>
                <input type="email" name="email"value={email}  id='email' placeholder='Email'onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div>
                <input type="password" name="password"value={password}  id='password' placeholder='Password'onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
            <input type='submit' id='login-btn' onClick={()=>{postData()}} value="sign In"/>
            </div>
            <div className='loginform2'>
                Don't have an account?
                <Link  to="/SignUp"><span style={{color:"blue", cursor:"pointer"}}>Sign Up</span></Link>
            </div>
        </div>
      
      
    </div>
  )
}
