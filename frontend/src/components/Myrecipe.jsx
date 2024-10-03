import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import {
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { AppContext } from "../AppContext";

const Myrecipe = () => {
  const { data, setData } = useContext(AppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [empty, setEmpty] = useState(true);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("userData"));
    if (savedData) {
      setData(savedData);
    }
  }, [setData]);

  useEffect(() => {
    if (data._id) {
      const apiUrl = `http://localhost:3000/user/recipes/${data._id}`;
      axios
        .get(apiUrl)
        .then((response) => {
          setRecipes(response.data);
          setEmpty(response.data.length === 0);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [data, setData]);

  const updateValue = (value) => {
    navigate("/recipe/add", { state: { value } });
  };

  const handleDelete = async (recipeId) => {
    try {
      await axios.delete(`http://localhost:3000/recipe/delete/${recipeId}`);
      setRecipes((prevRecipes) =>
        prevRecipes.filter((r) => r._id !== recipeId)
      );
      window.location.reload(true);
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <div>
      <Navbar />
      {loading ? (
        <center>
          <br />
          <br />
          <br />
          <br />
          Loading...
        </center>
      ) : empty ? (
        <center>
          <Typography style={{ marginTop: "50vh" }}>
            You don't have any recipes,&nbsp;
            <Button
              sx={{
                textTransform: "none",
                padding: 0,
              }}
              style={{ color: "transparent" }}
              onClick={() => {
                navigate("/recipe/add");
              }}
            >
              <Typography style={{ color: "orange" }}>
                Create new recipe
              </Typography>
            </Button>
          </Typography>
        </center>
      ) : (
        <Grid container spacing={2} sx={{ mt: "70px" }}>
          {recipes.map((recipe, index) => (
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
                elevation={3}
                sx={{
                  padding: 1,
                  backgroundColor: "currentcolor",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "325px",
                }}
              >
                <IconButton
                  sx={{
                    position: "fixed",
                    ml: "160px",
                    mt: "280px",
                    color: "white",
                    zIndex: 1,
                  }}
                  onClick={() => {
                    updateValue(recipe);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  sx={{
                    position: "fixed",
                    ml: "205px",
                    mt: "280px",
                    color: "white",
                    zIndex: 1,
                  }}
                  onClick={() => handleDelete(recipe._id)}
                >
                  <DeleteIcon />
                </IconButton>
                <Button
                  variant="outlined"
                  sx={{
                    overflow: "hidden",
                    borderColor: "white",
                    borderRadius: "15px",
                    width:"255px",
                    height:"325px",
                    "&:hover": {
                      borderColor: "darkorange",
                    },
                  }}
                  onClick={() => {
                    navigate("/detrecipe", { state: recipe });
                  }}
                  style={{
                    fontSize: "20px",
                    fontFamily: "fantasy",
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
                        width: "261px",
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

export default Myrecipe;
