import UserCredentialsModal from '../Modals/UserCredentialsModal'
import UpdatePermissionsModal from '../Modals/UpdatePermissionsModal'
import useAuthContext from '../../hooks/useAuthContext'
import {FaEye, FaPen} from 'react-icons/fa'
import { useState } from 'react'
import PropTypes from 'prop-types'

function UserCredential({ credential, credential_Id }) {
   
   const { user } = useAuthContext();

   const [view, setViewOpen] = useState(false);
   const [edit, setEditOpen] = useState(false);
   const [userCredentials, setUserCredentials] = useState(credential.credentials);

   const showView = () =>{
      setViewOpen(true);
   }

   const closeView = () =>{
      setViewOpen(false);
   }

   const showEdit = () =>{
      setEditOpen(true);
   }

   const closeEdit = () =>{
      setEditOpen(false);
   }
   
  return (
    <>
      <tr>
         <td className=" w-3/12">
         <div className="flex items-center space-x-3">
            <div>
               <div className="font-bold ml-1">
                  {credential.user.name}
               </div>
            </div>
         </div>
         </td>
         <td className="w-3/12">
            <span className="badge badge-secondary badge-sm">
               {credential.user.email}
            </span>
         </td>
         <td className='w-3/12'>
            <span className="badge badge-primary badge-sm">
               {credential.user.role}
            </span>
         </td>
         <td className='w-1/12'>
            <button className="btn btn-ghost btn-xs" onClick={showView}>
               <FaEye />
            </button>
            {view && (
               <div className="bg-base w-full h-full">
                  <UserCredentialsModal closeView={closeView} credentials={userCredentials} setCredentials={setUserCredentials} credential_Id={credential_Id}/>
               </div>
            )}
         </td>
          {/* functionality is accessed on condition role requirements are met */}
         <td className='w-1/12'>
            {user.user.role === 'admin' ? (
               <>
               <button className="btn btn-ghost btn-xs" onClick={showEdit}>
                  <FaPen />
               </button>
               {edit && (
                  <div className="bg-base w-full h-full">
                     <UpdatePermissionsModal closeEdit={closeEdit} credential={credential}/>
                  </div>
               )}
               </>
            ) : (
               <button className="btn btn-ghost btn-xs tooltip tooltip-error" data-tip="admin users only">
                     <FaPen className='cursor-pointer disabled text-gray-500 opacity-40'/>
               </button>
            )}
         </td>
      </tr>
    </>
  )
}

UserCredential.propTypes = {
   credential: PropTypes.object.isRequired,
   credential_Id: PropTypes.string
}

export default UserCredential
