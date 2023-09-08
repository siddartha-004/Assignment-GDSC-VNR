
import React,{useState,useEffect,useContext} from 'react'

import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import DescriptionIcon from '@mui/icons-material/Description';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import SideBar from '../SideBar/SideBar';
import Box from '@mui/material/Box';
import NavBar from '../NavBar/NavBar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import SaveAltIcon from '@mui/icons-material/SaveAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useForm} from 'react-hook-form'
import './AllEvents.css'
import axios from 'axios'
function AllEvents() {

  const [show, setShow] = useState(false);
  let {register,handleSubmit,reset,formState:{errors},setValue,getValues}=useForm();
  let [selectedFile,setSelectedFile]=useState(null)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let [EventToEdit,setEventToEdit]=useState({});
  let [Event,setEvent]=useState([])
  let [error,setError]=useState("")
  const onFileSelect=(e)=>{
    setSelectedFile(e.target.files[0])
}
  
  let getEvents=()=>{
     axios.get("http://localhost:4000/AdminHome-api/get-event")
     .then((response)=>{
    
        console.log(response.data)
          setEvent(response.data.payload)
          
          console.log("done");
          
      
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
     }
     )
  }
  useEffect(()=>{
    const interval = setInterval(() => {
      getEvents();},1000);
      return () => clearInterval(interval);
  }, []);
let EditEvent=(Name1Tobeedited)=>{
  if(window.confirm(`Are you sure you want to edit? ${Name1Tobeedited.Name1}`)){
  handleShow();
  setEventToEdit(Name1Tobeedited);
 
 setValue("Name1",Name1Tobeedited.Name1);
 setValue("Name2",Name1Tobeedited.Name2);
 setValue("Sname",Name1Tobeedited.Sname);
 setValue("Phone",Name1Tobeedited.Phone);
 setValue("content",Name1Tobeedited.content);
 setValue("Location",Name1Tobeedited.Location);
 setValue("fee",Name1Tobeedited.fee);
 setValue("image",Name1Tobeedited.image);
  }
}
let saveEvent=()=>{
  let modifiedEvent=getValues();
  modifiedEvent.id=setEventToEdit.id;

  axios.put(`http://localhost:4000/AdminHome-api/edit-event/${modifiedEvent.id}`,modifiedEvent)
  .then(res=>{
    if(res.status===201)
    {
      console.log("done1");
      Swal.fire({
        icon: 'success',
        title: 'Event Saved Successfully!',
        text: ' Event has been changed successfully.',
      });
      handleClose();

    }
  }).catch(err=>{})
}
  let deleteEvent =(Name1) =>{
   
      if(window.confirm(`Are you sure you want to delete? ${Name1}`)){
        axios.delete(`http://localhost:4000/AdminHome-api/remove/${Name1}`).then((response)=>{
      Swal.fire({
        icon: 'success',
        title: Name1,
        text:'Deleted Successfully',
      });
    }).catch((err)=>{
      Swal.fire({
        icon: 'error',
        title: 'Cannot Delete Event!Try Again',
        text:err.message,
      });
        });
      }else{

      }
     
    }
   
  
  
    
    
  return (
    <>
      <NavBar/>
    <Box height={40}/>
    <Box sx={{ display: 'flex' }}>
    <SideBar/>
    <div>
        <div className='row row-cols-3'>
          <div className="point">
      <h5>Events:</h5>
      </div>
      {Event.map((todoobj)=>{
       return ( 
        <div className='card'>
          <div className='icons'><button><EditIcon  className='icon' onClick={()=>{EditEvent(todoobj)}}/></button><button><DeleteIcon className='icon' onClick={()=>{deleteEvent(todoobj.Name1)}}/></button></div>
          <div className='hi'>
            <EmojiEventsIcon/><h5>{todoobj.Name1}</h5>
            <LocationOnIcon/><h6>Location:</h6>
            <p> {todoobj.Location}</p>
            <CurrencyRupeeIcon/><h6>Fee:</h6>
            <p> {todoobj.fee}</p>
            <ManageAccountsIcon/><h6>Coordinator Details:</h6>
            <p>{todoobj.Sname},+91{todoobj.Phone}</p>
            <DescriptionIcon/><h6>Description:</h6>
            <p>{todoobj.content}</p>
           </div>
              <div className='cover'>
                <div className='coverfront'>
                  <div>
                  <h4>{todoobj.Name2}</h4>
                   <img src={todoobj.image} width="190px" height="250px" className='imdg' alt="not available"/>
                   </div>
                </div>
                <div className='coverback'></div>
              </div>
             </div>
       )
      })}
      </div>
      <Modal show={show} onHide={handleClose} size="lg"
      aria-labelledby="contained-modal-title-vcenter" backdrop="static"
      centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Edit Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form >
          <div className='main2'>
       
        <input type="text" id="Name1" width="200px"placeholder=" Fullname" className='form-control' {...register("Name1",{required:true})}/>
        <input type="text" id="Name2"placeholder=" Shortname" className='form-control' {...register("Name2",{required:true})}/>
        <input type="text" id="Location"placeholder="Auditorium Location" className='form-control' {...register("Location",{required:true})}/>
        <input type="number" id="fee"placeholder="Registration fee" className='form-control' {...register("fee",{required:true})}/>
        <input type="text" id="Sname"placeholder="Coordinator Name" className='form-control' {...register("Sname",{required:true})}/>
        <input type="number" id="Phone"placeholder=" Coordinator PhoneNumber" className='form-control' {...register("Phone",{required:true})}/>
        <textarea id="content" placeholder="Description of Event" name="postContent" className='form-control' {...register("content",{required:true})} rows={2} cols={50} />
    
        </div>
       
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button  variant="info" onClick={()=>{handleClose()}}>
            <CancelPresentationIcon/>  Close
          </Button>{' '}
          <Button  variant="info" onClick={()=>{saveEvent()}}>
            <SaveAltIcon/>  Save
          </Button>{' '}
        
        </Modal.Footer>
      </Modal>
    </div>
    
    </Box>
    </>
  )
}


export default AllEvents