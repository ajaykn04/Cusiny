import { Box, Grid, Paper, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import { CenterFocusStrong } from '@mui/icons-material';

const Userdashboard = () => {
  const location = useLocation();
  const [recipes, setRecipes] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    axios.get("http://localhost:3000/recipe/featured")
      .then((res) => {
        setRecipes(res.data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch(() => {
        setLoading(false); // Ensure loading is false even if there's an error
      });
  }, []);

  const handleSlideChange = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div>
      <Navbar location={location} />
      <br />
      <br />
      <br />
      <br />
      {loading ? (
          <center>
          Loading...
          </center>
      ) : (
        <Carousel
          autoPlay
          interval={4000}
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          showIndicators={true}
          swipeable={true}
          centerMode={true}
          centerSlidePercentage={40}
          selectedItem={selectedIndex}
          onChange={handleSlideChange}
        >
          {recipes.map((recipe, index) => (
            <div
              key={index}
              style={{
                padding: '50px',
                transform: index === selectedIndex ? 'scale(1.2)' : 'scale(1)',
                transition: 'transform 0.5s ease-in-out',
              }}
            >
              <Grid item xs={12} sm={15} md={4} lg={2.3} sx={{ ml: 1.1 }}>
                <Paper elevation={3} sx={{ padding: 1, backgroundColor: 'currentcolor', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Container style={{ backgroundColor: 'currentcolor', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Box sx={{ backgroundColor: 'black', height: '42vh', borderRadius: '16px', width: '35vw', boxShadow: '4px 4px 4px rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                      <Box className="carousel-item" sx={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={`http://localhost:3000/${recipe.image}`} style={{ height: 'auto', width: '100%', objectFit: 'cover' }} />
                      </Box>
                    </Box>
                  </Container>
                </Paper>
              </Grid>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default Userdashboard;
