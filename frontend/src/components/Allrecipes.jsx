import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { Button, Container, Grid, Paper, Rating, Typography } from '@mui/material';

const Allrecipes = () => {
    var location = useLocation();
  location.state || "";
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const apiUrl = `http://localhost:3000/recipe/viewall`;

    axios.get(apiUrl)
      .then(response => {
        setRecipes(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Navbar location={location} />
      {loading ? (
          <center>
            <br /><br /><br /><br />
          Loading...
          </center>
      ) : (
      <Grid container spacing={2} sx={{ml:-1.75,mt:7}}>
      {recipes.map((recipe, index) => (
        <Grid item xs={12} sm={15} md={3} lg={2.3} key={index}sx={{ml:1.1,mt:-2}}>
          <Paper elevation={3} sx={{ padding: 1,backgroundColor:'currentcolor', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '325px'}}>
          <Button
              variant='outlined' 
              sx={{overflow:'hidden',borderColor:'white',borderRadius:'15px','&:hover': {
                borderColor: 'darkorange',
              },}}
              onClick={()=>{ 
                navigate('/detrecipe', { state: recipe });
              }}
              style={{fontSize:'20px' ,fontFamily:'fantasy' ,color:'black'}}
             >
              <Container style={{ backgroundColor: 'currentcolor', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                <img src={`http://localhost:3000/${recipe.image}`} alt={recipe.name} style={{marginLeft:'-39px',marginTop:'-10px', width: '257px', height: '260px', objectFit: 'cover' }} />
                <Typography variant="subtitle1" fontFamily={'cursive'} sx={{ ml:-1.5,mt: 1,color:'white', fontWeight:'bold' }}>   
                  {recipe.name}
                </Typography>
                <Rating
                    name={`rating-${index}`}
                    value={recipe.rating || 0}
                    readOnly
                    precision={0.1}
                    sx={{ ml:-2,mb:1,mt: 1,
                      '& .MuiRating-iconFilled': {
                        color: '#FFAD18',
                        },
                        '& .MuiRating-iconEmpty': {
                          color: 'grey',
                        },
                        '& .MuiRating-icon:hover': {
                          borderColor: 'darkorange',
                        },
                    }}
                />
              </Container>
            </Button>
          </Paper>
        </Grid>
      ))}
    </Grid>
    )}
    </div>
  )
}

export default Allrecipes
