import { AppBar, Avatar, Button, Container, IconButton, styled, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import iconImage from '/dishify_pbg1.png';
import profileImage from '/defaultlogin.png';

const StyledToolbar = styled(Toolbar)`
    background-color: black;  
`;


const NavbarAdmin = ({ location }) => {

    const navigate = useNavigate();

    const handleProfileClick = () => {
      };
      var location = useLocation();
      console.log(location)


  return (
    <div>
      <AppBar position='fixed'>
            <StyledToolbar >
                
                <Avatar sx={{ width: 50, height: 50 }} alt="Dishify" src={iconImage} />
                {/* <center style={{display:'flex',justifyContent:'flex-start'}}> */}
                <Typography style={{ fontSize:'40px', fontFamily: 'fantasy', color:'white' }}>&nbsp;</Typography>
                {/* <Typography  variant='overline' style={{fontFamily:'initial'}}>For the best products</Typography> */}
                &nbsp;&nbsp;
                <Typography variant='overline' style={{fontFamily:'initial'}}>For&nbsp;</Typography>
                <Typography variant='overline' style={{fontFamily:'initial'}}>the&nbsp;</Typography>
                <Typography variant='overline' style={{fontFamily:'initial'}}>best&nbsp;</Typography>
                <Typography variant='overline' style={{fontFamily:'initial'}}>Recipes</Typography>
                {/* </center> */}
                <Container sx={{ display: 'flex', justifyContent: 'flex-start', gap:'6rem' }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button variant='text' style={{fontSize:'20px',fontFamily:'fantasy' ,color:'black'}}>
                    <Link style={{textDecoration:'none',color:'orange'}} to={'/admindash'}>HOME</Link>
                </Button>
                </Container>
                <IconButton onClick={handleProfileClick}>
                    <Avatar alt="Profile" src={profileImage} />
                </IconButton>
            </StyledToolbar>
        </AppBar>
    </div>
  )
}

export default NavbarAdmin
