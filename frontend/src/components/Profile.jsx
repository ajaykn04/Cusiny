import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import styles from '../styles';
import { useLocation, useNavigate } from 'react-router-dom';

const Profile = () => {

  const [user, setUser] = useState({ username: "",place: "", age: "" });
  const [errors, setErrors] = useState({ username: false, age: false, place: false });
  const [generalError, setGeneralError] = useState("");
  
  const navigate = useNavigate();
  
  const cred = {
    username: user.username,
    email: user.email,
    place: user.place,
    age: user.age
    
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
      place: user.place === "",
      age: user.age === ""
    };
    setErrors(newErrors);
    return !newErrors.username && !newErrors.email && !newErrors.place && !newErrors.age;
  };

  const submitHandler = async () => {
    if (validateFields()) {
      try {
        await axios.post(`http://localhost:3000/user/register/`, cred);
        console.log("user added");
      } catch (error) {
        if(error.response.status==409){
          setGeneralError('Email Already Exists');
        }else{
          console.error(error);
        }
        
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
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <img 
            src="/defaultprofile.png" 
            alt="Profile Icon" 
            style={{ width: '200px', marginBottom: '-1.5rem', marginTop: '-5rem' }} 
          />
          <Typography fontFamily={'fantasy'} variant="h3" color="white" gutterBottom>
            PROFILE BIO
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
            InputProps={styles.textfield}
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
            InputProps={styles.textfield}
          />
          <TextField
            required
            fullWidth
            name="place"
            label="place"
            variant="outlined"
            margin="normal"
            value={user.place}
            onChange={inputHandler}
            error={errors.place}
            helperText={errors.place ? 'Place is required' : ''}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={styles.textfield}
          />
          <TextField
            required
            fullWidth
            name="age"
            label="age"
            variant="outlined"
            margin="normal"
            value={user.age}
            onChange={inputHandler}
            error={errors.age}
            helperText={errors.age ? 'Age is required' : ''}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={styles.textfield}
          />
          <Button
            variant="contained"
            sx={{ mt: 2, backgroundColor: 'orange', '&:hover': { backgroundColor: 'orange' }, }}
            onClick={submitHandler}
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </div>
  )
}

export default Profile
