import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import {
  Button,
  Container,
  Grid,
  Paper,
  Rating,
  Typography,
  TextField,
} from "@mui/material";

const AllRecipes = () => {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const apiUrl = "https://cusiny-backend.vercel.app/recipe/viewall";

    axios
      .get(apiUrl)
      .then((response) => {
        setRecipes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleEdit = (recipe) => {
    navigate("/user/editrecipe", { state: { value: recipe } });
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <Container style={{ marginTop: "2rem" }}>
        <Typography variant="h4" gutterBottom>
          All Recipes
        </Typography>
        <TextField
          fullWidth
          label="Search Recipes"
          variant="outlined"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <Grid container spacing={3}>
            {filteredRecipes.map((recipe) => (
              <Grid item xs={12} sm={6} md={4} key={recipe._id}>
                <Paper style={{ padding: "1rem", marginBottom: "1rem" }}>
                  <Typography variant="h6">{recipe.name}</Typography>
                  <img
                    src={`https://cusiny-backend.vercel.app/uploads/${recipe.image}`}
                    alt={recipe.name}
                    style={{ width: "100%", height: "auto" }}
                  />
                  <Typography>Category: {recipe.category}</Typography>
                  <Typography>Ingredients: {recipe.ingredients}</Typography>
                  <Typography>Instructions: {recipe.instructions}</Typography>
                  <Rating value={recipe.rating || 0} readOnly />
                  <Button
                    variant="outlined"
                    onClick={() => handleEdit(recipe)}
                    sx={{ mt: 1 }}
                  >
                    Edit Recipe
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default AllRecipes;
