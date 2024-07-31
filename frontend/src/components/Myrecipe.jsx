import { Box, Typography } from '@mui/material';
import React from 'react'
import { useLocation } from 'react-router-dom';

const Myrecipe = () => {

    var location = useLocation();
  location.state || "";

  return (
    <div>
      <Box sx={{height: '90vh',display:'flex',color:'white',alignItems:'center' , justifyContent:'center'}}>
        <Typography variant='h3'>
          <center >
            MYRECIPES
          </center>
        </Typography>
      </Box>
    </div>
  )
}

export default Myrecipe
