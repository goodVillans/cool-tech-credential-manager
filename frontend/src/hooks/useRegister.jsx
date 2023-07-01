/* eslint-disable no-unused-vars */
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import  useAuthContext  from './useAuthContext'


const useRegister = () => {
   const [error, setError] = useState(null);
   const [isLoading, setIsLoading] = useState(null);
   const {dispatch}  = useAuthContext();
   const navigate = useNavigate();

   const register = async (username, password, email, name) => {
      setIsLoading(true);
      setError(null);

      // post new user to backend
      const res = await fetch('http://localhost:3000/cool-tech/user/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, email, username, password})
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
        navigate('/registration-success')
      }

  }
   return {
      register,
      error,
      isLoading,
   }
   
}


export default useRegister
