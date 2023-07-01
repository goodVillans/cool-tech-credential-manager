import { useState, useEffect } from 'react';
import useAuthContext from '../../hooks/useAuthContext';
import { FaTimes } from 'react-icons/fa'
import PropTypes from 'prop-types'

const UpdatePermissionsModal = ({ closeEdit, credential }) => {

  const { user } = useAuthContext();
  
  const [userInFocus, setUserInFocus] = useState(null);
  const [ous, setOus] = useState([]);
  const [selectedOUs, setSelectedOUs] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [allDivisions, setAllDivisions] = useState([]);
  const [selectedDivisions, setSelectedDivisions] = useState([]);
  const [selectedRole, setSelectedRole] = useState('')

  /* FETCH DATA */
  // fetch user in focus via Id
  const fetchUser = async () => {
    try{
      const res = await fetch(`http://localhost:3000/cool-tech/user/${credential.user._id}`);

      if (!res.ok) {
        throw new Error('Error fetching User');
      }

      const data = await res.json();
      setUserInFocus(data);
      setSelectedRole(data.role);
      setSelectedOUs(data.OU);
      setSelectedDivisions(data.divisions);
    } catch (err) {
      console.error('Error with fetch users: ', err)
    }
  }
  // fetch all OUs 
  const fetchOUs = async () => {
    try {
      const res = await fetch('http://localhost:3000/cool-tech/ou', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer: ${user.token}`,
          'Content-Type': 'application/json',
        }
      });
      if (!res.ok) {
        throw new Error('Error fetching Ous');
      }
      const data = await res.json();
      setOus(data);
    } catch (err) {
      console.error('There was an error!', err);
    }
  }
  // fetch all divisions
  const fetchDivisions = async () => {
    try {
      const res = await fetch('http://localhost:3000/cool-tech/divisions', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer: ${user.token}`,
          'Content-Type': 'application/json',
        }
      });
      if (!res.ok) {
        throw new Error('Error fetching Divisions');
      }
      const data = await res.json();
      setAllDivisions(data);
    } catch (err) {
      console.error('There was an error!', err);
    }
  }

  /* UPDATE DATA */
  // update user info
  const updateUser = async () => {
    const updatedUserInFocus = {
      OU: selectedOUs,
      divisions: selectedDivisions,
      role: selectedRole,
    };

    console.log(`user._id: ${userInFocus._id}`); 
  
    try {
      const res = await fetch(`http://localhost:3000/cool-tech/user/${userInFocus._id}`,{
        method: 'PUT',
        headers: {
          'Authorization': `Bearer: ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserInFocus)
      });
      if (!res.ok){
        throw new Error("Error Updating User")
      }
    } catch (err) {
      console.error("Error Updating this user")
    }
  }
  // update User Credential info
  const updateCredential = async () => {
    const updatedCredential = {
      OU: selectedOUs,
      divisions: selectedDivisions,
    };
  
    try {
      const res = await fetch(`http://localhost:3000/cool-tech/credentials/user-credential/${credential._id}`,{
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCredential)
      });
      if (!res.ok){
        throw new Error("Error Updating Credential Identifiers for User")
      }
    } catch (err) {
      console.error("Error Updating the Credential Identifiers for this user")
    }
  }
  
  // event handler for updtaing user and their relative user credential
  const handleUpdate = async () => {
    await updateUser();
    await updateCredential();
  }
  
  // ...when component mounts
  useEffect(() => {
    if(user){
      const fetchData = async () => {
        await fetchUser();
        fetchOUs();
        fetchDivisions();
      }
      fetchData();
    }
  }, []);

  // Filter Divisions to match the selected OUs
  useEffect(() => {
    // Find OU objects that match the selected OU ids
    const selectedOUObjects = ous.filter(ou => selectedOUs.includes(ou._id));
    // For each of those OUs, find the divisions that are linked to them
    const divisionsOfSelectedOUs = selectedOUObjects.flatMap(ou =>
      allDivisions.filter(division => (ou.divisions || []).includes(division._id))
    );
    setDivisions(divisionsOfSelectedOUs);
  }, [selectedOUs, allDivisions, ous]);

  // handle ou selection
  const handleOUSelection = (ouId, checked) => {
    if (checked) {
      setSelectedOUs(prevSelectedOUs => [...prevSelectedOUs, ouId]);
    } else {
      setSelectedOUs(prevSelectedOUs => prevSelectedOUs.filter(selectedOUId => selectedOUId !== ouId));
    }
  }

  // Handle division selection
  const handleDivisionSelection = (divisionId, checked) => {
    if (checked) {
      setSelectedDivisions(prevSelectedDivisions => [...prevSelectedDivisions, divisionId]);
    } else {
      setSelectedDivisions(prevSelectedDivisions => prevSelectedDivisions.filter(selectedDivisionId => selectedDivisionId !== divisionId));
    }
  }
  
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-base-100 z-10 p-20 overflow-y-auto'>
      <div className="existing-credentials-container card flex-shrink-0 w-full max-w-xxl shadow-2xl bg-base-300">
        <div className="card-body">
          {/* ensure user is not null/undefined before trying to access it */}
          <h2 className='text-2xl font-semibold text-accent'>{userInFocus?.name}</h2>
          <h3 className="font-semibold">Update Employee Permissions</h3>
          <span className='border border-b-0 my-4'></span>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg font-semibold mb-1">Role</span>
              </label>
              <select 
                className="select select-bordered mb-4" 
                value={selectedRole} 
                onChange={e => setSelectedRole(e.target.value)}
              >
                <option value="normal">Normal</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
              <span className='border border-b-0 my-4'></span>
          </div>
          <div className="form-control">
            <h3 className='text-lg font-semibold mb-1'>Organizational Units</h3>
            <span className='text-xs mb-6 font-light border-b-'>
              Please select/deselect the Organizational units you want to deallocate/allocate to this employee
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
              {ous.map(ou => (
                <label className="cursor-pointer label" key={ou._id} >
                  <span className="label-text">{ou.name}</span>
                  <input 
                    type="checkbox" 
                    className="checkbox checkbox-info"
                    checked={selectedOUs.includes(ou._id)} 
                    onChange={e => handleOUSelection(ou._id, e.target.checked)} />
                </label>
              ))}
            </div>
          </div>
          <span className='border border-b-0 my-4'></span>
          <div className="form-control">
            <h3 className='text-lg font-semibold mb-1'>Divisions</h3>
            <span className='text-xs mb-6 font-light border-b-'>
              Please select/deselect the Divisions you want to deallocate/allocate to this employee
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {divisions.map(division => (
                <label className="cursor-pointer label" key={division._id}>
                  <span className="label-text">{division.name}</span>
                  <input 
                    type="checkbox" 
                    className="checkbox checkbox-info"
                    checked={selectedDivisions.includes(division._id)}
                    onChange={e => handleDivisionSelection(division._id, e.target.checked)} />
                </label>
              ))}
            </div>
          </div>
          <span className='border border-b-0 my-4'></span>
          <button 
            className="btn btn-accent mt-5"
            onClick={() => handleUpdate()}>Update</button>
        </div>
      </div>
      <button className="btn btn-ghost btn-xs absolute top-0 right-0 m-5" onClick={closeEdit}>
        <FaTimes />
      </button>
    </div>
  )
}

UpdatePermissionsModal.propTypes = {
  credential: PropTypes.object,
  closeEdit: PropTypes.func.isRequired
}

export default UpdatePermissionsModal
