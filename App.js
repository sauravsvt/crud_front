import React, { useEffect, useState } from "react";
import axios from "axios";
import './App.css';
import {BrowserRouter as Router, Routes, Route , Link, Navigate} from 'react-router-dom'
import Home from "./Pages/Home";
import Update from "./Pages/Update";
import Register from "./Pages/Register";
import Signin from "./Pages/Signin";
import Protected from './Pages/Protected';
import ChangePassword from "./Pages/ChangePassword";
import SendEmail from "./Pages/SendEmail";
import Forgot from "./Pages/Forgot";
import ConfirmEmail from "./Pages/ConfirmEmail";
import SetPassword from "./Pages/SetPassword";
import SelfUpdate from "./Pages/SelfUpdate";
import Protected2 from "./Pages/Protected2";
import Protected3 from "./Pages/Protected3";
import RegisterAdmin from "./Pages/RegisterAdmin";
import IfElse from "./Pages/IfElse";
import EmployeeList from './Pages/EmployeeList'
import Map from "./Pages/Map";
import EditDetails from "./Pages/EditDetails";

function App() {
  let storeToken = localStorage.getItem("data");
  function isLoggedin () {
    let storeToken = localStorage.getItem("data");
    if(storeToken){
     return <Navigate to = "/home"/>
    }
    return <Navigate to = "/login" />
  
  }

  return (
  <>
  <h1>Full Auth System with JWT</h1>


    <Router>
    <nav>

    <Link to ="/home">UserList</Link>

 

    </nav>

      <Routes>
      <Route path='/'  element={ <Protected component={Home}>
 <Home />
 </Protected>} />


 <Route path='/register'  element={ <Protected2 component={Register}>
 <Register />
 </Protected2>} />

      {/* <Route path='/register' element={<Register />} /> */}
       <Route path='/home'  element={ <Protected component={Home}>
 <Home />
 </Protected>} />
 <Route path='/ChangePassword/'  element={ <Protected component={ChangePassword}>
 <ChangePassword />
 </Protected>} />
 <Route path='/SendEmail'  element={ <Protected component={SendEmail}>
 <SendEmail />
 </Protected>} />
 <Route path='/set-password/verify-email?token='  element={ <Protected component={Forgot}>
 <Forgot />
 </Protected>} />

 <Route path='/updateuser/:id'   element={ <Protected3 component={Update}>
 <Update />
 </Protected3>} />

 <Route path='/SignUpAdmin'   element={ <Protected3 component={RegisterAdmin}>
 <Update />
 </Protected3>} />

 <Route path='/login'  element={ <Protected2 component={Signin}>
 <Signin />
 </Protected2>} />
    
       <Route path='/confirmEmail/' element={<ConfirmEmail />} />
       <Route path='/ifElse/' element={<IfElse />} />
       <Route path='/EmployeeList/' element={<EmployeeList />} />
       <Route path='/Map/' element={<Map />} />
    
       
       <Route path='/confirmed/:confirmationCode' element={<SetPassword />} />
       <Route path='/selfUpdate' element={ <Protected component={SelfUpdate}>
 <SelfUpdate />
 </Protected>} />


 <Route path='/adddetails' element={ <Protected component={EditDetails}>
 <SelfUpdate />
 </Protected>} />

      </Routes>
    </Router>

   
    </>
    
  
  );
}

 export default App;
