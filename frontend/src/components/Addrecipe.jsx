import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormHelperText,
} from "@mui/material";
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

  useEffect(() => {
    if (toeditrecipe.state != null) {
      setRecipe({
        ...recipe,
        name: toeditrecipe.state.value.name,
        ingredients: toeditrecipe.state.value.ingredients,
        instructions: toeditrecipe.state.value.instructions,
        category: toeditrecipe.state.value.category,
        image: toeditrecipe.state.value.image,
      });
    }
  }, []);

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
      if (toeditrecipe.state != null) {
        try {
          formData.append("file", image);
          for (const key in recipe) {
            formData.append(key, recipe[key]);
          }
          formData.append("_id", toeditrecipe.state.value._id);
          await axios.put("http://localhost:3000/recipe/edit/", formData);
          navigate("/user/recipes");
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          formData.append("file", image);
          for (const key in recipe) {
            formData.append(key, recipe[key]);
          }
          formData.append("owner", data._id);
          formData.append("ownername", data.username);

          await axios.post(`http://localhost:3000/recipe/add/`, formData);
          navigate("/user/recipes");
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  return (
    <div>
      <Navbar />
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
            src="/Chef.ico"
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

          <FormControl
            style={{ marginTop: 3 }}
            variant="outlined"
            required
            fullWidth
            error={errors.category}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: errors.category ? "red" : "white",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: recipe.category ? "orange" : "orange",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: errors.category ? "orange" : "orange",
                },
              },
              "& .MuiInputLabel-root": {
                color: errors.category ? "white" : "white",
              },
              "&:hover .MuiInputLabel-root": {
                color: errors.category
                  ? "white"
                  : recipe.category
                  ? "orange"
                  : "white",
              },
            }}
          >
            <InputLabel>Category</InputLabel>
            <Select
              style={{ color: "white", textAlign: "left" }}
              label="Category"
              name="category"
              value={recipe.category}
              onChange={inputHandler}
              MenuProps={{
                PaperProps: {
                  style: {
                    textAlign: "left",
                  },
                },
              }}
              sx={{
                "& .MuiSelect-icon": {
                  color: "white",
                },
              }}
            >
              <MenuItem value="Meals">Meals</MenuItem>
              <MenuItem value="Vegetarian">Vegetarian</MenuItem>
              <MenuItem value="Salad">Salad</MenuItem>
              <MenuItem value="Drinks">Drinks</MenuItem>
              <MenuItem value="Desserts">Desserts</MenuItem>
            </Select>
            {errors.category && (
              <FormHelperText sx={{ color: "red" }}>
                Category is required
              </FormHelperText>
            )}
          </FormControl>

          <TextField
            style={{ marginTop: 10 }}
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
              mt: 0.4,mb:-2.5,
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
