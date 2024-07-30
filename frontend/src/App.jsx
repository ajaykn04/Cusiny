import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login'
import Signin from './components/Signin';
import Admindashboard from './components/Admindashboard';
import Userdashboard from './components/Userdashboard';
import colors from './colors';
import Addrecipe from './components/Addrecipe';
import Profile from './components/Profile';



function App() {

  document.body.style.backgroundColor = colors.backgroundcolor;

  return (
    
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/admindash' element={<Admindashboard/>}/>
      <Route path='/userdash' element={<Userdashboard/>}/>
      <Route path='/addrec' element={<Addrecipe/>}/>
      <Route path='/profile' element={<Profile/>}/>
    </Routes>
    </BrowserRouter>
    
      
    </>
  )
}

export default App
