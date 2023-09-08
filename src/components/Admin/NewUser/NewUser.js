import React from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

import { useState } from "react";

import {useForm} from 'react-hook-form'

import Box from '@mui/material/Box';
import './NewUser.css';

import img2 from '../../../images/2.svg'
import { useNavigate } from 'react-router-dom';



function NewUser() {
  let {
    register,
    handleSubmit,reset,
    formState: { errors },
  } = useForm();
  let [error, setError] = useState("");
  let navigate=useNavigate();
   let addNewUser = (newUser) => {
  
   
   

    axios
      .post("http://localhost:4000/ConsumerHome-api/register-user", newUser)
      .then((response) => {
        console.log(newUser);
        if (response.status === 201) {
        
          console.log("added")
          Swal.fire({
            icon: 'success',
            title: 'You are registered',
            text: 'Login in Next Page!',
          });
          reset();
          navigate("/login")
        }
        if(response.status!==201){
          console.log(response.data.message)
          setError(response.data.message)
          Swal.fire({
            icon: 'error',
            title: 'Cannot Register!Try Again',
            text:response.data.message,
          });
        }
      })
      .catch((err) => {
        if (err.response) {
          setError(err.message);
        }
        else if (err.request) {
          setError(err.message);
        }
        else {
          setError(err.message);
        }
      });
  };
  return (
    <>
   
   <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
  
   <div className='contain11' >
       
        
        <div className='title'>
            <h4>Don't have Account ?  Register</h4>
        </div>
        <div className='create'>
          <div className='sign-in'>
            <h4>Sign in</h4>
           
            <form onSubmit={handleSubmit(addNewUser)}>
       
            <div className="item mb-4">
              <label htmlFor="Fullname">Fullname:</label>
              <input
                type="text"
                id="myname"
                className="form-control"
                placeholder="xyz" 
                {...register("myname", { required: true })}
              />
            
            </div>
            <div className="item mb-4 ml-1">
              <label htmlFor="name">Username:</label>
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="XYZ@123" 
                {...register("username", { required: true })}
              />
            </div>
           
            <div className="item mb-4">
              <label htmlFor="name">Password:</label>
              <input
                type="password"
                placeholder="*********"
                id="password"
                className="form-control"
                {...register("password", { required: true })}
              />
            </div>
          
            <div className="item mb-4">
              <label htmlFor="name">PhoneNo:</label>
              <input
                type="text"
                id="phonenumber"
                className="form-control"
              
                {...register("phonenumber", { required: true,maxLength:"10",minLength:"10" })}
              />
              
              
            </div>
            
            <div className="item mb-4">
              <label htmlFor="name">Email:</label>
              <input
                type="email"
                placeholder="e.g. example@mail.com"
                id="email"
                className="form-control"
                {...register("email", { required: true })}
              />
              
             
            </div>
           


           
           
            <button type="submit" className="btn1 btn-success">
              Register
            </button>
          </form>
          
          </div>
           <div className='picture'>
            <img src={img2} className='imge' alt='not available'/>
           </div>
           
           </div>
    </div>

 </Box>
    
    </>
    
  )
}

export default NewUser