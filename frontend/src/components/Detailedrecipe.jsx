import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import {
  Box,
  Button,
  Container,
  Divider,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { AppContext } from "../AppContext";
import axios from "axios";

const Detailedrecipe = () => {
  const { data, setData } = useContext(AppContext);
  const response = useLocation();

  const [reviews, setReviews] = useState([]); // Initialize as an empty array
  const [review, setReview] = useState({
    userId: "",
    username: "",
    rating: "",
    comment: "",
  });

  // Use empty string as default if state is undefined
  const recipeData = response.state || {};

  useEffect(() => {
    // Load state from localStorage if available
    const savedData = JSON.parse(localStorage.getItem("userData"));
    if (savedData && !data) {
      setData(savedData);
    }
  }, [setData, data]);

  useEffect(() => {
    if (recipeData._id) {
      const apiUrl = `http://localhost:3000/recipe/getreviews/${recipeData._id}`;
      axios
        .get(apiUrl)
        .then((response) => {
          setReviews(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [recipeData._id]);

  const inputHandler = (e, newValue) => {
    const { name, value } = e.target || {};
    setReview((prevReview) => ({
      ...prevReview,
      [name]: value || newValue,
    }));
  };

  const submitHandler = async () => {
    try {
      const updatedReview = {
        ...review,
        userId: data._id,
        username: data.username,
      };
      await axios.post(
        `http://localhost:3000/recipe/addreview/${recipeData._id}`,
        updatedReview
      );
      setReviews((prevReviews) => [updatedReview, ...prevReviews]); // Add new review to the list
      setReview({
        userId: "",
        username: "",
        rating: "",
        comment: "",
      }); // Clear review state after submission
    } catch (error) {
      console.error(error);
    }
  };

  if (!recipeData.name) {
    return <Typography>No recipe data available.</Typography>;
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
        {/* Left Side: Image and Review Section */}
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
          <Rating
            name="rating"
            value={recipeData.rating || 0}
            readOnly
            precision={0.1}
            sx={{
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

          {/* Review Section */}
          <Container
            style={{
              border: "2px solid white",
              borderRadius: "15px",
              backgroundColor: "black",
              marginTop: "2.5vh",
              width: "95%",
              marginLeft: 1,
            }}
          >
            <Typography style={{ marginTop: "1vh" }}>
              Write a Review?
            </Typography>
            <Rating
              name="rating"
              precision={1}
              value={review.rating}
              sx={{
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
              onChange={(e, newValue) => inputHandler(e, newValue)}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              name="comment"
              label="Leave a Comment"
              variant="outlined"
              margin="normal"
              value={review.comment} // Set value to review.comment
              onChange={inputHandler}
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{
                style: { color: "white" },
                sx: {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgb(247, 193, 128)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "orange",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "orange",
                  },
                },
              }}
            />
            <Button
              variant="contained"
              style={{ marginTop: -400, marginLeft: 400 }}
              sx={{
                mt: 2,
                backgroundColor: "orange",
                "&:hover": { backgroundColor: "orange" },
              }}
              onClick={submitHandler}
            >
              POST
            </Button>
          </Container>
        </Box>

        {/* Right Side: Ingredients and Instructions */}
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
      <Divider
        sx={{
          borderColor: "white", // Set the color of the divider
          width: "95%", // Set the width of the divider
          margin: "20px auto", // Center the divider with margin
          marginTop: -2.4
        }}
      />
      <Box
      sx={{ml:-79.85}}
      >
        {reviews.map((comment, index) => (
          <Box
            key={index} // Add key prop with index
            sx={{
              width:470,
              backgroundColor: "#000", // Black background
              color: "white", // Orange text color
              padding: "20px",
              borderRadius: "10px",
              maxWidth: "500px",
              margin: "20px auto",
              border: "1px solid white", // Orange border
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: "5px" }}>
              by {comment.username}
            </Typography>
            <Rating
              name="read-only"
              value={comment.rating}
              readOnly
              sx={{ color: "#FFA500", marginBottom: "10px" }}
            />
            <Typography variant="body1">{comment.comment}</Typography>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default Detailedrecipe;
