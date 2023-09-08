
import React,{useState,useEffect,useContext} from 'react'

import {useForm} from 'react-hook-form'
import axios from 'axios'
import Swal from 'sweetalert2';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import 'react-toastify/dist/ReactToastify.css'
import './HostEvent.css';
import SideBar from '../SideBar/SideBar';
import Box from '@mui/material/Box';
import NavBar from '../NavBar/NavBar';
import { useNavigate } from "react-router-dom";

import {Button,Dialog,DialogActions,DialogContentText,DialogTitle, Stack} from "@mui/material"
function HostEvent() {
    const [open,openchange]=useState(false);

    let [selectedFile,setSelectedFile]=useState(null)
    const functionopenpopup=()=>{
        openchange(true);
    }
    const closepopup=()=>{
        openchange(false);
    }
    const navigate = useNavigate();
    const onFileSelect=(e)=>{
        setSelectedFile(e.target.files[0])
    }

          
   
    let {register,handleSubmit,reset,formState:{errors}}=useForm();
    let [error,setError]=useState("")
    let [text,setText]=useState("")
    let addNewEvent=(newEvent)=>{
        
    let fd=new FormData();
 
    fd.append("Event",JSON.stringify(newEvent))
   
    fd.append("photo",selectedFile)
        axios.post("http://localhost:4000/AdminHome-api/register-event",fd)
        
        .then((response)=>{
         
  
          if(response.status===201)
          {
            console.log("added")
            Swal.fire({
              icon: 'success',
              title: 'Event Created Successfully!',
              text: 'New Event has been posted successfully.',
            });
            reset();
           
          }
          if(response.status!==201)
          {
            setError(response.data.message)
            console.log(response.data.message)
            Swal.fire({
              icon: 'error',
              title: 'Cannot Add Event!Try Again',
              text:response.data.message,
            });
          }
   
          
          
          
    
        })
        .catch((err)=>{
          if(err.response){
            setError(err.message);
          }
          else if(err.request)
          {
            setError(err.message)
          }
          else{
            setError(err.message)
          }
          Swal.fire({
            icon: 'warning',
            title: 'Cannot Add Event!Try Again',
            text:err.message,
          });
        })
      }
  return (
    <>
    <NavBar/>
    <Box height={40}/>
    <Box sx={{ display: 'flex' }}>
    <SideBar/>
    <div className='addevent'>
   <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
   <div className='contain' >
        <div className='Title'>
          <div className='Title1'>
            <h4>Create an Event</h4>
        
            </div>
            <form onSubmit={handleSubmit(addNewEvent)}>
          <div className='main1'>
         <div className='fileupload'>
        <input type="file" id="image" placeholder="Event Fullname" className="form-control" {...register("image", { required: true })} onInput={onFileSelect}/>
        </div>
        <input type="text" id="Name1"placeholder="Event Fullname" className='form-control' {...register("Name1",{required:true})}/>
        <input type="text" id="Name2"placeholder="Event hosting Club" className='form-control' {...register("Name2",{required:true})}/>
        <input type="text" id="Location"placeholder="Auditorium Location" className='form-control' {...register("Location",{required:true})}/>
        
        <input type="text" id="Sname" placeholder="Auditorium Supervisor Name" className='form-control' {...register("Sname",{required:true})}/>
        <input type="number" id="Phone"placeholder="Auditorium Supervisor PhoneNumber" className='form-control' {...register("Phone",{required:true})}/>
        <input type="number" id="fee"placeholder="Registration fee" className='form-control' {...register("fee",{required:true})}/>
        <textarea id="content" placeholder="Description of Event" name="postContent" className='form-control' {...register("content",{required:true})} rows={4} cols={50} />
    
             
              {errors.category?.type === "required" && (
                <p className="text-danger fw-bold fs-5">
                  Priority is required
                
                </p>
              )}
           
        {errors.name?.type==="required"&&<p className='text-danger'>*Task is Required</p>}
        </div>
        <div className='btns1'>
        <Button variant="contained" className="btn1 contain9"type="submit"><AddCircleIcon/>  Add</Button>
        <Button variant="contained" className="btn contain10 " type='reset' ><ClearRoundedIcon/>  Cancel</Button> 
        </div>
        </form>
           
        </div>
    </div>
   
 </Box>
 </div>
    </Box>
    </>
  )
}

export default HostEvent