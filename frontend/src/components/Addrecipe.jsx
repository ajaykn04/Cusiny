import React, { useContext, useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { AppContext } from "../AppContext";
import styles from "../styles";

const Addrecipe = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    category: "",
    image: "",
  });
  const toeditrecipe = useLocation();
  // toeditrecipe || ""
  // console.log(toeditrecipe.state)
  // console.log(toeditrecipe.state.value)
  // console.log(toeditrecipe.state.value._id)
  useEffect(() => {

    if ( toeditrecipe.state!= null) {
      setRecipe({...recipe,
        name: toeditrecipe.state.value.name,
        ingredients: toeditrecipe.state.value.ingredients,
        instructions: toeditrecipe.state.value.instructions,
        category: toeditrecipe.state.value.category,
        image: toeditrecipe.state.value.image,

        });
    }
},[]);
console.log(recipe)
  const navigate = useNavigate();
  const { data, setData } = useContext(AppContext);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("userData"));
    if (savedData) {
      setData(savedData);
    }
  }, [setData]);

  
  const [image, setImage] = useState();
  const [errors, setErrors] = useState({
    name: false,
    ingredients: false,
    instructions: false,
    category: false,
    image: false,
  });
  const [generalError, setGeneralError] = useState("");

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
    return !Object.values(newErrors).some((error) => error);
  };

  const submitHandler = async () => {
    if (validateFields()) {
      const formData = new FormData();
      if(toeditrecipe.state!=null){
       axios.put("http://localhost:3000/recipe/edit/"+toeditrecipe.state.value._id, recipe)
            .then((res) => {
                navigate('/user/recipes');
                
            })
            .catch((err) => {
                console.log(err)
            });
      }else{
        try {
        
          formData.append("file", image);
          for (const key in recipe) {
            formData.append(key, recipe[key]);
          }
          formData.append("owner", data._id); // Ensure `data` is correctly set
          formData.append("ownername", data.username);
  
          await axios.post(`http://localhost:3000/recipe/add/`, formData);
          console.log("Recipe added");
          navigate("/user/recipes");
          // navigate("/user/recipes", { state: location.state });
        } catch (error) {
          console.error(error);
        }
      }
      
    }
  };

  return (
    <div>
      <Navbar  />
      {/* <Navbar location={location} /> */}
      <Box
        sx={{
          mt: 13.7,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Box sx={styles.box_style}>
          <img
            src="/dishify_pbg1.ico"
            alt="Login Icon"
            style={{
              width: "200px",
              marginBottom: "-1.5rem",
              marginTop: "-5rem",
            }}
          />
          <Typography
            fontFamily={"fantasy"}
            variant="h4"
            color="white"
            gutterBottom
          >
            ADD RECIPE
          </Typography>
          <TextField
            required
            style={{ marginTop: -7 }}
            fullWidth
            name="name"
            value={recipe.name}
            label="Name"
            variant="outlined"
            margin="normal"
            onChange={inputHandler}
            error={errors.name}
            helperText={errors.name ? "Name is required" : ""}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={styles.textfield}
          />
          <TextField
            required
            style={{ marginTop: 3 }}
            fullWidth
            multiline
            rows={4}
            name="ingredients"
            value={recipe.ingredients}
            label="Ingredients"
            variant="outlined"
            margin="normal"
            onChange={inputHandler}
            error={errors.ingredients}
            helperText={
              errors.ingredients ? "Ingredients are required" : generalError
            }
            FormHelperTextProps={{ sx: { color: "red" } }}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={styles.textfield}
          />
          <TextField
            required
            style={{ marginTop: 3 }}
            fullWidth
            multiline
            rows={4}
            name="instructions"
            value={recipe.instructions}
            label="Instructions"
            variant="outlined"
            margin="normal"
            onChange={inputHandler}
            error={errors.instructions}
            helperText={errors.instructions ? "Instructions are required" : ""}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={styles.textfield}
          />
          <TextField
            required
            style={{ marginTop: 3 }}
            fullWidth
            name="category"
            value={recipe.category}
            label="Category"
            variant="outlined"
            margin="normal"
            onChange={inputHandler}
            error={errors.category}
            helperText={errors.category ? "Category is required" : ""}
            InputLabelProps={{ style: { color: "white" } }}
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
            helperText={errors.image ? "Image is required" : ""}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={styles.textfield}
          />
          <Button
            variant="contained"
            sx={{
              mt: 0.4,
              backgroundColor: "orange",
              "&:hover": { backgroundColor: "orange" },
            }}
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
