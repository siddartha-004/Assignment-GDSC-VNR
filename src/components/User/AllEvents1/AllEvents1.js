
import React,{useState,useEffect,useContext} from 'react'
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import DescriptionIcon from '@mui/icons-material/Description';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import {useForm} from 'react-hook-form'
import './AllEvents1.css'
import axios from 'axios'
import NavBar1 from '../NavBar1/NavBar1';
import Box from '@mui/material/Box';
import SideBar1 from '../SideBar1/SideBar1';
function AllEvents1() {
  const [show, setShow] = useState(false);
  let {register,handleSubmit,reset,formState:{errors},setValue,getValues}=useForm();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let [error,setError]=useState("")
  let [Event,setEvent]=useState([])
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
 let registerEvent=()=>{
  handleShow();
  }

 let registerEvent1=()=>{
  let modifiedUser=getValues();
  axios
  .post("http://localhost:4000/ConsumerHome-api/register-byuser", modifiedUser)
  .then((response) => {
 
    if (response.status === 201) {
    
      console.log("added")
      Swal.fire({
        icon: 'success',
        title: 'You are registered',
        text: 'See you on event',
      });
      handleClose();
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
}
  return (
    <>
    <NavBar1/>
  <Box height={40}/>
  <Box sx={{ display: 'flex' }}>
  <SideBar1/>
  <div>
      <div className='row row-cols-3'>
        <div className='point'>
    <h5>Available Events:</h5>
    </div>
    {Event.map((todoobj)=>{
     return ( 
      <div className='card'>
       <div className='icons'><button><HowToRegIcon onClick={()=>registerEvent()} className='icon' />Register</button></div>
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
        <Modal.Title id="contained-modal-title-vcenter">Register Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form >
        <div className='main2'>
     
      <input type="text" id="Name" width="200px"placeholder=" Fullname" className='form-control' {...register("Name",{required:true})}/>
      
      <input type="text" id="Year and section"placeholder="Year and Section" className='form-control' {...register("Year and Section",{required:true})}/>
      <input type="number" id="Phone"placeholder="Phone no" className='form-control' {...register("Phone",{required:true})}/>
      <input type="email" id="Email"placeholder="Email Id" className='form-control' {...register("Email",{required:true})}/>
  
      </div>
     
      </form>
      </Modal.Body>
      <Modal.Footer>
        <Button  variant="info" onClick={()=>{handleClose()}}>
          <CancelPresentationIcon/>  Close
        </Button>{' '}
        <Button  variant="info" onClick={()=>{registerEvent1()}}>
          <SaveAltIcon/>  Save
        </Button>{' '}
      
      </Modal.Footer>
    </Modal> 
  </div>
  
  </Box>
  </>
  )
}


export default AllEvents1