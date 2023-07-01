import { useContext, useEffect, useState } from 'react';
import { OuContext } from '../../context/OuContext';
import  useAuthContext  from '../../hooks/useAuthContext'

function OuNav() {
  const [ouData, setOuData] = useState([]);

  const { activeOU, setActiveOU } = useContext(OuContext)

  const { user } = useAuthContext()
  // get ous
  const fetchOUs = async () => {
    try {
      const res = await fetch('http://localhost:3000/cool-tech/ou',{
        method: 'GET',
        headers: {
          'Authorization': `Bearer: ${user.token}`,
          'Content-Type': 'application/json',
        },
      }); 

      if (!res.ok) throw new Error('Network response was not ok');
      
      const data = await res.json();
      setOuData(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  // set active ou onclick
  const handleOuClick = (ou) => {
    setActiveOU(ou.name);
  };
  // check user
  useEffect(() => {
    if(user){
      fetchOUs();
    }
  }, [user]);

  useEffect (() => {
      activeOU
  }, [activeOU])

  return (
  <>
   {/* ou subnav */}
    <div className="flex justify-center items-center mb-10">
      <ul className="menu menu-horizontal bg-base-200 rounded-md">
        {ouData.map((ou, index) => (
          <li 
            key={index} 
            onClick={() => handleOuClick(ou)}
            className={ou.name === activeOU ? 'bg-accent font-semibold text-blue-500 rounded-md' : ''}
          >
            <a>{ou.name}</a>
          </li>
        ))}
      </ul>
    </div>
  </>
  );
}

export default OuNav;
