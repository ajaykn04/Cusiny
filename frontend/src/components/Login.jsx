import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import colors from '../colors';
import styles from '../styles';

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: false, password: false });
  const [generalError, setGeneralError] = useState("");
 const navigate = useNavigate();
  const inputHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
    setGeneralError("");
  };

  const validateFields = () => {
    const newErrors = {
      email: user.email === "",
      password: user.password === ""
    };
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const submitHandler = async () => {
    if (validateFields()) {
      try {
        const login = await axios.get(`http://localhost:3000/user/get/${user.email}/${user.password}`);
        console.log("test");
        console.log(login.data.admin);
        if(login.data.admin==true){
          navigate('/admindash');
        }
        else{
          navigate('/userdash');
        }
      } catch (error) {
        setGeneralError('Invalid Email or Password');
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
        <Box sx={styles.box_style}>
          <img 
            src="/flip.ico" 
            alt="Login Icon" 
            style={{ width: '100px', marginBottom: '1rem' }} 
          />
          <Typography fontFamily={'fantasy'} variant="h3" color="white" gutterBottom>
            LOG-IN
          </Typography>
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
            FormHelperTextProps={{ sx: { color: errors.email ? 'red' : 'red' } }}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={styles.textfield}
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
            InputProps={styles.textfield}
          />
          <Button
            variant="contained"
            sx={{ mt: 2, backgroundColor: 'orange', '&:hover': { backgroundColor: 'orange' }, }}
            onClick={submitHandler}
          >
            Log-in
          </Button>
          <Box mt={2}>
            <Typography >
              <Link style={styles.link_style} to={'/signin'}>Don't have an Account</Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Login;
