import { Box, Grid, Paper } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Button, Container } from 'react-bootstrap';
import axios from 'axios';

const Userdashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [recipes, setRecipes] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3000/recipe/featured")
      .then((res) => {
        setRecipes(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleImageClick = (recipe) => {
    navigate('/detrecipe', { state: recipe });
  };

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
        <center>Loading...</center>
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
          centerSlidePercentage={38}
          selectedItem={selectedIndex}
          onChange={handleSlideChange}
        >
          {recipes.map((recipe, index) => (
            <div
              key={index}
              style={{
                padding: '50px',
                transform: index === selectedIndex ? 'scale(1.1)' : 'scale(1)',
                transition: 'transform 0.5s ease-in-out',
              }}
            >
              <Grid item xs={12} sm={15} md={4} lg={2.3} sx={{ ml: 1.1 }}>
                <Paper elevation={3} sx={{ padding: 1, backgroundColor: 'currentcolor', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Container style={{ backgroundColor: 'currentcolor', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Box sx={{ backgroundColor: 'black', height: '40vh', borderRadius: '16px', width: '35vw', boxShadow: '4px 4px 4px rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                      <Box className="carousel-item" sx={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Button
                          onClick={() => { handleImageClick(recipe) }}
                          variant="outlined"
                          style={{ padding: 0, border: 'none', background: 'transparent', transition: 'transform 0.2s ease-in-out' }}
                          onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                          onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                          <img src={`http://localhost:3000/${recipe.image}`} style={{ height: 'auto', width: '100%', objectFit: 'cover' }} />
                        </Button>
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
