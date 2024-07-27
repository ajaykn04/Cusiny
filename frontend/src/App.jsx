import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login'
import Signin from './components/Signin';
import Admindashboard from './components/Admindashboard';
import Userdashboard from './components/Userdashboard';
import colors from './colors';



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
    </Routes>
    </BrowserRouter>
    
      
    </>
  )
}

export default App
