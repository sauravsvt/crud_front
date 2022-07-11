import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate, NavLink , useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt_decode from "jwt-decode";
function ChangePassword() {

  let storeToken = localStorage.getItem("data");
  var decoded = jwt_decode(storeToken);
  var id = decoded.id
  var email = decoded.email
  var name = decoded.name
  var Ftoken = (storeToken.replace(/['"]+/g, ''));

  const [values, setValues] = useState({
    old_password: '',
    password: ''
   });

   const { old_password, password} = values;

   const inputHandler = (e) => {
    let val = e.target.value;
    setValues({...values, [e.target.name] : val});
  };


  let navigate = useNavigate();
    const { handleSubmit, register, formState: { errors } } = useForm();
    const onSubmit = () => {
     
      const link2 = `http://localhost:3001/UpdatePassword/${email}`
      const link = `http://localhost:3001/set-password/${id}/${Ftoken}`
      axios.put(link2, values).then((response)=> {
       console.log(response.data)
       navigate('/login')
       toast.success(response.data.msg)
      
     }).catch((err) => {
      console.log(err)
     toast.error(err.response.data.msg)
     })
   };

  return (
    <>
    <h1> Change Your Password <br></br>{name}</h1>
    <input type="password" 
{...register("old_password", {required: "Please enter at least 6 digit password", minLength: 6})}
placeholder="Enter Old Password" name="old_password" value={old_password} onChange={inputHandler} />
<div className='errormessage'>
 {errors.old_password && errors.old_password.message}
 </div>

<input type="password" 
{...register("password", {required: "Please enter at least 6 digit password", minLength: 6})}
placeholder="Enter New Password" name="password" value={password} onChange={inputHandler} />
<div className='errormessage'>
 {errors.password && errors.password.message}
 </div>
<button type="submit" onClick={handleSubmit(onSubmit)} > Submit</button>
<ToastContainer/>
</>
  )
}

export default ChangePassword