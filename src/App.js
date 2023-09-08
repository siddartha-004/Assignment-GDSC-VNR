import React from 'react'
import Login from './components/login/Login'
import AllEvents1 from './components/User/AllEvents1/AllEvents1'
import NewUser from './components/Admin/NewUser/NewUser'
import AllEvents from './components/Admin/AllEvents/AllEvents'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import HostEvent from './components/Admin/HostEvent/HostEvent'

function App() {
  return (
    <div className='App'>
        <BrowserRouter>
        <Routes>
         <Route path='/'>
            
            <Route path="*" element={<div>Page not found</div>}></Route>
           <Route path="login">
            <Route index element={<Login/>}/>
            <Route path="signup" element={<NewUser/>}/>
            </Route>
            
           
            <Route path="UserHome">
              
               <Route index element={<AllEvents1/>}/>
        

            </Route>
            
            <Route path="AdminHome">
                <Route index element={<AllEvents/>}/>
                <Route path="newEvent" element={<HostEvent/>}/>
                
                
           
            
            </Route>   
         </Route> 
        
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App