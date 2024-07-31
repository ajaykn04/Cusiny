import React from 'react'
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const Myrecipe = () => {
    var location = useLocation();
  location.state || "";
  console.log(location.state.username)
  return (
    <div>
      sdd
      <Navbar location={location} />
      helo
    </div>
  )
}

export default Myrecipe
