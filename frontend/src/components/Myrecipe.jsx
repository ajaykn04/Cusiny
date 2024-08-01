import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import { Button, Container, Grid, Paper, Typography } from '@mui/material';

const Myrecipe = () => {
  var location = useLocation();
  location.state || "";
  console.log(location.state.username)


  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const apiUrl = `http://localhost:3000/user/recipes/${location.state._id}`;

    axios.get(apiUrl)
      .then(response => {
        setRecipes(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
 
  return (
    <div>
      <Navbar location={location} />
      <Grid container spacing={2} sx={{ml:-1.75,mt:7}}>
      {recipes.map((recipe, index) => (
        <Grid item xs={12} sm={15} md={4} lg={2.3} key={index}sx={{ml:1.1,mt:-2}}>
          <Paper elevation={3} sx={{ padding: 1,backgroundColor:'currentcolor', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '325px'}}>
          <Button 
              variant='outlined' 
              sx={{overflow:'hidden',borderColor:'orange',borderRadius:'15px'}}
              onClick={()=>{ 
                navigate('/recipe/add', { state: location.state });
              }}
              style={{fontSize:'20px' ,fontFamily:'fantasy' ,color:'black'}}
             >
              <Container style={{ backgroundColor: 'currentcolor', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <img src={`http://localhost:3000/${recipe.image}`} alt={recipe.name} style={{marginTop:'-10px', width: '260px', height: '260px', objectFit: 'cover' }} />
                <Typography variant="subtitle1" fontFamily={'cursive'} sx={{ mt: 1,color:'white', fontWeight:'bold' }}>
                  {recipe.name}
                </Typography>
              </Container>
            </Button>
          </Paper>
        </Grid>
      ))}
    </Grid>
    </div>
  )
}

export default Myrecipe