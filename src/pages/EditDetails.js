import React from 'react'
import { useEffect,  Fragment, useState } from 'react'
import axios from "axios";
import {   useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import jwt_decode from "jwt-decode";


function EditDetails() {

    let storeToken = localStorage.getItem("data");
    var decoded = jwt_decode(storeToken);
    var Ftoken = (storeToken.replace(/['"]+/g, ''));
    var id = decoded.id
    var email2 = decoded.email
    var name2 = decoded.name
    var role = decoded.role

    const [values, setValues] = useState({
      amount: '',
      monthly_deduction: '',
      days: '',
      tech: ""
     });
     

    const {amount, monthly_deduction, days, tech} = values;
     
    const inputHandler = (e) => {
      let val = e.target.value;
      setValues({...values, [e.target.name] : val});

    };
  

  
    const onSubmit = () => {
      console.log(values)
       axios.post(`http://localhost:3001/addDetails/${id}`, values).then((response)=> {
        console.log(response)
      }).catch((err)=> {
        console.log(err.response.data)
        toast.error(err.response.data)
      })
    };

    const onSubmitTech = () => {
    console.log(values)

      axios.post(`http://localhost:3001/techDetails/${id}`, values).then((response)=> {
       console.log(response.data)
     }).catch((err)=> {
       console.log(err.response.data.msg)
       toast.error(err.response.data.msg)
     })
    }
  
  
 return (
  <>
     <form>
   <input type="number" 
     
     placeholder="Amount" name="amount" value={amount} onChange={e => inputHandler(e)} />

<input type="number" 
     
     placeholder="monthly_deduction" name="monthly_deduction" value={monthly_deduction} onChange={e => inputHandler(e)} />

<input type="number" 
     
     placeholder="days" name="days" value={days} onChange={e => inputHandler(e)} />


<input type="text" 
        placeholder="tech" name="tech" value={tech} onChange={e => inputHandler(e)} />

     </form>
     <button onClick={onSubmit} > Add salary</button>
     <button onClick={onSubmitTech} > Add Technologies</button>
     <ToastContainer/>
  </>
 )
}

export default EditDetails