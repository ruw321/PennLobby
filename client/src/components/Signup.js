/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { useNavigate } from 'react-router-dom';
import { signup } from '../fetch';
// referenced from https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-in
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        PennLobby
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

const theme = createTheme();

function Signup({ updateStatus }) {
  const [redirect, setRedirect] = useState(false);
  const [errorMes, setErrorMes] = useState('');
  const [hasError, setHasError] = useState(false);
  // const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newUser = {
      username: data.get('username'),
      email: data.get('email'),
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      password: data.get('password'),
    };
    const r = await signup(newUser);
    const response = await r.json();
    if (response.username) {
      // the following comment makes eslint ignore the error of _id
      /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
      setRedirect(true);
    } else {
      setErrorMes(response.error);
      setHasError(true);
    }
  };

  useEffect(() => {
    if (redirect) {
      // navigate(`/lobby`);
      updateStatus('login');
    }
  }, [redirect]);

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(../../signup.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <img className="logo" src="../../logo.png" alt="logo_pic" />
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              {/* <LockOutlinedIcon /> */}
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="Username"
                    name="username"
                    required
                    fullWidth
                    id="userName"
                    label="Username"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  {hasError
                    ? (
                      <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        Sign up failed - <strong>{errorMes}</strong>
                      </Alert>
                    )
                    : (<Typography />)}
                </Grid>
              </Grid>
              <Button
                className="signup-button"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link variant="body2" className="signup-link" onClick={() => updateStatus('login')}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
              <br />
              <br />
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Signup;
