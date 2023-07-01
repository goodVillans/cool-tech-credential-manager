import { useState, useEffect, useContext } from "react";
import UserCredential from "./USerCredential";
import { OuContext } from "../../context/OuContext";
import useAuthContext from "../../hooks/useAuthContext"

function CredentialList() {
  const [credentials, setCredentials] = useState([]);
  const { activeOU } = useContext(OuContext);
  const { user } = useAuthContext();

  const fetchCredentials = async () => {
    try {
      const res = await fetch('http://localhost:3000/cool-tech/credentials', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer: ${user.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) throw new Error('Network response was not ok');

      const data = await res.json();
      setCredentials(data);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  let filteredCredentials = credentials;

  if (activeOU) {
    filteredCredentials = credentials.filter(credential => {
      return credential.OU.some(ou => ou.name === activeOU);
    });
  }

  const groupByDivision = (credentials) => {
    return credentials.reduce((groups, credential) => {
      const divisionName = credential.division[0].name;
      if (!groups[divisionName]) {
        groups[divisionName] = [];
      }
      groups[divisionName].push(credential);
      return groups;
    }, {});
  };

  const groupedCredentials = groupByDivision(filteredCredentials);

  useEffect(() => {
    if(user){
      fetchCredentials();
    }
  }, [user]);

  return (
    <div className="overflow-x-auto">
      {Object.entries(groupedCredentials).map(([division, credentials]) => (
        <div key={division} className="mb-10">
          <div className="text-lg font-bold mb-4 ml-4">
            <span className=' text-blue-200'>{division.split('-')[1].trim()}</span>
            <span> : </span> 
            <span className='text-amber-100'>{division.split('-')[0].trim()}</span> 
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Company Email</th>
                <th>Role</th>
                <th>credentials</th>
                <th>edit</th>
              </tr>
            </thead>
            <tbody>
              {credentials.map((credential) => (
                <UserCredential key={credential._id} credential={credential} credential_Id = {credential._id}/>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default CredentialList;
