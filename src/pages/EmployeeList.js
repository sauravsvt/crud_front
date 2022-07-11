import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import jwt_decode from "jwt-decode";

function EmployeeList() {

    const [APIData, setAPIData] = useState([]);
 

    const loadUser = (currentPage) => {
        let page = currentPage;
        let size = itemsPerPage;
        axios.get(`http://localhost:3001/EmployeeList`,{
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
  
  
const handleSearch =  async(event) => {
    console.log(event.target.value)
    let key = event.target.value
    // let result = 
}

  return (
  <>
  <div className="searchbox">
  <input type='text' placeholder = 'Search Employees'
  onChange= {handleSearch}  
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
      {APIData.map((valuee) =>  {
          return(
            <tbody>
             <tr key={valuee.id}>  
              <td>{valuee.id}</td>
              <td>{valuee.name}</td>
              <td>{valuee.email}</td>
              <td>{valuee.phone}</td>
             <td>{
                valuee.salaries.map((data) =>{
                    return(
               <tbody>
                <tr>{data.amount}</tr>
               </tbody>

                    )
                })
             }</td>
             <td>{
                valuee.salaries.map((data) =>{
                    return(
               <tbody>
                <tr>{data.monthly_deduction}</tr>
               </tbody>
                    )
                })
             }</td>

             <td>{
                valuee.departments.map((technologies) =>{
                    return(
               <tbody>
                <tr>{technologies.technologies}</tr>
               </tbody>
                    )
                })
             }</td>
          </tr>
          </tbody>
          )
      
        

      

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

export default EmployeeList