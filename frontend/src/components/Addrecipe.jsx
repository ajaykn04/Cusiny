import { Box, Button, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from '../styles';

const Addrecipe = () => {

  const location = useLocation();
  const [recipe, setRecipe] = useState({ name: "", ingredients: "", instructions: "", category: "", image: "",});
  const [image, setImage] = useState();
  const [errors, setErrors] = useState({ name: false, ingredients: false, instructions: false, category: false, image: false });
  const [generalError, setGeneralError] = useState("");
  
  const navigate = useNavigate();

  const cred = {
    name: recipe.name,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
    category: recipe.category,
    image: recipe.image,
    owner: location.state.state._id,
    ownername: location.state.state.username,
  };


  const inputHandler = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
    if(e.target.type=="file"){
      setImage(e.target.files[0]);
    }
    setGeneralError("");
  };

  const validateFields = () => {
    const newErrors = {
      name: recipe.name === "",
      ingredients: recipe.ingredients === "",
      instructions: recipe.instructions === "",
      category: recipe.category === "",
      image: recipe.image === "",
    };
    setErrors(newErrors);
    return !newErrors.name && !newErrors.ingredients && !newErrors.instructions && !newErrors.category && !newErrors.image;
  };

  const submitHandler = async () => {
    if (validateFields()) {
      try {
        console.log(cred.image)
        const data = new FormData();
        data.append("file",image)
        for (const key in cred) {
          data.append(key, cred[key]);
      }
        await axios.post(`http://localhost:3000/recipe/add/`, data);
        console.log("recipe added");
        
      } catch (error) {
          console.error(error);
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
            src="/dishify_pbg1.ico" 
            alt="Login Icon" 
            style={{ width: '200px', marginBottom: '-1.5rem', marginTop: '-5rem' }} 
          />
          <Typography fontFamily={'fantasy'} variant="h3" color="white" gutterBottom>
            ADD RECIPE
          </Typography>
          <TextField
            required
            fullWidth
            name="name"
            label="name"
            variant="outlined"
            margin="normal"
            // value={recipe.name}
            onChange={inputHandler}
            error={errors.name}
            helperText={errors.name ? 'name is required' : ''}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={styles.textfield}
          />
          <TextField
            required
            fullWidth
            name="ingredients"
            label="ingredients"
            variant="outlined"
            margin="normal"
            // value={recipe.ingredients}
            onChange={inputHandler}
            error={errors.ingredients}
            helperText={errors.ingredients ? 'ingredients is required' : generalError}
            FormHelperTextProps={{ sx: { color: 'red' } }}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={styles.textfield}
          />
          <TextField
            required
            fullWidth
            name="instructions"
            label="instructions"
            variant="outlined"
            margin="normal"
            // value={recipe.instructions}
            onChange={inputHandler}
            error={errors.instructions}
            helperText={errors.instructions ? 'instructions is required' : ''}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={styles.textfield}
          />
          <TextField
            required
            fullWidth
            name="category"
            label="category"
            variant="outlined"
            margin="normal"
            // value={recipe.category}
            onChange={inputHandler}
            error={errors.category}
            helperText={errors.category ? 'category is required' : ''}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={styles.textfield}
          />
          <TextField
            required
            fullWidth
            name="image"
            type='file'
            variant="outlined"
            margin="normal"
            // value={recipe.image}
            onChange={inputHandler}
            error={errors.image}
            helperText={errors.image ? 'image is required' : ''}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={styles.textfield}
          />
          <Button
            variant="contained"
            sx={{ mt: 2, backgroundColor: 'orange', '&:hover': { backgroundColor: 'orange' }, }}
            onClick={submitHandler}
          >
            Add Recipe
          </Button>
          <Box mt={2}>
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default Addrecipe
