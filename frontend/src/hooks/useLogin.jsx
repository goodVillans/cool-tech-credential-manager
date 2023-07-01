/* eslint-disable no-unused-vars */
import { useState } from "react"
import {  useNavigate } from 'react-router-dom'
import  useAuthContext  from './useAuthContext'


const useLogin = () => {
   const [error, setError] = useState(null);
   const [isLoading, setIsLoading] = useState(null);
   const {dispatch}  = useAuthContext();

   const navigate = useNavigate();

   const login = async (email, password) => {
      setIsLoading(true);
      setError(null);

      // post new user to backend
      const res = await fetch('http://localhost:3000/cool-tech/user/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
      })

      const data = await res.json();
  
      if (!res.ok){
        setIsLoading(false);
        if (res.status === 400 || res.status === 500) {
          setError(data.message || res.status, 'Something went wrong');
        }
      }
      
      if (res.ok){
        // save user to local storage
        localStorage.setItem('user', JSON.stringify(data));
        // set user in AuthContext
        dispatch({type: 'LOGIN', payload: data});
        setIsLoading(false);
        navigate('/home');
      }

  }
   return {
      login,
      error,
      isLoading,
   }
   
}


export default useLogin
