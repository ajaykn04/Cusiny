import React, { useContext, useEffect, useState } from "react";
import NavbarAdmin from "./NavbarAdmin";
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

const DetailedRecipe = () => {
  const { data, setData } = useContext(AppContext);
  const { state } = useLocation();
  const [recipeData, setRecipeData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState({
    userId: "",
    username: "",
    rating: 0,
    comment: "",
  });

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

  useEffect(() => {
    if (recipeData?._id) {
      const fetchReviews = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/recipe/getreviews/${recipeData._id}`
          );
          setReviews(response.data);
        } catch (error) {
          console.error("Error fetching reviews:", error);
        }
      };
      fetchReviews();
    }
  }, [recipeData?._id]);

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
      setReviews((prevReviews) => [updatedReview, ...prevReviews]);
      setReview({
        userId: "",
        username: "",
        rating: 0,
        comment: "",
      });
      window.location.reload(true);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

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
      <NavbarAdmin />
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
          <Container
            style={{
              border: "2px solid white",
              borderRadius: "15px",
              backgroundColor: "black",
              marginTop: "2.5vh",
              width: "95%",
              marginLeft: 1,
              padding: "20px",
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
              value={review.comment}
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
              style={{ marginTop: 10 }}
              sx={{
                backgroundColor: "orange",
                "&:hover": { backgroundColor: "darkorange" },
              }}
              onClick={submitHandler}
            >
              POST
            </Button>
          </Container>
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
      <Box sx={{ ml: 10 }}>
        {reviews.map((comment, index) => (
          <Box key={index}>
            <Divider
              sx={{
                border: "1px solid #1b1b1b",
                width: "100%",
                ml: -5,
                marginTop: -2,
                mb: 5,
              }}
            />
            <Typography variant="h6" sx={{ marginBottom: "0px", mt: -2 }}>
              @{comment.username}
            </Typography>
            <Rating
              name="read-only"
              value={comment.rating}
              readOnly
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
              sx={{
                marginBottom: 5,
                mt: -1,
                width: "50%",
                wordWrap: "break-word",
                whiteSpace: "normal",
              }}
            >
              {comment.comment}
            </Typography>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default DetailedRecipe;
