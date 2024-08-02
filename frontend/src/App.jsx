import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login'
import Signin from './components/Signin';
import Admindashboard from './components/Admindashboard';
import Userdashboard from './components/Userdashboard';
import colors from './colors';
import Addrecipe from './components/Addrecipe';
import Profile from './components/Profile';
import Myrecipe from './components/Myrecipe';
import Allrecipes from './components/Allrecipes';



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
      <Route path='/recipe/add' element={<Addrecipe/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/user/recipes' element={<Myrecipe/>}/>
      <Route path='/recipes' element={<Allrecipes/>}/>
    </Routes>
    </BrowserRouter>
    
      
    </>
  )
}

export default App
