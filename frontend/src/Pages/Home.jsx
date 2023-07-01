import Navigation from '../Components/Layout/Navigation'
import OuNav from '../Components/Layout/OuNav'
import CredentialList from '../Components/Credentials/CredentialList'
import { OuContext } from '../context/OuContext'
import { useState } from 'react'

function Home() {
  const [activeOU, setActiveOU] = useState(null);

  return (
    <div>
      <OuContext.Provider value={{activeOU, setActiveOU}}>
      <Navigation />
      <OuNav />
      <CredentialList />
      </OuContext.Provider>
    </div>
  )
}

export default Home
