import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'

const Login = () => {
  var [data, setData] = useState({ s_name: "", s_age: "", s_rollno: "", s_place: "" , s_dept: ""});
  return (
    <div>
      
      
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '97vh',
          // backgroundColor: 'white',
        }}
      >
        
        <Box
          sx={{
            color:'grey',
            backgroundColor: 'black',
            padding: '2rem',
            borderRadius: '0px',
            boxShadow: '0px 0px 20px',
            textAlign: 'center',
          }}
        >
          <img 
            src="/flip.ico" 
            alt="Login Icon" 
            style={{ width: '100px', marginBottom: '1rem' }} 
          />
          <Typography fontFamily={'fantasy'} variant="h3" color="white" gutterBottom>
            LOG-IN
          </Typography>
          <TextField
            fullWidth
            id="us1"
            label="Username"
            variant="outlined"
            margin="normal"
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' }, sx: {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'orange',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'orange',
              },
            },}}
          />
          <TextField
            fullWidth
            id="ps1"
            type="password"
            label="Password"
            variant="outlined"
            margin="normal"
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' }, sx: {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'orange',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'orange',
              },
            },}}
          />
          <Button
          
            variant="contained"
            sx={{ mt: 2, backgroundColor: 'orange','&:hover': {
          backgroundColor: 'orange',
        },}}
          >
          Log-in
          </Button>
          <Box  mt={2}>
            
            &nbsp;<a href="https://upload.wikimedia.org/wikipedia/commons/5/56/Bsodwindows10.png" target="_blank" rel="noopener noreferrer">Forgot Password?</a>
             
            <br />
           
            &nbsp;<a href="https://upload.wikimedia.org/wikipedia/commons/5/56/Bsodwindows10.png" target="_blank" rel="noopener noreferrer">Don't have an Account</a>
            
          </Box>  
        </Box>
      </Box>
    </div>
  )
}

export default Login
