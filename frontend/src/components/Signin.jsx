import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Signin = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({ username: false, email: false, password: false });
  const [generalError, setGeneralError] = useState("");

  const cred = {
    username: user.username,
    email: user.email,
    password: user.password
  };

  const inputHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
    setGeneralError("");
  };

  const validateFields = () => {
    const newErrors = {
      username: user.username === "",
      email: user.email === "",
      password: user.password === ""
    };
    setErrors(newErrors);
    return !newErrors.username && !newErrors.email && !newErrors.password;
  };

  const submitHandler = async () => {
    if (validateFields()) {
      try {
        await axios.post(`http://localhost:3000/user/register/`, cred);
        alert('New User Added');
      } catch (error) {
        setGeneralError('Email Already Exists');
      }
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
            label="Username"
            variant="outlined"
            margin="normal"
            value={user.username}
            onChange={inputHandler}
            error={errors.username}
            helperText={errors.username ? 'Username is required' : ''}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{
              style: { color: 'white' }, sx: {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'orange',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'orange',
                },
              },
            }}
          />
          <TextField
            required
            fullWidth
            name="email"
            label="Email"
            variant="outlined"
            margin="normal"
            value={user.email}
            onChange={inputHandler}
            error={errors.email}
            helperText={errors.email ? 'Email is required' : generalError}
            FormHelperTextProps={{ sx: { color: 'red' } }}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{
              style: { color: 'white' }, sx: {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'orange',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'orange',
                },
              },
            }}
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
            error={errors.password}
            helperText={errors.password ? 'Password is required' : ''}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{
              style: { color: 'white' }, sx: {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'orange',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'orange',
                },
              },
            }}
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
