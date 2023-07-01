import { useState } from 'react'
import useAuthContext from '../../hooks/useAuthContext'
import {FaTrash, FaPen, FaTimes} from 'react-icons/fa'
import PropTypes from 'prop-types'


const UserCredentialsModal = ({closeView, credentials, setCredentials, credential_Id}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const { user } = useAuthContext();

  // add new credential
  const postNewCredential = async () => {
    try{
      // make API call for posting new user credential
      const res = await fetch(`http://localhost:3000/cool-tech/credentials/${credential_Id}`, {
        method:'POST',
        headers: {
          'Authorization': `Bearer: ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
      });
      
  
    if(!res.ok) {
      throw new Error('Error posting new credential');
    }

    if(res.ok){
      // callback returns previous state and return new state
      setCredentials((prev) => [...prev, {username, password}]);
    }

    } catch (err) {
      console.error(err);
    }
    setUsername('');
    setPassword('');
  }
  // delete a credential
  const deleteCredential = async (username, password) => {
    
    try{
      const res = await fetch(
        `http://localhost:3000/cool-tech/credentials/${credential_Id}`, 
        {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer: ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password})
      });

      await res.json();

      if(!res.ok){
        throw new Error('Error Deleting Credential');
      }
      // update the local state to reflect the item that needs to be deleted
      setCredentials(prev => prev.filter(
        cred => cred.username !== username || cred.password !== password
        ));

    } catch (err) {
      console.error(err)
    }

  }
  
  // update a credential 
  const updateCredential = async (oldUsername, oldPassword, newUsername, newPassword) => {
    try {
      const res = await fetch(
        `http://localhost:3000/cool-tech/credentials/${credential_Id}`, 
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer: ${user.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({username: newUsername, password: newPassword})
        }
        );
        
        if(!res.ok) {
          throw new Error('Error updating credential');
        }
        
        // Update the local state to reflect the updated credential
        setCredentials(prev => prev.map(
          cred => (cred.username === oldUsername && cred.password === oldPassword) 
          ? {username: newUsername, password: newPassword} 
          : cred
          ));
          
        } catch (err) {
          console.error(err)
        }
        
  }

  // handle delete credential
  const handleDeleteTrigger = (username, password) => {  
    setUsername(username);
    setPassword(password);
    deleteCredential(username, password);
    setUsername('')
    setPassword('')
  } 

  // handle update form submission 
  const handleUpdateCredential = () => {
  updateCredential(username, password, newUsername, newPassword);
  setIsEditing(false);
  setUsername('');
  setPassword('');
  setNewUsername('');
  setNewPassword('');
  }

  // form control to handle editing mode
  const handleEditing = (username, password) => {
    setIsEditing(true);
    setUsername(username);
    setPassword(password);
    setNewUsername(username);
    setNewPassword(password);
  }
  // handle isEditing(true >> false)
  const handleCancelEditing = () => {
    setIsEditing(false);
    setUsername('');
    setPassword('');
    setNewUsername('');
    setNewPassword('');
  } 

  return (
  <div className='fixed inset-0 items-center justify-center bg-base-100 z-10 grid lg:grid-cols-2 gap-5 shadow-2xl w-full h-full justify-items-center p-20 sm:p-5 sm:overflow-y-auto'>
  
  {/* Existing credentials */}
  <div className= 
  {isEditing ? 
    "existing-credentials-container card flex-shrink-0 w-full shadow-2xl bg-base-300 overflow-auto" 
    :
    "existing-credentials-container card flex-shrink-0 w-full shadow-2xl bg-base-100 overflow-auto"
  }>
    <div className="card-body">
      <h2 className="my-4 text-2xl font-bold card-title">
        Existing User Credentials
      </h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Username</th>
            <th>Password</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
        {credentials.map((u_cred, index) => (
          <tr key={index}>
            <td>{u_cred.username}</td>
            <td>{u_cred.password}</td>
            {/* functionality is accessed on condition role requirements are met */}
            <td>
            {user.user.role === 'admin' ? 
              <FaTrash className='cursor-pointer' onClick={() => handleDeleteTrigger(u_cred.username, u_cred.password)}/> 
            : 
              <div className="tooltip tooltip-error" data-tip="admin users only">
                <FaTrash className='cursor-pointer disabled text-gray-500 opacity-40'/>
              </div>
            } 
            </td>
            {/* functionality is accessed on condition role requirements are met */}
            <td>
            {user.user.role === 'normal' ? 
              <div className="tooltip tooltip-error" data-tip="admin and manager users only">
              <FaPen className='cursor-pointer disabled text-gray-500 opacity-40'/>
              </div>  
            : 
              <FaPen className=' cursor-pointer disabled' onClick={() => handleEditing(u_cred.username, u_cred.password)}/> 
            } 
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  </div> 

  {/* Add new/update credential */}
  <div className=
    {isEditing ? 
      "new-credential-container card w-full shadow-2xl bg-base-300" 
      : 
      "new-credential-container card w-full shadow-2xl bg-base-10"
    }>
    <div className="card-body">
      {isEditing ?
      <button className="btn btn-xs" onClick={() => handleCancelEditing()}><FaTimes /><span>Cancel</span></button> : null
      }
      <h2 className="my-4 text-2xl font-bold card-title">
        {isEditing ? 'Edit User Credential' : 'Add New Credential'}
      </h2>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Username</span>
        </label>
        <input type="text" placeholder="Username" className="input input-bordered" value={isEditing ? newUsername : username} onChange={(e) => {isEditing ? setNewUsername(e.target.value) : setUsername(e.target.value)}} />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input type="password" placeholder="Password" className="input input-bordered" value={isEditing ? newPassword : password} onChange={(e) => {isEditing ? setNewPassword(e.target.value) : setPassword(e.target.value)}} />
      </div>
      <div className="form-control mt-6">
      {isEditing ? 
      <button className="btn btn-accent" onClick={handleUpdateCredential}>
          Update Credential
      </button>
      : 
      <button className="btn btn-primary" onClick={postNewCredential}>
        Add Credential
      </button>
      }

      </div>
    </div>
  </div>

  {/* Close Modal */}
  <div className="absolute right-10 top-10">
    <button className="btn btn-xs" onClick={closeView}>
      <FaTimes />
    </button>
  </div>

</div>

  )
}

UserCredentialsModal.propTypes = {
  closeView: PropTypes.func.isRequired,
  credentials: PropTypes.array.isRequired,
  setCredentials: PropTypes.func.isRequired,
  credential_Id: PropTypes.string
}

export default UserCredentialsModal
