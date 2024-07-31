import { Box, Typography } from '@mui/material'
import React from 'react'
import Navbar from './Navbar'
import { useLocation } from 'react-router-dom';

const Userdashboard = () => {

  var location = useLocation();
  location.state || "";
  console.log(location.state.username)
  return (
    <div>
      <Navbar location={location} />
      <Box sx={{height: '90vh',display:'flex',color:'white',alignItems:'center' , justifyContent:'center'}}>
        <Typography variant='h3'>
          <center >
            Welcome User(Userdashboard)
          </center>
        </Typography>
      </Box>
    </div>
  )
}

export default Userdashboard
