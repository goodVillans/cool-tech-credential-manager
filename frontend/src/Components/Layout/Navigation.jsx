import useLogout  from "../../hooks/useLogout";
import useAuthContext from "../../hooks/useAuthContext";
import {Link} from 'react-router-dom'


const Navigation = () => {
  const {logout} = useLogout();
  const { user } = useAuthContext();
  
  const handleClick = () => {
    logout();
  }
    return (
        <div className="navbar bg-base-100 mb-10">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-accent opacity-100 rounded-box w-52 z-10 text-slate-800">
                <li className="badge badge-primary badge-md mb-2"><span className=" font-semibold">{user.user.username}</span></li>
                <li className="badge badge-secondary badge-s mb-2"><span className=" font-semibold">{user.user.role}</span></li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost normal-case text-xl">CoolTech</a>
        </div>
        <div className="navbar-end">
          <Link to= '/' className="btn btn-ghost" onClick={() => handleClick()}>
            Logout
          </Link>
        </div>
      </div>
    );
}

export default Navigation;
