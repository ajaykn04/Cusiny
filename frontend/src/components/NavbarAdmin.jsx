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
import { Link, useLocation, useNavigate } from "react-router-dom";
import iconImage from "/dishify_pbg1.png";
import profileImage from "/defaultlogin.png";

const StyledToolbar = styled(Toolbar)`
  background-color: black;
`;

const NavbarAdmin = ({ location }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {};
  var location = useLocation();

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
            sx={{ display: "flex", justifyContent: "flex-start", gap: "6rem" }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button
              variant="text"
              onClick={() => {
                navigate("/admindash");
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
                navigate("/admin/users");
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
                USERS
              </Typography>
            </Button>
            <Button
              variant="text"
              onClick={() => {
                navigate("/admin/recipes");
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
                RECIPES
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

export default NavbarAdmin;
