import { Link } from 'react-router-dom'
import { useState } from "react"
import useLogin from '../hooks/useLogin'


function Login() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const {login, error, isLoading} = useLogin();
   // handle login submit
   const handleLogin = async (e) => {
      e.preventDefault()
      await login(email, password);
   } 
  return (
      <div className="hero min-h-screen bg-base-200">
         <div className="hero-content flex-col lg:flex-row">
            <div className="text-center lg:text-left lg:pr-10 md: mb-5">
               <h1 className="text-5xl font-bold">CoolTech Inc.</h1>
               <p className="pt-6 pb-2 font-semibold">Welcome to CoolTechs Solution to credential management</p>
               <p>View, Manage and become familiar with all cross-company credentials and Employees.</p>
            </div>
            <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
               <div className="card-body">
               <form className="login-form" onSubmit={handleLogin}>
                  
                  {/* email filed */}
                  <div className="form-control email-container">
                     <label className="label">
                        <span className="label-text">
                           Email
                        </span>
                     </label>
                     <input 
                        type="text" 
                        placeholder="email" 
                        className="input input-bordered" 
                        value={email}
                        onChange={(e) => (setEmail(e.target.value))}
                     />
                  </div>

                  {/* password field */}
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">
                           Password
                        </span>
                     </label>
                     <input 
                        type="password" 
                        placeholder="password" 
                        className="input input-bordered" 
                        value={password}
                        onChange={(e) => (setPassword(e.target.value))}
                     />
                  </div>
                  
                  <div className="form-control mt-6">
                     <button className="btn btn-primary" disabled={isLoading}>
                        Login
                     </button>
                  </div>
                  {error && <div className="text-red-500 bg-error-content my-5 p-2 rounded-md">{error}</div>}
               </form>
               <div>
                  <span className="text-xs">Need an account? </span>
                  <span className="text-xs text-accent"><Link to={'/register'}>Register Here</Link></span>
               </div>
               </div>
            </div>
         </div>
      </div>
  )
}

export default Login
