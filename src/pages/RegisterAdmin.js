import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate, NavLink , useNavigate, useParams} from "react-router-dom";
import { useForm} from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        phone: '',
        status: '',
        password: ''
      });

    const {name, email, phone, status, password} = values;

    const inputHandler = (e) => {
        let val = e.target.value;
        setValues({...values, [e.target.name] : val})
    }
  
    const { handleSubmit, register, formState: { errors } } = useForm();
    let navigate = useNavigate();
    const onSubmit = () =>{
      //register user with uuidv4
      axios.post("http://localhost:3001/regwithAdmin", values)
      .then((res)=> {
        toast.success(res.data.msg)
      })
        .catch((err) => {
          console.log(err.response.data.msg)
          toast.error(err.response.data.msg)
  
        })

       
      } 

 
  
  return (
    <>
<div className="form">
         <h1 style={{color: "green"}}>Welcome to Admin Registration</h1>

          <input type="text" 
        {...register("name", {required: "Please enter your full name", minLength: 2, maxLength: 20})}
        placeholder="Name" name="name" value={name} onChange={e => inputHandler(e)} />
        <div className="errormessage">
        {errors.name && errors.name.message}
        </div>
  
          <input type="email"
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


            <input type="number" 
            {...register("phone", {required: "Please enter 10 digit mobile", 
            minLength: 10, maxLength: 10})}
            
            placeholder="Phone" name="phone" value={phone} onChange={inputHandler} />
              <div className="errormessage">
          {errors.phone && errors.phone.message}
          </div>
          <div>
          <input type="password" 
   {...register("password", {required: "Please enter at least 6 digit password", minLength: 6})}
  placeholder="Password" name="password" value={password} onChange={inputHandler} />
 {errors.password && errors.password.message}<br></br> <br></br> 
          </div>

          <div>

          <input type="radio" 
   {...register("status", {required: "Please check status"})}
  value="active" name="status" defaultValue={status}  onChange={inputHandler}/> Active
  <input type="radio"
  {...register("status", {required: "Please check status"})}
   value="inactive" name="status" defaultValue={status} onChange={inputHandler}/> Inactive
   {errors.status && errors.status.message}
          </div>

   

 

  </div>


<button type="submit" onClick={handleSubmit(onSubmit)} > Submit</button>

   <ToastContainer/>
  </>
    
  )
}

export default Register