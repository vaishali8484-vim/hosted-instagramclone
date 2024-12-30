import React, { useState ,useContext} from 'react';
import logo from '../img/logo.png';
import '../css/SignUp.css';
import { Link, useNavigate } from "react-router-dom";
import {toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { Logincontext } from '../context/Logincontext';

export default function SignUp() {
  const{setIsLoggedIn}=useContext(Logincontext)
const navigate=useNavigate()
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");

// toast function
    const notifyA=(msg)=>toast.error(msg);
    const notifyB=(msg)=>toast.success(msg);
    const emailRegex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    var passw=  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    const postData = () => {
      if (!name.trim() && !email.trim() && !username.trim() && !password.trim()) {
        notifyA("All fields are required");
        return;
      }
        if (!emailRegex.test(email)){
            notifyA("Invalid Email")
            return
        }
       else if (!passw.test(password)){
            notifyA("Password must be atleast 8 characters,including at least 1 number and one includes both lower and uppercase letters and special character")
            return
        }
    
        fetch("/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, username, password })
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
                notifyB(data.message ||"Sign-up successfully")
                navigate("/SignIn")
            }
            console.log("Success:", data);
          })
          .catch((err) => {
            notifyA(err.message);
            console.error("Error:", err.message);
          });
        
}






  return (
    <div className="SignUp">
        <div className='form-container'>
         <div className='form'>

            <img className="signUpLogo" src={logo}/>
            <p className='loginpara'>
                Sign up to see photos and videos<br/> from your friends 
            </p>
            <div>
                <input type="email" name="email" id="email" value={email} placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div>
                <input type="text" name="name" id="name" value={name} placeholder='FullName'onChange={(e)=>{setName(e.target.value)}}/>
            </div>
            <div>
                <input type="text" name="username" value={username} id="username" placeholder='Username'onChange={(e)=>{setUsername(e.target.value)}} />
            </div>
            <div>
                <input type="password" name="Password"value={password} id="password" placeholder='Password'onChange={(e)=>{setPassword(e.target.value)}} />
            </div>
            <p className='loginpara' style={{fontSize:"12px", margin:"3px 0px"}}>
                By Signing Up, you agree to our Terms,<br/> Privacy policy and cookies policy.
            </p>
            <input type="submit" id="submit-btn" value="Sign up" onClick={()=>{postData()}}/>
           <hr/>
            <GoogleLogin
               onSuccess={credentialResponse => {
               console.log(credentialResponse);
               const decoded = jwtDecode(credentialResponse.credential);
                console.log(decoded);

                fetch("/googlelogin", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ name:decoded.name,
                                          username:decoded.username,
                                          email:decoded.email,
                                          email_verified:decoded.email_verified,
                                          clientId:credentialResponse.clientId,
                                          photo:decoded.picture
                  })
                })
                
                  .then(res => res.json())
                  .then((data) => {
                    if(data.error){
                        notifyA(data.error)
                        
                    }
                
                    else{
                        // notifyB(data.message ||"Sign-in successfully");
                        notifyB("Signed In Successfully")
                        console.log(data);
                         localStorage.setItem("jwt",data.token);
                         localStorage.setItem("user",JSON.stringify(data.user));
                        setIsLoggedIn(true)
                        navigate("/")
                    }
                     console.log("Success:", data);
                  })
                  .catch((err) => {
                    notifyA(err.message);
                    console.error("Error:", err.message);
                  });
               }}
              //  onSuccess={handleGoogleLogin}
            onError={() => {
            console.log('Login Failed');
             }}
            />;</div>
            <div className='form2'>
                Already have an account?
                <Link  to="/SignIn"><span style={{color:"blue", cursor:"pointer"}}>Sign In</span></Link>
            </div>
        </div>

    </div>
  )
}
