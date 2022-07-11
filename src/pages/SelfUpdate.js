import React from 'react'
import { useEffect,  Fragment, useState } from 'react'
import axios from "axios";
import {   useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import jwt_decode from "jwt-decode";

function SelfUpdate() {

  let storeToken = localStorage.getItem("data");
  var decoded = jwt_decode(storeToken);
  var Ftoken = (storeToken.replace(/['"]+/g, ''));
  var id = decoded.id
  var email2 = decoded.email
  var name2 = decoded.name
  var role = decoded.role
  console.log(role)

    const [values, setValues] = useState({
        name: '',
        email: '',
        phone: '',
        status: '',
       });
       
     const {name, email, phone, status} = values;
     
     const inputHandler = (e) => {
       let val = e.target.value;
       setValues({...values, [e.target.name] : val});
     };
   
     useEffect(() => {
       const loadUser = async () => {
         const result = await axios.get(`http://localhost:3001/oneUser/${id}`)
         setValues(result.data);
       };
       loadUser();
     }, []);
   
   
     const { handleSubmit, register, formState: { errors } } = useForm();
   
     const history = useNavigate();
   
     const onSubmit = () => {
        axios.put(`http://localhost:3001/put/${id}/${Ftoken}`, values).then((response)=> {
         toast.success(response.data.message)
        //  setCookie('data', response.data.accessToken)
        console.log(response.data.accessToken)
        localStorage.setItem("data", JSON.stringify(response.data.accessToken))
       }).catch((err)=> {
        console.log(err.response.data.msg)
        toast.error(err.response.data.msg)
       })
     };
   
   
  return (
   <>
      <form>
    <input type="text" 
      {...register("name", {required: "Please enter your full name", minLength: 3, maxLength: 20})}
      
      placeholder="Name" name="name" value={name} onChange={e => inputHandler(e)} />
      <div className='errormessage'>
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
      <div className='errormessage'>
      {errors.email && errors.email.message}
</div>
      <input type="number" 
       {...register("phone", {required: "Please enter 10 digit mobile", minLength: 10, maxLength: 10})}
      
      placeholder="Phone" name="phone" value={phone} onChange={inputHandler} />
     <div className='errormessage'>
      {errors.phone && errors.phone.message} 
</div>
      <div>
      <input type="radio" 
   {...register("status", {required: "Please check status"})}
  value="active" name="status" value={"active"} checked = {status == "active" ? true:false}  onChange={inputHandler}/> Active
  <input type="radio"
  {...register("status", {required: "Please check status"})}
   value="inactive" name="status" value={"inactive"} checked={status =="inactive" ? true:false} onChange={inputHandler}/> Inactive
   <br></br><br></br>{errors.status && errors.status.message}<br></br> <br></br> 

       </div>
       <button type="submit" onClick={handleSubmit(onSubmit)} > Update</button>
      </form>
      <ToastContainer/>
   </>
  )
}

export default SelfUpdate