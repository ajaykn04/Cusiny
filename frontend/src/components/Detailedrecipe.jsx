import React from "react";
import Navbar from "./Navbar";
import { Box, Container, Rating, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const Detailedrecipe = () => {
  var response = useLocation();
  response.state || "";

  return (
    <div>
      <Navbar />
      <Container
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Typography
          variant="h3"
          style={{
            fontFamily: "cursive",
            fontWeight: "bold",
            marginTop: 80,
            marginLeft: -130,
          }}
        >
          {response.state.name}
        </Typography>
        <Rating
          style={{ marginLeft: -105 }}
          name={`rating`}
          value={response.state.rating || 0}
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
        <Typography
          variant="body1"
          style={{
            marginLeft: 30,
            marginTop: -32.3,
            fontFamily: "cursive",
            fontWeight: "bold",
          }}
        >
          {response.state.category}
        </Typography>
        <img
          src={`http://localhost:3000/${response.state.image}`}
          alt={response.state.name}
          style={{
            border: "4px solid white",
            borderRadius: "15px",
            marginTop: 20,
            marginLeft: -150,
            width: "500px",
            height: "auto",
            objectFit: "cover",
          }}
        />
      </Container>
      <Box
        style={{
          marginTop: "-90vh",
          width: "58vw",
          marginLeft: "40vw",
        }}
      >
        <Box
          style={{
            marginLeft: "0vw",
            width: "50vw",
          }}
        >
          <Typography
            variant="h4"
            style={{
              fontFamily: "cursive",
              fontWeight: "bold",
              marginRight: 100,
            }}
          >
            Ingredients
          </Typography>
          <Typography
            variant="body1"
            style={{
              marginTop: 10,
              marginRight: 50,
              fontFamily: "cursive",
              whiteSpace: "pre-line",
            }}
          >
            {response.state.ingredients}
          </Typography>
        </Box>
        <Box
          style={{
            marginLeft: "0vw",
            width: "58vw",
          }}
        >
          <Typography
            variant="h4"
            style={{ fontFamily: "cursive", fontWeight: "bold", marginTop: 20 }}
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
            {response.state.instructions}
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default Detailedrecipe;
