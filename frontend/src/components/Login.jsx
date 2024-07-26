import React from 'react';


const Login = () => {
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '97vh',
          backgroundColor: '#0f0f0f',
        }}
      >
        
        <Box
          sx={{
            color:'black',
            backgroundColor: '#000',
            padding: '2rem',
            borderRadius: '0px',
            boxShadow: '0px 0px 20px',
            
           
            textAlign: 'center',
          }}
        >
          <img 
            src="/POMA.ico" 
            alt="Login Icon" 
            style={{ width: '100px', marginBottom: '1rem' }} 
          />
          <Typography fontFamily={'fantasy'} variant="h3" color="white" gutterBottom>
            LOG-IN
          </Typography>
          <TextField
            fullWidth
            id="us1"
            label="Username"
            variant="outlined"
            margin="normal"
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' }, sx: {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'orange',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'orange',
              },
            },}}
          />
          <TextField
            fullWidth
            id="ps1"
            type="password"
            label="Password"
            variant="outlined"
            margin="normal"
            InputLabelProps={{ style: { color: 'white' } }}
            InputProps={{ style: { color: 'white' }, sx: {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'orange',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'orange',
              },
            },}}
          />
          <Button
          
            variant="contained"
            sx={{ mt: 2, backgroundColor: 'orange','&:hover': {
          backgroundColor: 'orange',
        },}}
          >
          Log-in
          </Button>
          <Box mt={2}>
            <Link href="#" variant="body2" color='white' to={'https://d11a6trkgmumsb.cloudfront.net/original/3X/e/f/ef1be0808a508b11f722d0201c3f23cef40f1194.png'}>
              Forgot Password?
            </Link>
            <br />
            <Link href="#" variant="body2" color="green" to={'https://d11a6trkgmumsb.cloudfront.net/original/3X/e/f/ef1be0808a508b11f722d0201c3f23cef40f1194.png'}>
              Don't have an Account?
            </Link>
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default Login
