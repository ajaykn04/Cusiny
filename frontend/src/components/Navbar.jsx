import {
  AppBar,
  Avatar,
  Button,
  Container,
  IconButton,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import iconImage from "/dishify_pbg1.png";
import profileImage from "/defaultlogin.png";

const StyledToolbar = styled(Toolbar)`
  background-color: black;
`;

// const Navbar = ({ location }) => {
const Navbar = () => {
  const navigate = useNavigate();
  // const currentLocation = useLocation();

  const handleProfileClick = () => {
    navigate("/profile");
    // navigate("/profile", { state: currentLocation.state });
  };

  return (
    <div>
      <AppBar position="fixed">
        <StyledToolbar>
          <Avatar
            sx={{ width: 100, height: 100, mt: -4, mb: -4 }}
            alt="Cusiny"
            src={iconImage}
          />
          <Typography
            style={{
              fontSize: "30px",
              fontFamily: "fantasy",
              color: "white",
              marginLeft: -12,
            }}
          >
            Cusiny
          </Typography>
          <Container
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "6rem",
              ml: 25,
            }}
          >
            <Button
              variant="text"
              onClick={() => {
                navigate("/userdash");
                // navigate("/userdash", { state: currentLocation.state })
              }}
              style={{
                fontSize: "20px",
                fontFamily: "fantasy",
                color: "black",
              }}
            >
              <Typography
                style={{
                  fontFamily: "fantasy",
                  fontSize: "20px",
                  color: "orange",
                }}
              >
                HOME
              </Typography>
            </Button>
            <Button
              variant="text"
              onClick={() => {
                navigate("/recipe/add");
                // navigate("/recipe/add", { state: currentLocation.state })
              }}
              style={{
                fontSize: "20px",
                fontFamily: "fantasy",
                color: "black",
              }}
            >
              <Typography
                style={{
                  fontFamily: "fantasy",
                  fontSize: "20px",
                  color: "orange",
                }}
              >
                Add Recipe
              </Typography>
            </Button>
            <Button
              variant="text"
              onClick={() => {
                navigate("/user/recipes");
                // navigate("/user/recipes", { state: currentLocation.state })
              }}
              style={{
                fontSize: "20px",
                fontFamily: "fantasy",
                color: "black",
              }}
            >
              <Typography
                style={{
                  fontFamily: "fantasy",
                  fontSize: "20px",
                  color: "orange",
                }}
              >
                My Recipes
              </Typography>
            </Button>
            <Button
              variant="text"
              onClick={() => {
                navigate("/recipes");
                // navigate("/recipes", { state: currentLocation.state })
              }}
              style={{
                fontSize: "20px",
                fontFamily: "fantasy",
                color: "black",
              }}
            >
              <Typography
                style={{
                  fontFamily: "fantasy",
                  fontSize: "20px",
                  color: "orange",
                }}
              >
                All Recipes
              </Typography>
            </Button>
          </Container>
          <IconButton onClick={handleProfileClick}>
            <Avatar alt="Profile" src={profileImage} />
          </IconButton>
        </StyledToolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
