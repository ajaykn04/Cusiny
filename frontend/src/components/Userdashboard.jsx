import { Box, Typography } from '@mui/material'
import React from 'react'

const Userdashboard = () => {
  return (
    <div>
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