import { Box, Typography } from '@mui/material'
import React from 'react'
import NavbarAdmin from './NavbarAdmin'

const Admindashboard = () => {
  return (
    <div>
      <NavbarAdmin/>
      <Box sx={{height: '90vh',display:'flex',color:'white',alignItems:'center' , justifyContent:'center'}}>
        <Typography variant='h3'>
          <center >
            Welcome Admin(admindashboard)
          </center>
        </Typography>
      </Box>
    </div>
  )
}

export default Admindashboard
