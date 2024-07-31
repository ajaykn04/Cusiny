import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import { Container, Grid, Paper, Typography } from '@mui/material';

const Allrecipes = () => {
    var location = useLocation();
  location.state || "";

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const apiUrl = `http://localhost:3000/recipe/viewall`;

    axios.get(apiUrl)
      .then(response => {
        setRecipes(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <Navbar location={location} />
      <Grid container spacing={2} sx={{mt:2}}>
      {recipes.map((recipe, index) => (
        <Grid item xs={12} sm={15} md={4} lg={2.3} key={index}>
          <Paper elevation={3} sx={{ padding: 1,backgroundColor:'currentcolor', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '400px'}}>
            <Container style={{ backgroundColor: 'currentcolor', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            {/* <Container style={{width:'auto',height:'100px',backgroundColor:'currentcolor', flex:1,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <img src={`http://localhost:3000/${recipe.image}`} alt={recipe.name} style={{ width: 'auto', height: '300px', objectFit: 'cover' }} />
            </Container> */}
            <img src={`http://localhost:3000/${recipe.image}`} alt={recipe.name} style={{ width: 'auto', height: '300px', objectFit: 'cover' }} />
            <Typography variant="h6" fontFamily={'cursive'} sx={{ mt: 1,color:'white', fontWeight:'bold' }}>
              {recipe.name}
            </Typography>
            </Container>
          </Paper>
        </Grid>
      ))}
    </Grid>
    </div>
  )
}

export default Allrecipes
