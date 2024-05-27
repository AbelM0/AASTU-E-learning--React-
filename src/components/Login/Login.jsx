import React, { useEffect, useState } from 'react'
import { TextField, Button, Container, CssBaseline, Typography, Box } from '@mui/material';
import { Link, useNavigate} from 'react-router-dom';
import { useLoginPost } from '../../hooks/use-login-post';
import { useUserContext } from '../../Context/userContext';

const Login = () => {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const { postData } = useLoginPost();
  const { user, error, clearError } = useUserContext();
  const navigate = useNavigate();

  const url = "http://localhost/Classroom/Login/Login.php";

  React.useEffect(() => {
    if(user == null) {
      
    } else {
        navigate('/');
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    let fData = {
      Email: email,
      Password: password
    }

    const success = await postData(url, fData);

    if (success) {
      clearError();
      navigate('/');
    }
  }

  return (
    <div className='bg-gray-100'>
    <div className="min-h-screen mx-6 bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Container component="main" maxWidth="xs" className="bg-white mx-10 p-8 rounded-lg shadow-lg">
        <CssBaseline />
        <Box className="flex flex-col items-center justify-center">
          <Typography component="h1" variant="h5" className="mb-6">
            Login
          </Typography>
          <form className="w-full" method='post' onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email *"
              name="email"
              autoComplete="email"
              autoFocus
              className="mb-4"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              error={error && error.Email}
              helperText={error && error.Email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password *"
              type="password"
              id="password"
              autoComplete="current-password"
              className="mb-4"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              error={error && error.Password}
              helperText={error && error.Password }
            />
          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="mb-4"
            >
              Login
            </Button>
            <Link to="/signup" onClick={clearError} className="flex space-x-1 text-gray-700 decoration-blue-600 underline underline-offset-4 my-4">
              Create a new account
            </Link>
          </form>
        </Box>
      </Container>
    </div>
    </div>
  )
}

export default Login