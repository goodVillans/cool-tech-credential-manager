import useAuthContext from "./useAuthContext";

const useLogout = () => {
   const { dispatch } = useAuthContext();

   const logout =  () => {
      // set user to null in AuthContext
      dispatch({type: 'LOGOUT'});
   }

  return {
       logout,
  }
}

export default useLogout
