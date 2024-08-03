import React from 'react'
import Navbar from './Navbar'
import { Container, Rating, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Detailedrecipe = () => {

  var response = useLocation();
  response.state || "";
  console.log(response.state)


  return (
    <div>
      <Navbar />
      <Container style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
        <Typography variant='h3' style={{ fontFamily: 'cursive', fontWeight: 'bold', marginTop: 80, marginLeft: -130 }}>
          {response.state.name}
        </Typography>
        <Rating style={{ marginLeft: -105 }}
          name={`rating`}
          value={response.state.rating || 0}
          readOnly
          precision={0.1}
          sx={{
            ml: -2, mb: 1, mt: 1,
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
        <Typography variant='body1' style={{ marginLeft: 30, marginTop: -32.3, fontFamily: 'cursive', fontWeight: 'bold' }}>
          {response.state.category}
        </Typography>
        <Container>
          <img src={`http://localhost:3000/${response.state.image}`} alt={response.state.name} style={{ border: '4px solid white', borderRadius: '15px', marginTop: 20, marginLeft: -180, width: '500px', height: 'auto', objectFit: 'cover' }} />
        </Container>

      </Container>
    </div>
  )
}

export default Detailedrecipe
