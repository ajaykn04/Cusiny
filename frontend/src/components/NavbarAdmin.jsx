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
import { useNavigate } from "react-router-dom";
import iconImage from "/Cusiny.png";
import LogoutIcon from "@mui/icons-material/Logout";

const StyledToolbar = styled(Toolbar)`
  background-color: black;
`;

const NavbarAdmin = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    navigate("/");
  };

  return (
    <div>
      <AppBar position="fixed" style={{ borderBottom: "2px solid #181818" }}>
        <StyledToolbar>
          <Avatar
            sx={{ width: 100, height: 100, mt: -4, mb: -4 }}
            alt="Cusiny"
            src={iconImage}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              style={{
                fontSize: "20px",
                fontFamily: "fantasy",
                color: "white",
                marginBottom: -15,
                marginLeft: 0,
              }}
            >
              Admin
            </Typography>
            <Typography
              style={{
                fontSize: "30px",
                fontFamily: "fantasy",
                color: "white",
              }}
            >
              Cusiny
            </Typography>
          </div>
          <Container
            sx={{
              marginLeft: 43,
              justifyItems: "center",
              display: "flex",
              justifyContent: "flex",
              gap: "6rem",
            }}
          >
            <Button
              variant="text"
              onClick={() => navigate("/admindash")}
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
              onClick={() => navigate("/admin/users")}
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
              onClick={() => navigate("/admin/recipes")}
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
          <IconButton sx={{ color: "white" }} onClick={logoutHandler}>
            <LogoutIcon />
          </IconButton>
        </StyledToolbar>
      </AppBar>
    </div>
  );
};

export default NavbarAdmin;
