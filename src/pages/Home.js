import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import jwt_decode from "jwt-decode";
function Home() {

  let navigate = useNavigate();
  let storeToken = localStorage.getItem("data");
  var decoded = jwt_decode(storeToken);
  var id = decoded.id
  var email = decoded.email
  var name = decoded.name
  var role = decoded.role
  console.log(role)
  const [Show, setShow] = useState(true);



  const ChangePassword = () => {
      navigate('/ChangePassword')
  }


  const VerifyRole = () => {
    if ( role === 'admin') {
      return true
     
  }
 return false
  }
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    status: '',
    role:''
   });

   const [APIData, setAPIData] = useState([]);
 
   
   const loadUser = (currentPage) => {
    let page = currentPage;
    let size = itemsPerPage;
    axios.get(`http://localhost:3001/get`,{
      params: {'page' : page, 'size': size}
    }
).then(response => {
  setAPIData(response.data.users);
  console.log(response.data)
  settotalItems(response.data.totalItems);
})
    //console.log(result.data.users)
    
  };

  const [totalItems, settotalItems] = useState();
  const[itemsPerPage, setitemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const pages = [];
  
  for(let i=1; i<= Math.ceil(totalItems/itemsPerPage); i++){
    pages.push(i)
    }


    const handleChange = (event) => {
      setCurrentPage(event.target.id)
      loadUser(currentPage-1)
      console.log(currentPage)
    }


    const renderPageNum = pages.map(number => {
      return(
        <li key={number} id = {number} onClick={event => handleChange(event)} > {number}</li>
      )
     })
     useEffect(() => {
       loadUser(currentPage-1);
     }, [currentPage-1]);


    const logout = () => {
       localStorage.clear()
       console.log(localStorage)
        console.log("Logout")
        navigate('/login')
    }

    const SelfUpdate =() => {
      navigate(`/selfUpdate`)

    }

    const AddUser =() => {
      navigate(`/SignUpAdmin`)

    }

    const EditDetails =() => {
      navigate(`/adddetails`)
    }


    const EmployeeDetails =() => {
      navigate(`/Map`)
    }

    const deleteUser =  (id) => { 
      let text = "Press yes to delete or Cancel to Cancel deletion"
      if (window.confirm(text) == true) {
              axios
                .delete(`http://localhost:3001/delete/${id}`)
                .then((response) => {
                  console.log("ABAC");
                  console.log(response.data.message);
                 // toast.success(response.data.message);
                  window.location.reload(false);
                });
        
      }
      else{
        console.log("No")
      }

     }
  return (
  
    <>
    
    <button onClick={ChangePassword}> Change Password</button>
    <button onClick= {logout}> Logout</button>
    <button onClick= {EmployeeDetails}> EmployeeDetails</button>
    <button onClick= {SelfUpdate}> Update Profile</button>
    {
        VerifyRole() ? <button onClick={AddUser}> Register More Users</button> : null
    }
    
    <h1>Welcome, {name}</h1>
    <div className="Profile">
    <button onClick= {EditDetails}> Add About Yourself</button>
      <h2>Your Profile</h2>
      <p> Your Name: {name}</p>
      <p> Your Email: {email}</p>
      <p> Your Role: {role}</p>
    </div>
     <table>
  <tbody>
          <tr>
              <th>id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Role</th>
            
          </tr>
          </tbody>
      {APIData.map((valuee) =>  {

        if(role ==="admin"){
          return(
            <tbody>
             <tr key={valuee.id}>  
              <td>{valuee.id}</td>
              <td>{valuee.name}</td>
              <td>{valuee.email}</td>
              <td>{valuee.phone}</td>
              <td>{valuee.status}</td>
              <td>{valuee.role}</td>
              <td><button onClick={() =>deleteUser(valuee.id)}>Delete</button>
              <Link to ={"/updateUser/"+valuee.id}>Update</Link>
              </td>
           
          </tr>
          </tbody>
          )
      
        }
        else {
          return(
            <tbody>
          <tr key={valuee.id}>  
              <td>{valuee.id}</td>
              <td>{valuee.name}</td>
              <td>{valuee.email}</td>
              <td>{valuee.phone}</td>
              <td>{valuee.status}</td>
              <td>{valuee.role}</td>
          </tr>
          </tbody>
          )

        }
      

      })}
      </table>
      <ul className="pageNum" >{renderPageNum}</ul>
     

      <p></p>  <p></p> <p></p> <p></p>
      <p>Total Entries= {totalItems}
      <br></br> You are on page {currentPage} 
    </p>

    </>
  )
}

export default Home