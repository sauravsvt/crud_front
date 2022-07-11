import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate, NavLink , useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import {  ToastContainer ,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';

function Signin() {
  const [cookies, setCookie] = useCookies(['data']);

    const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const { email,  password} = values;

  const inputHandler = (e) => {
    let val = e.target.value;
    setValues({...values, [e.target.name] : val})
}

 const { handleSubmit, register, formState: { errors } } = useForm();
let navigate = useNavigate();

const onSubmit = () =>{
  axios.post("http://localhost:3001/login", values).then((response)=> {
    setCookie('data', response.data.accessToken)
    localStorage.setItem("data", JSON.stringify(response.data.accessToken))
    navigate('/home')
    console.log(response.data.message)
    toast.success(response.data.message);
  
  }).catch((err) => {
    console.log(err, "Error")
    toast.error(err.response.data.error)
    toast.error(err.response.data.msg)
  })
  
} 
const RegisterUser = () => {
  navigate('/register')
}



  return (
  <>
  <h1 style={{color: "blue"}}>Sign In</h1>
        <br></br>

      <input type="text"
   {...register("email", {
      required: "Please enter email",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "invalid email address"
      }})} 
      
  
  placeholder="Email" name="email" value={email} onChange={inputHandler} />
  <div className="errormessage">
  {errors.email && errors.email.message}
</div>
  <input type="password" 
   {...register("password", {required: "Please enter at least 6 digit password", minLength: 6})}
  placeholder="Password" name="password" value={password} onChange={inputHandler} />
  <div className="errormessage">
  {errors.password && errors.password.message}
 </div>
 
 <button type="submit" onClick={handleSubmit(onSubmit)} > Login</button>
  {/* <button type="submit" onClick={onSubmit} > Login without ReactHook</button> */}
 <button onClick={RegisterUser}> Create an Account</button>
<ToastContainer/>
  </>
  )
}

export default Signin
