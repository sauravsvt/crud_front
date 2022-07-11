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
      });

    const {name, email, phone} = values;

    const inputHandler = (e) => {
        let val = e.target.value;
        setValues({...values, [e.target.name] : val})
    }
  
    const { handleSubmit, register, formState: { errors } } = useForm();
    let navigate = useNavigate();
    const onSubmit = () =>{
      //register user with uuidv4
      axios.post("http://localhost:3001/send-email", values)
      .then((res)=> {
        toast.success(res.data.msg)
      })
        .catch((err) => {
          console.log(err.response.data.msg)
          toast.error(err.response.data.msg)
  
        })

       
      } 

 
      const LoginN = () =>{
        navigate('/login')
      }

  return (
    <>
<div className="form">
         <h1 style={{color: "blue"}}>Sign Up</h1>

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

 

  </div>


<button type="submit" onClick={handleSubmit(onSubmit)} > Submit</button>
   <button onClick={LoginN}> Already have an account?</button>
   <ToastContainer/>
  </>
    
  )
}

export default Register