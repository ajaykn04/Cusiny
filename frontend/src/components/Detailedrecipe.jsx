import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import {
  Box,
  Button,
  Container,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { AppContext } from "../AppContext";
import axios from "axios";

const DetailedRecipe = () => {
  const { data, setData } = useContext(AppContext);
  const { state } = useLocation();
  const [recipeData, setRecipeData] = useState(null);

  useEffect(() => {
    if (state?._id) {
      const fetchRecipe = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/recipe/get/${state._id}`
          );
          setRecipeData(response.data);
        } catch (error) {
          console.error("Error fetching recipe data:", error);
        }
      };
      fetchRecipe();
    }
  }, [state?._id]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("userData"));
    if (savedData) {
      setData(savedData);
    }
  }, [setData, data]);

  if (!recipeData) {
    return (
      <center>
        <br />
        <br />
        <br />
        <br />
        <br />
        Loading...
      </center>
    );
  }

  return (
    <div>
      <Navbar />
      <Container
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "5vh",
        }}
      >
        <Box
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginRight: "5vw",
          }}
        >
          <Typography
            variant="h3"
            style={{
              fontFamily: "cursive",
              fontWeight: "bold",
              marginTop: 80,
            }}
          >
            {recipeData.name}
          </Typography>
          <Typography
            variant="body1"
            style={{
              fontFamily: "cursive",
              fontWeight: "bold",
            }}
          >
            {recipeData.category}
          </Typography>
          <img
            src={`http://localhost:3000/${recipeData.image}`}
            alt={recipeData.name}
            style={{
              border: "4px solid white",
              borderRadius: "15px",
              marginTop: 20,
              width: "500px",
              height: "auto",
              objectFit: "cover",
            }}
          />
        </Box>
        <Box
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginTop: 210,
          }}
        >
          <Box
            style={{
              marginBottom: "2vh",
              width: "100%",
            }}
          >
            <Typography
              variant="h4"
              style={{
                fontFamily: "cursive",
                fontWeight: "bold",
              }}
            >
              Ingredients
            </Typography>
            <Typography
              variant="body1"
              style={{
                marginTop: 10,
                fontFamily: "cursive",
                whiteSpace: "pre-line",
              }}
            >
              {recipeData.ingredients}
            </Typography>
          </Box>

          <Box
            style={{
              marginBottom: "2vh",
              width: "100%",
            }}
          >
            <Typography
              variant="h4"
              style={{
                fontFamily: "cursive",
                fontWeight: "bold",
                marginTop: 20,
              }}
            >
              Instructions
            </Typography>
            <Typography
              variant="body1"
              style={{
                marginTop: 10,
                fontFamily: "cursive",
                whiteSpace: "pre-line",
              }}
            >
              {recipeData.instructions}
            </Typography>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default DetailedRecipe;
