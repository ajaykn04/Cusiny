import React, { useEffect, useState } from "react";
import NavbarAdmin from "./NavbarAdmin";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/recipe/viewall"
        );
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRecipes();
  }, []);

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
            {recipes.map((recipe, index) => {
              return (
                <TableRow key={index}>
                  <TableCell sx={{ fontFamily: "cursive", color: "white" }}>
                    <Button
                    style={{color:"black",marginTop:-10,marginBottom:-10,marginLeft:-15}}
                    onClick={()=>{
                      navigate("/detrecipeadmin", { state: recipe })
                    }}
                    >
                      <img
                        src={`http://localhost:3000/${recipe.image}`}
                        alt={recipe.name}
                        style={{ width: "2vw", height: "6vh", cursor: "pointer" }}
                      />
                    </Button>
                  </TableCell>
                  <TableCell sx={{ fontFamily: "cursive", color: "white" }}>
                    {recipe.name}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "cursive", color: "white" }}>
                    {recipe.ownername}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "cursive", color: "white" }}>
                    {recipe.category}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "cursive", color: "white" }}>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "red" }}
                      onClick={async () => {
                        await axios.delete(
                          `http://localhost:3000/recipe/delete/${recipe._id}`
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
