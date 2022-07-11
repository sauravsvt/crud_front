import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate, NavLink , useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt_decode from "jwt-decode";
function Forgot() {
  let navigate = useNavigate();
  let storeToken = localStorage.getItem("data");
  var decoded = jwt_decode(storeToken);
  var id = decoded.id
  var email = decoded.email
  var name = decoded.name
  var Ftoken = (storeToken.replace(/['"]+/g, ''));

  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    status: '',
   });

   const { password} = values;

   const inputHandler = (e) => {
    let val = e.target.value;
    setValues({...values, [e.target.name] : val});
  };

  const { handleSubmit, register, formState: { errors } } = useForm();


  const onSubmit = () => {
    const link = `http://localhost:3001/set-password/${id}/${Ftoken}`
    axios.put(link, values).then((response)=> {
     console.log(response.data.message)
   })
 };


  const ClickLink =() => {
    
    const link = `http://localhost:3001/set-password/${id}/${Ftoken}`
    axios.put(link, ).then((response) => {
      console.log(response.data.msg)
      if(response.data.msg) {
        navigate('/home')
      }
    })
  } 
 

  return (
    <>
        <h1> Change Your Password <br></br>{name}</h1>
        <input type="password" 
   {...register("password", {required: "Please enter at least 6 digit password", minLength: 6})}
  placeholder="Password" name="password" value={password} onChange={inputHandler} />
 <br></br><br></br> {errors.password && errors.password.message}<br></br> <br></br> 

 <button type="submit" onClick={handleSubmit(onSubmit)} > Submit</button>
    
    </>
  )
}

export default Forgot