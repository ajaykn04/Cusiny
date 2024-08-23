import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import "./Userdashboard.css";

const Userdashboard = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Meals");
  const [recipes, setRecipes] = useState([]);
  const categories = ["Meals", "Vegetarian", "Salad", "Drinks", "Desserts"];
  const [recipys, setRecipys] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/recipe/viewall")
      .then((res) => {
        setRecipys(res.data);
      })
      .catch(() => {
        setLoading(false);
        console.error(error);
      });
  }, []);

  const filteredRecipys = recipys.filter(
    (recipy) => recipy.category === selectedCategory
  );

  useEffect(() => {
    axios
      .get("http://localhost:3000/recipe/featured")
      .then((res) => {
        setRecipes(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        console.error(error);
      });
  }, []);

  const handleImageClick = (recipe) => {
    navigate("/detrecipe", { state: recipe });
  };

  const handleSlideChange = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      {loading ? (
        <center>Loading...</center>
      ) : (
        <Carousel
          autoPlay
          interval={2500}
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          stopOnHover={false}
          showIndicators={true}
          swipeable={true}
          centerMode={true}
          centerSlidePercentage={36.5}
          selectedItem={selectedIndex}
          onChange={handleSlideChange}
        >
          {recipes.map((recipe, index) => (
            <div
              key={index}
              style={{
                padding: "50px",
                transform: index === selectedIndex ? "scale(1.1)" : "scale(.9)",
                transition: "transform 0.5s ease-in-out",
              }}
            >
              <Grid
                item
                xs={12}
                sm={15}
                md={4}
                lg={2.3}
                sx={{ mt: -4, ml: 1.1 }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    padding: 1,
                    backgroundColor: "currentcolor",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Container
                    style={{
                      backgroundColor: "currentcolor",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "black",
                        height: "40vh",
                        borderRadius: "2.5vw",
                        width: "35vw",
                        boxShadow: "4px 4px 4px rgb(47, 37, 25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        className="carousel-item"
                        sx={{
                          height: "100%",
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          onClick={() => {
                            handleImageClick(recipe);
                          }}
                          variant="outlined"
                          style={{
                            padding: 0,
                            border: "none",
                            background: "transparent",
                            color: "black",
                          }}
                        >
                          <img
                            src={`http://localhost:3000/${recipe.image}`}
                            style={{
                              height: "auto",
                              width: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </Button>
                      </Box>
                    </Box>
                  </Container>
                </Paper>
              </Grid>
            </div>
          ))}
        </Carousel>
      )}

      <div className="recipy-container">
        <h2 className="category-title">Category</h2>
        <div className="category-buttons">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-button ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          {filteredRecipys.map((recipy, index) => (
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
                <Button
                  variant="outlined"
                  sx={{
                    overflow: "hidden",
                    borderColor: "white",
                    width:"257px",
                    height:"325px",
                    borderRadius: "15px",
                    "&:hover": { borderColor: "darkorange" },
                  }}
                  onClick={() => {
                    navigate("/detrecipe", { state: recipy });
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
                      src={`http://localhost:3000/${recipy.image}`}
                      alt={recipy.name}
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
                      {recipy.name}
                    </Typography>
                    <Rating
                      name={`rating-${index}`}
                      value={recipy.rating || 0}
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
      </div>
    </div>
  );
};

export default Userdashboard;
