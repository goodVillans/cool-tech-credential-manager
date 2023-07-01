import { Link } from 'react-router-dom'

const SuccessfulRegistration = () => {
  return (
    <div>
   <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
         <div className="max-w-md">
            <h1 className="text-5xl font-bold">Registration Successful!</h1>
            <p className="py-6">login below to access the credential app</p>
            <button className="btn btn-primary">
               <Link to='/'>
                  go to Login
               </Link>
            </button>
         </div>
      </div>
   </div>
    </div>
  )
}

export default SuccessfulRegistration

