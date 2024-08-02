import { Box, CardContent, CardMedia, Grid, IconButton, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Navbar from './Navbar'
import { useLocation } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel';
import { Card, Container } from 'react-bootstrap';
import { useTheme } from '@mui/material/styles';


import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Image } from '@mui/icons-material';
import axios from 'axios';

const Userdashboard = () => {

  var location = useLocation();
  location.state || "";
  const [recipes, setRecipes] = useState([]);
  axios.get("http://localhost:3000/recipe/featured").then((res) => {
    setRecipes(res.data);
  });
  return (
    <div>
      <Navbar location={location} />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        swipeable={true}
        
        padding="0 45%"
        overflow="visible"
        // centerMode={true}
        // centerSlidePercentage={33.33}
      >
        {recipes.map((recipe, index) => (
          <div key={index} style={{padding: '50px'}}>
            <Grid item xs={12} sm={15} md={4} lg={2.3} key={index} sx={{ ml: 1.1 }} >
              <Paper elevation={3} sx={{ padding: 1, backgroundColor: 'currentcolor', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Container style={{ backgroundColor: 'currentcolor', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Box sx={{ backgroundColor: 'whitesmoke', height: '45vh', borderRadius: '16px', width: '40vw', boxShadow: '4px 4px 4px rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: '', justifyContent: 'flex-start', overflow: 'hidden', alignItems: 'flex-start' }}>
                    <Box sx={{ height: '100%', width: '100%', display: 'flex', alignItems: 'centerr', justifyContent: 'flex-start', border: '1px solid black' }}>
                      <img src={`http://localhost:3000/${recipe.image}`} style={{ height: 'auto', width: '100%', objectFit: 'cover' }} />
                    </Box>
                  </Box>
                </Container>
              </Paper>
            </Grid>
          </div>

        ))}
      </Carousel>
    </div>
  )
}





<Box sx={{ backgroundColor: 'whitesmoke', height: '45vh', borderRadius: '16px', width: '40vw', boxShadow: '4px 4px 4px rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: '', justifyContent: 'flex-start', overflow: 'hidden', alignItems: 'flex-start' }}>
  <Box sx={{ height: '100%', width: '100%', display: 'flex', alignItems: 'centerr', justifyContent: 'flex-start', borderRight: '1px solid black' }}>
    <img src='http://localhost:3000/images/recipes/66aa91bd9162f9427482b83f.webp' style={{ height: 'auto', width: '100%', objectFit: 'cover' }} />
  </Box>
</Box>
export default Userdashboard
