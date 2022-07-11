import React from 'react'
import jwt_decode from "jwt-decode";
import axios from 'axios';


function SendEmail() {
    let storeToken = localStorage.getItem("data");
    var decoded = jwt_decode(storeToken);
    var id = decoded.id
    var email = decoded.email
    var Ftoken = (storeToken.replace(/['"]+/g, ''));
    
    axios
    .get(`http://localhost:3001/send-email/${Ftoken}`)
    .then((response) => {
            console.log(response.data.msg)
    }).catch((err) => {
        console.log(err.response.data.error)
    });

    // axios
    // .get(`http://localhost:3001/set-password/${id}/${Ftoken}`)
    // .then((response) => {
    //   console.log(response.data.msg);
    //   if(response.data.msg === Ftoken) {
    //     console.log("token matched")
    //   }
    // });


  return (
    <>
        <h1>Please check <br></br>{email}  <br></br>to verify your account  </h1>
    </>
  )
}

export default SendEmail