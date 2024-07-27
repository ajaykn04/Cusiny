import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signin = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "", admin: "", username: "" });
  
  const inputHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitHandler = async () => {
        try {
          var res=await axios.post(`http://localhost:3000/user/register/`,cred);
          alert('New User Added');
        } catch (error) {
          alert('Something Went Wrong');
        }
  };
  
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '97vh',
        }}
      >
        <Box
          sx={{
            color: 'grey',
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
            SIGN-IN
          </Typography>
          <TextField
          required
            fullWidth
            name="username"
            label="username"
            variant="outlined"
            margin="normal"
            value={user.username}
            onChange={inputHandler}
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
          required
            fullWidth
            name="email"
            label="email"
            variant="outlined"
            margin="normal"
            value={user.email}
            onChange={inputHandler}
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
          required
            fullWidth
            name="password"
            type="password"
            label="Password"
            variant="outlined"
            margin="normal"
            value={user.password}
            onChange={inputHandler}
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
            sx={{ mt: 2, backgroundColor: 'orange', '&:hover': { backgroundColor: 'orange' }, }}
            onClick={submitHandler}
          >
            Sign-in
          </Button>
          <Box mt={2}>
            <Typography>
              <Link to={'/'}>Already have an Account</Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Signin;
