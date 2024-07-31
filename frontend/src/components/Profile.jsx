import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure you have axios imported
import styles from '../styles'; // Assuming you have styles defined in '../styles'

const Profile = () => {
  var location = useLocation();
  const navigate = useNavigate();
  
  const initialState = location.state || { username: "", place: "", age: "" };
  const [user, setUser] = useState(initialState);
  const [errors, setErrors] = useState({ username: false, age: false, place: false });
  const [generalError, setGeneralError] = useState("");

  const inputHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
    setGeneralError("");
  };

  const validateFields = () => {
    const newErrors = {
      username: user.username === "",
      place: user.place === "",
      age: user.age === ""
    };
    setErrors(newErrors);
    return !newErrors.username && !newErrors.place && !newErrors.age;
  };

  const submitHandler = async () => {
    if (validateFields()) {
      try {
        const updatedProfile = {
          ...location.state,
          username: user.username,
          place: user.place,
          age: user.age
        };
        await axios.put(`http://localhost:3000/user/edit/`, updatedProfile);
        console.log("Profile Updated");
        navigate('/userdash', { state: updatedProfile });
      } catch (error) {
        console.error(error);
        setGeneralError("An error occurred while updating the profile.");
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
            src="/defaultprofile.png" 
            alt="Profile Icon" 
            style={{ width: '150px', marginBottom: '1rem', marginTop: '0rem' }} 
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
            name="place"
            label="Place"
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
            label="Age"
            type="number"
            variant="outlined"
            margin="normal"
            value={user.age}
            onChange={inputHandler}
            error={errors.age}
            helperText={errors.age ? 'Age is required' : ''}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={styles.textfield}
          />
          {generalError && <Typography color="error">{generalError}</Typography>}
          <Button
            variant="contained"
            sx={{ mt: 2, backgroundColor: 'orange', '&:hover': { backgroundColor: 'orange' }, }}
            onClick={submitHandler}
          >
            Save Changes
          </Button>
          <br />
          <Button
            variant="text"
            sx={{ mt: 2, }}
            onClick={async ()=>{
              await axios.delete(`http://localhost:3000/user/delete/`, {data: location.state})
              navigate('/');
              console.log("Profile Successfully Deleted");
            }}
          >
            <Typography style={{color:'red'}}>
              Delete my Account
            </Typography>
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Profile;
