import React from 'react'
import { Navigate } from 'react-router-dom'
import Home from './Home';
import jwt_decode from "jwt-decode";


const Protected3 = ({ component: Component, ...rest }) => {
    const isAdmin = () => {
        let storeToken = localStorage.getItem("data");
        var decoded = jwt_decode(storeToken);
         var id = decoded.id
        var email = decoded.email
         var name = decoded.name
         var role = decoded.role

        if ( role === 'admin') {
            return true;
        }
        return false;
    }
    if (isAdmin()) {
       
        return <Component {...rest} />
    }

    return    <Navigate to='/login' />
}

export default Protected3