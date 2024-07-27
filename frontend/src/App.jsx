import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Login from './components/Login'
import Signin from './components/Signin';


function App() {

  document.body.style.backgroundColor = 'white';

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='signin' element={<Signin/>}/>
    </Routes>
    </BrowserRouter>
    
      
    </>
  )
}

export default App
