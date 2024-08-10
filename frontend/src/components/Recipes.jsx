import React, { useEffect, useState } from "react";
import NavbarAdmin from "./NavbarAdmin";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/recipe/viewall");
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRecipes();
  }, []);
  

  console.log(recipes);

  return (
    <div>
      <NavbarAdmin />
      <TableContainer style={{ marginTop: "10vh" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontFamily: "fantasy",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "3vh",
                }}
              >
                IMG
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "fantasy",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "3vh",
                }}
              >
                NAME
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "fantasy",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "3vh",
                }}
              >
                OWNER
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "fantasy",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "3vh",
                }}
              >
                CATEGORY
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recipes.map((recipes, index) => {
              return (
                <TableRow key={index}>
                  <TableCell sx={{ fontFamily: "cursive", color: "white" }}>
                    <img
                      src={`http://localhost:3000/${recipes.image}`}
                      alt={recipes.name}
                      style={{width:"2vw",height:"6vh"}}
                      // style={{
                      //   marginLeft: "-39px",
                      //   marginTop: "-10px",
                      //   width: "261px",
                      //   height: "260px",
                      //   objectFit: "cover",
                      // }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontFamily: "cursive", color: "white" }}>
                    {recipes.name}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "cursive", color: "white" }}>
                    {recipes.ownername}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "cursive", color: "white" }}>
                    {recipes.category}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "cursive", color: "white" }}>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "red" }}
                      onClick={async () => {
                        await axios.delete(
                          `http://localhost:3000/recipe/delete/${recipes._id}`
                        );
                        window.location.reload(true);
                        console.log("Recipe Successfully Deleted");
                      }}
                    >
                      DELETE
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Recipes;
