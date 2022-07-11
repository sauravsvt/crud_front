import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import jwt_decode from "jwt-decode";


function Map() {

    const [APIData, setAPIData] = useState([]);
    const [URLTrue, setURLTrue] = useState(true);

      const loadUser = () => {
        axios.get(`http://localhost:3001/search/?q=`
    ).then(response => {
     setAPIData(response.data);
      console.log(response.data, "sadc");
      // settotalItems(response.data.totalItems);
    })
        //console.log(result.data.users)
        
      };

      const SearchBar = async (event) => {
        console.log(event.target.value)
        let key = event.target.value
        axios.get(`http://localhost:3001/search/?q=${key}`
    ).then(response => {
      
     setAPIData(response.data);
   
      // settotalItems(response.data.totalItems);
    })
      }


       useEffect(() => {
        loadUser();
       }, []);
  
  



  return (

  <>
  <div className="searchbox">
  <input type='text' placeholder = 'Search Employees'
  onChange= {SearchBar}  
   />
</div>

    <h1>List of Employees</h1>
  
    <table>
  <tbody>
          <tr>
              <th>id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Amount</th>
              <th>Deduction</th>
              <th>Technologies</th>
            
          </tr>
          </tbody>
      { 
        APIData.length>0 ?
        APIData.map((valuee) =>  { 

          return(
            <tbody>
             <tr key={valuee.id}>  
              <td>{valuee.id}</td>
              <td>{valuee.name}</td>
              <td>{valuee.email}</td>
              <td>{valuee.phone}</td>
              <td>{valuee.amount}</td>
              <td>{valuee.monthly_deduction}</td>
              <td>{valuee.technologies}</td>
             {/* <td>{
                valuee.salaries.map((data) =>{
                    return(
               <tbody>
                <tr>{data.monthly_deduction}</tr>
               </tbody>
                    )
                })
             }</td> */}

             {/* <td>{
                valuee.departments.map((technologies) =>{
                    return(
               <tbody>
                <tr>{technologies.technologies}</tr>
               </tbody>
                    )
                })
             }</td> */}
          </tr>
          </tbody>
          )

      

      } 
      
      )
      
      : <h2> NO RESULT FOUND</h2>}
      </table>

      

  </>
  )
}

export default Map