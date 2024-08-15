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

const Allrecipes = () => {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const apiUrl = `http://localhost:3000/recipe/viewall`;

    axios
      .get(apiUrl)
      .then((response) => {
        setRecipes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <Container sx={{ mt: 10, mb: -3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search Recipes"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            mb: 4,
            backgroundColor: "#F3F4F6",
            borderRadius: "25px",
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "none",
              },
              "&:hover fieldset": {
                borderColor: "none",
              },
              "&.Mui-focused fieldset": {
                borderColor: "none",
                borderWidth: "0px",
              },
              "&.Mui-focused .MuiOutlinedInput-input": {
                color: "black",
              },
            },
            "& .MuiOutlinedInput-input": {
              padding: "12px 20px",
            },
            "& .MuiInputBase-input::placeholder": {
              background:
                "linear-gradient(90deg, red 3%, orange 3%, yellow 3%, green 4%, blue 6%, indigo 7%, violet 10%)", // Condensed rainbow gradient
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textFillColor: "transparent",
            },
          }}
        />
      </Container>
      {loading ? (
        <center>
          <br />
          <br />
          <br />
          <br />
          Loading...
        </center>
      ) : (
        <Grid container spacing={2}>
          {filteredRecipes.map((recipe, index) => (
            <Grid
              item
              xs={12}
              sm={15}
              md={3}
              lg={2.3}
              key={index}
              sx={{ ml: "9px", mt: -2 }}
            >
              <Paper
                elevation={1}
                sx={{
                  padding: 1,
                  backgroundColor: "currentcolor",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "325px",
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    overflow: "hidden",
                    borderColor: "white",
                    borderRadius: "15px",
                    width:"257px",
                    height:"325px",
                    "&:hover": { borderColor: "darkorange" },
                  }}
                  onClick={() => {
                    navigate("/detrecipe", { state: recipe });
                  }}
                  style={{
                    color: "black",
                  }}
                >
                  <Container
                    style={{
                      backgroundColor: "currentcolor",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "flex-start",
                    }}
                  >
                    <img
                      src={`http://localhost:3000/${recipe.image}`}
                      alt={recipe.name}
                      style={{
                        marginLeft: "-39px",
                        marginTop: "-10px",
                        width: "257px",
                        height: "260px",
                        objectFit: "cover",
                      }}
                    />
                    <Typography
                      variant="subtitle1"
                      fontFamily={"cursive"}
                      sx={{
                        ml: -1.5,
                        mt: 1,
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      {recipe.name}
                    </Typography>
                    <Rating
                      name={`rating-${index}`}
                      value={recipe.rating || 0}
                      readOnly
                      precision={0.1}
                      sx={{
                        ml: -2,
                        mb: 1,
                        mt: 1,
                        "& .MuiRating-iconFilled": {
                          color: "#FFAD18",
                        },
                        "& .MuiRating-iconEmpty": {
                          color: "grey",
                        },
                        "& .MuiRating-icon:hover": {
                          borderColor: "darkorange",
                        },
                      }}
                    />
                  </Container>
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Allrecipes;
