/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useReducer, useEffect } from "react";


export const AuthContext = createContext();

export const AuthReducer = (state, action) => {
   switch (action.type) {
      case 'LOGIN':
         return {
         user: action.payload,
         };
      case 'LOGOUT':
         localStorage.removeItem("user");
         return {
         user: null,
         };
      default:
         return state;
   }
}

export const AuthContextProvider = ({ children }) => {
   const [state, dispatch] = useReducer(AuthReducer, {
      user: JSON.parse(localStorage.getItem('user')) || null,
   });

   // check if user is logged in
   useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      
      // login if user is not null
      if (user) {
         dispatch({type: 'LOGIN', payload: user});
      }
   }, [])

   return (
      <AuthContext.Provider value={{ ...state, dispatch }}>
         { children }
      </AuthContext.Provider>
   );
}

