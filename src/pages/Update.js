import { useEffect,  Fragment, useState } from 'react'
import axios from "axios";
import {   useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import jwt_decode from "jwt-decode";
function Update() {
  const [validUrl, setValidUrl] = useState(true);
   // const navigate = useNavigate();
    const {id} = useParams ();
    // const [Url, setUrl] = useState('');
    let storeToken = localStorage.getItem("data");
    var decoded = jwt_decode(storeToken);
    var id2 = decoded.id
    var email2 = decoded.email
    var name2 = decoded.name
    var role = decoded.role
    var token = (storeToken.replace(/['"]+/g, ''));
    console.log(role)
    console.log(id2)

    
    
    
    useEffect(() => {

		const verifyRole = async () => {
			try {
         let url = `http://localhost:3001/checkUA/${id}`
        const { data } = await axios.get(url);
				console.log(data);
				setValidUrl(true);
			} catch (error) {
        
				console.log(error);
				setValidUrl(false);
			}
		};

    verifyRole();
	}, [id]);  
 
    
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
     axios.put(`http://localhost:3001/updateUser/${id}`, values).then((response)=> {
      console.log("fasgdbrg", response)
      toast.success(response.data)
  
    }).catch((err) => {
      console.log("err", err)
      toast.error(err.response.data.msg)
 
    })
  };

  return (
    <Fragment>
 {validUrl  ? (
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
    ): (

<h1> Failed</h1>

  )
 }
 
</Fragment>
  )
}

export default Update