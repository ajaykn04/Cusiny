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
      <Navbar/>
      <Container>
        <Typography variant='h3' style={{fontFamily:'cursive',fontWeight:'bold',marginTop:80,marginLeft:-130}}>
            {response.state.name}
        </Typography>
        <Rating style={{marginLeft:-105}}
                    name={`rating`}
                    value={response.state.rating || 0}
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
        <Container>
            <img src={`http://localhost:3000/${response.state.image}`} alt={response.state.name} style={{ marginTop:20,marginLeft:-180,width: '500px', height: 'auto', objectFit: 'cover' }} />
        </Container>
        
      </Container>
    </div>
  )
}

export default Detailedrecipe
