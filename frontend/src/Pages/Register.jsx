import { Link } from "react-router-dom"
import { useState } from "react"
import useRegister from "../hooks/useRegister"



const Register = () => {
   const [email, setEmail] = useState('');
   const [name, setName] = useState('');
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const { register, error, isLoading } = useRegister();
   // form handler
   const handleRegister = async (e) => {
      e.preventDefault();
      await register(username, password, email, name);  
   }

  return (
   <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
         <div className="text-center lg:text-left lg:pr-10 md: mb-5">
            <h1 className="text-5xl font-bold">CoolTech Inc.</h1>
            <p className="pt-6 pb-2 font-semibold">
               Welcome to CoolTechs Solution to credential management
            </p>
            <p>View, Manage and become familiar with all cross-company credentials and Employees.</p>
         </div>
         <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
            <div className="card-body">
            <form className="register-form" onSubmit={handleRegister}>
               
               {/* Name Field */}
               <div className="form-control full-name-container">
                  <label className="label">
                     <span className="label-text">
                        Full Name
                     </span>
                  </label>
                  <input 
                     type="text" 
                     placeholder="'John Doe'"
                     className="input input-bordered" 
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                  />
               </div>
               
               {/* email field */}
               <div className="form-control email-container">
                  <label className="label">
                     <span className="label-text">
                        Email
                     </span>
                  </label>
                  <input 
                  type="email" 
                  placeholder="'JonDoe@cooltech.com'" 
                  className="input input-bordered" 
                  value={email}
                  onChange={(e) => {setEmail(e.target.value)}}
                  />
               </div>
               
               {/* username field */}
               <div className="form-control username-container">
                  <label className="label">
                     <span className="label-text">
                        Username
                     </span>
                  </label>
                  <input 
                     type="text" 
                     placeholder="'JohnDoughBoy'" 
                     className="input input-bordered" 
                     value={username}
                     onChange={(e) => {setUsername(e.target.value)}}
                  />
               </div>
               
               {/* Password field */}
               <div className="form-control password-container">
                  <label className="label">
                     <span className="label-text">
                        Password
                     </span>
                  </label>
                  <input 
                     type="password" 
                     placeholder="must be 8+ chars, mixed case, use symbols too!" 
                     className="input input-bordered" 
                     value={password}
                     onChange={(e) => {setPassword(e.target.value)}}
                     />
               </div>

               {/* submit form */}
               <div className="form-control mt-6 submit-container">
                  <button className="btn btn-primary" disabled={isLoading}>Register</button>
               </div>
               {error && <div className="text-red-500 bg-error-content my-5 p-2 rounded-md">{error}</div>}
            </form>
            <div>
               <span className="text-xs">Already Have an Account? </span>
               <span className="text-xs text-accent"><Link to={'/'}>Login Here</Link></span>
            </div>
            </div>
         </div>
      </div>
   </div>
  )
}      
export default Register