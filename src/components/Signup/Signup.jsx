import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, CssBaseline, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { usePost } from '../../hooks/use-post';
import { useUserContext } from '../../Context/userContext';


const Signup = () => {

  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ email, setEmail] = useState("");
  const [ password, setPassword ] = useState("");   

  const url = "http://localhost/Classroom/Signup/Signup.php";

  const { postData } = usePost();
  const navigate = useNavigate();

  const { user, error, clearError } = useUserContext();


  React.useEffect(() => {
    if(user == null) {
      
    } else {
        navigate('/');
    }
  }, [])

  async function handleSubmit(e) {
    e.preventDefault();

    let fData = {
      First_name: firstName,
      Last_name: lastName,
      Email: email,
      Password: password
    }

    const success = await postData(url, fData);

    if(success){
      clearError();
      navigate("/");
    } 
  }

  function handlePasswordError(){
    if(error.Password == "Password is required"){
      return error.Password;
    } else {
      let x = "";
      error.Password.forEach((e) => {
        x = x + e + " ";
      })
      return x;
    }
  }

  return (
    <div className='bg-gray-100'>
    <div className="min-h-screen mx-6 bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <Container component="main" maxWidth="xs" className="bg-white p-8 rounded-lg shadow-lg">
      <CssBaseline />
      <Box className="flex flex-col items-center justify-center">
        <Typography component="h1" variant="h5" className="mb-6">
          Sign Up
        </Typography>
        <form className="w-full" method='post' onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="firstName"
            label="First Name *"
            name="firstName"
            autoComplete="given-name"
            autoFocus
            className="mb-4"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            error={error && error.First_name}
            helperText={error && error.First_name }
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
            className="mb-4"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            error={error && error.Last_name}
            helperText={error && error.Last_name }
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address *"
            name="email"
            autoComplete="email"
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
            autoComplete="new-password"
            className="mb-4"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            error={error && error.Password}
            helperText={error && error.Password && handlePasswordError()}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="mb-4"
          >
            Sign Up
          </Button>
          <Link to="/login" className="flex space-x-1 text-gray-700 decoration-blue-600 underline underline-offset-4 my-4" onClick={clearError}>
              Already have an account? Login
            </Link>
        </form>
      </Box>
    </Container>
  </div>
  </div>
  )
}

export default Signup