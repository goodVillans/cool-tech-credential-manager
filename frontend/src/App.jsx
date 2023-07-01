import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import SuccessfulRegistration from './Pages/SuccessfulRegistration'
import Home from "./Pages/Home"


function App() {
  
 

  return (
    <>
    <BrowserRouter>
    <div className='pages'>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/registration-success' element={<SuccessfulRegistration />} />
      </Routes>
      
    </div>
    </BrowserRouter> 
    </>
  )
}

export default App;
