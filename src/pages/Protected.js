
import React from 'react'
import { Navigate } from 'react-router-dom'
import Home from './Home';
import jwt_decode from "jwt-decode";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const isLogin = () => {
        let storeToken = localStorage.getItem("data");
        if (storeToken) {
            return true;
        } return false;
    }
    if (isLogin()) {
        return <Component {...rest} />;
    }
    return <Navigate to='/login' />

}

export default ProtectedRoute;