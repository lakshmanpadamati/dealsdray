import React, { useContext,useEffect } from 'react'
import { AuthContext } from './AuthContext'
import { useNavigate,Outlet } from 'react-router-dom'

const Protected = ({ children }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!user) {
        navigate("/");  
      }
    }, [user, navigate]);
  
    return user ? <Outlet/>: null;  
  };

export default Protected