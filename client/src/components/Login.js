/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { useNavigate } from 'react-router-dom';
// import { joinChat } from './getData';
import { login, registerMessage } from '../fetch';

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

function Login(props) {
  const { updateUserName, updateStatus } = props;
  const [redirect, setRedirect] = useState(false);
  const [baduser, setBadUser] = useState('');
  const [errorMes, setErrorMes] = useState('');
  const [lockedtime, setLockedTime] = useState(null);
  // const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const password = data.get("password");
    // TODO: add typecheck here for the user inputs
    if (username && password) {
      if (baduser !== username) {
        const u = await login(username, password);
        const response = await u.json();
        if (u.ok) {
          const msgNewUser = await registerMessage(username);
          sessionStorage.setItem('token', msgNewUser.token);
          sessionStorage.setItem('username', username);
          updateUserName(username);
          sessionStorage.setItem('id', response.id);
          // if (response.token) {
          //   sessionStorage.setItem('token', response.token); // store token in session storage
          // }
          setRedirect(true);
        } else if (response.error === "too many failed requests") {
          setBadUser(username);
          setErrorMes("Too many failed attempts, your account is locked for 15 mins");
          setLockedTime(new Date());
        } else {
          setErrorMes("Invalid username or password");
        }
      } else {
        // detects that the username is the locked out user
        const diffMs = (new Date() - lockedtime);
        const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
        // if the time is up, reset everything
        if (diffMins > 14) {
          setBadUser(null);
          setLockedTime(null);
          setErrorMes(null);
        } else {
          // if there is still time left, show the user how much time is left
          setErrorMes(`You account is locked out for: ${15 - diffMins} mins`);
        }
      }
    }
  };

  useEffect(() => {
    if (redirect) {
      // navigate(`/lobby`);
      updateStatus('lobby');
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
            backgroundImage: "url(../../login.png)",
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
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="Username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {errorMes
                ? (
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Authentication Failed — <strong>{errorMes}</strong>
                  </Alert>
                )
                : (<Typography />)}
              <Button
                className="login-button"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                {/* <Grid item xs>
                  <Link href="/" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link 
                    variant="body2" 
                    onClick={() => updateStatus('signup')}
                  >
                    Don&apos;t have an account? Sign Up
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

export default Login;
