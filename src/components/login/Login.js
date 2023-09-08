import React,{useEffect, useState}from 'react'
import './Login.css'
import axios from 'axios'
import Swal from 'sweetalert2'
import {BiSolidLockAlt} from 'react-icons/bi'
import {FaUserAlt} from 'react-icons/fa'
import img1 from '../../images/1.svg'
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
function Login() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  let gotoSignup=()=>{navigate("/login/signup")}
  let [currentUser,setCurrentUser]=useState({});
    let [error,setError]=useState("");
    let [userLoginStatus,setUserLoginStatus]=useState(false)
    const loginUser=(userCredObj)=>{
      if(userCredObj.username==="Admin1"&&userCredObj.password==="Admin"){
        Swal.fire({
          icon: 'success',
          title: 'Welcome to Event Management',
          text:'Logined Successfully',
        });
        navigate("/AdminHome");
      }else{
        axios.post('http://localhost:4000/ConsumerHome-api/login-user',userCredObj)
        .then(response=>{
            if(response.data.message==="success"){
                setCurrentUser({...response.data.user})
                setUserLoginStatus(true)
                setError("")
                localStorage.setItem("token",response.data.token)
                Swal.fire({
                  icon: 'success',
                  title: 'Welcome to Event Management',
                  text:'Logined Successfully',
                });
            }else{
                setError(response.data.message)
                Swal.fire({
                  icon: 'error',
                  title: 'Cannot Login!Try Again',
                  text:response.data.message,
                });
            }
        })
        .catch(err=>{

        })
    }
  }

    
   
    const logoutUser=()=>{
        
        localStorage.clear();
       
         setUserLoginStatus(false)

    }
  const handleUserLogin=(userCredObj)=>{
    loginUser(userCredObj)
   }
   useEffect(()=>{
    if(userLoginStatus==true){
      
      {
      navigate("/UserHome");
      }
    }
   },[userLoginStatus])
  return (

      
        <div class="container">
        
      <div class="forms-container">
   
        <div class="signin-signup">
        {error.length !== 0 && (
        <p className="goby display-5 text-danger text-center">* {error} *</p>
      )}
           <form  class="sign-in-form" onSubmit={handleSubmit(handleUserLogin)}>
             <h2 class="title">Sign in</h2>
               <div class="input-field">
               <div className='i'><BiSolidLockAlt/></div>
              <input type="text" placeholder="Username" id="username"
                className="form-control" {...register("username", { required: true })} />
                
             </div>
            <div class="input-field">
             <div className='i'><FaUserAlt/></div>
               <input type="password" placeholder="Password" id="password"
                className="form-control" {...register("password", { required: true })} />
                
            </div>
             <input type="submit" value="Login" class="btn solid" />
            <p class="forgot-text">Forgot Password ?</p>
            
           </form>
       
        </div>
       </div>

       <div class="panels-container1">
         <div class="panel1 left-panel1">
           <div class="content1">
             <h3>New here ?</h3>
             <p>
               Welcome to Event Booking Management Application.
               Experience the Best !
            </p>
             <button class="btn1 transparent" id="sign-up-btn" onClick={gotoSignup}>
              Sign Up
             </button>
          </div>
          <img src={img1} class="image" alt="" />
        </div>
       
      </div>
    </div>
    
    
  )
}

export default Login