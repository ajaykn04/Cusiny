import React, { useEffect, useState } from "react";
import NavbarAdmin from "./NavbarAdmin";
import axios from "axios";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/viewall");
        const filteredUsers = response.data.filter((user) => !user.admin);
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUsers();
  }, []);

  console.log(users);

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
                Name
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "fantasy",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "3vh",
                }}
              >
                EMAIL-ID
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "fantasy",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "3vh",
                }}
              >
                Place
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "fantasy",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "3vh",
                }}
              >
                Age
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "fantasy",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "3vh",
                }}
              >
                password
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((users, index) => {
              return (
                <TableRow key={index}>
                  <TableCell sx={{ fontFamily: "cursive", color: "white" }}>
                    {users.username}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "cursive", color: "white" }}>
                    {users.email}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "cursive", color: "white" }}>
                    {users.place}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "cursive", color: "white" }}>
                    {users.age}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "cursive", color: "white" }}>
                    {users.password}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "cursive", color: "white" }}>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "red" }}
                      onClick={async () => {
                        await axios.delete(
                          `http://localhost:3000/user/delete/`,
                          {
                            data: users,
                          }
                        );
                        window.location.reload(true);
                        console.log("User Successfully Deleted");
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

export default Users;