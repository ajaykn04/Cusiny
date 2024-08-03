import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../styles';
import Navbar from './Navbar';

const Addrecipe = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    category: "",
    image: "",
  });
  const [image, setImage] = useState();
  const [errors, setErrors] = useState({
    name: false,
    ingredients: false,
    instructions: false,
    category: false,
    image: false
  });
  const [generalError, setGeneralError] = useState("");

  const handleInstructionsChange = (event) => {
    const inputValue = event.target.value;
    console.log(inputValue)
    const lines = inputValue.split('\n');
    console.log(lines)
    const bulletedLines = lines.map((line, index) => {
      if (index === lines.length - 1 && line === "• ") {
        return "";
      } else if (!line.startsWith('• ')) {
        return `• ${line}`;
      } else {
        return line;
      }
    });
    setRecipe(prevState => ({ ...prevState, instructions: bulletedLines.join('\n') }));
  };

  const inputHandler = (e) => {
    if (e.target.type === "file") {
      setImage(e.target.files[0]);
      setRecipe({ ...recipe, image: e.target.files[0].name });
    } else {
      setRecipe({ ...recipe, [e.target.name]: e.target.value });
    }
    setErrors({ ...errors, [e.target.name]: false });
    setGeneralError("");
  };

  const validateFields = () => {
    const newErrors = {
      name: recipe.name === "",
      ingredients: recipe.ingredients === "",
      instructions: recipe.instructions === "",
      category: recipe.category === "",
      image: !image,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const submitHandler = async () => {
    if (validateFields()) {
      try {
        const data = new FormData();
        data.append("file", image);
        for (const key in recipe) {
          data.append(key, recipe[key]);
        }
        data.append("owner", location.state._id);
        data.append("ownername", location.state.username);

        await axios.post(`http://localhost:3000/recipe/add/`, data);
        console.log("Recipe added");
        window.location.reload(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <Navbar location={location} />
      <Box
        sx={{
          mt: 13.7,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
        }}
      >
        <Box sx={styles.box_style}>
          <img
            src="/dishify_pbg1.ico"
            alt="Login Icon"
            style={{ width: '200px', marginBottom: '-1.5rem', marginTop: '-5rem' }}
          />
          <Typography fontFamily={'fantasy'} variant="h4" color="white" gutterBottom>
            ADD RECIPE
          </Typography>
          <TextField
            required
            style={{ marginTop: -7 }}
            fullWidth
            name="name"
            label="Name"
            variant="outlined"
            margin="normal"
            onChange={inputHandler}
            error={errors.name}
            helperText={errors.name ? 'Name is required' : ''}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={styles.textfield}
          />
          <TextField
            required
            style={{ marginTop: 3 }}
            fullWidth
            multiline
            rows={4}
            name="ingredients"
            label="Ingredients"
            variant="outlined"
            margin="normal"
            onChange={inputHandler}
            error={errors.ingredients}
            helperText={errors.ingredients ? 'Ingredients are required' : generalError}
            FormHelperTextProps={{ sx: { color: 'red' } }}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={styles.textfield}
          />
          <TextField
            required
            style={{ marginTop: 3 }}
            fullWidth
            multiline
            rows={4}
            name="instructions"
            label="Instructions"
            variant="outlined"
            margin="normal"
            value={recipe.instructions}
            onChange={(e) => {
              inputHandler(e);
              handleInstructionsChange(e);
            }}
            error={errors.instructions}
            helperText={errors.instructions ? 'Instructions are required' : ''}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={styles.textfield}
          />
          <TextField
            required
            style={{ marginTop: 3 }}
            fullWidth
            name="category"
            label="Category"
            variant="outlined"
            margin="normal"
            onChange={inputHandler}
            error={errors.category}
            helperText={errors.category ? 'Category is required' : ''}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={styles.textfield}
          />
          <TextField
            style={{ marginTop: 3 }}
            required
            fullWidth
            name="image"
            type="file"
            variant="outlined"
            margin="normal"
            onChange={inputHandler}
            error={errors.image}
            helperText={errors.image ? 'Image is required' : ''}
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={styles.textfield}
          />
          <Button
            variant="contained"
            sx={{ mt: .4, backgroundColor: 'orange', '&:hover': { backgroundColor: 'orange' }, }}
            onClick={submitHandler}
          >
            Add Recipe
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Addrecipe;
