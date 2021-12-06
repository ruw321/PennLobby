/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-unresolved */
import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Menu from "./Menu";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function Album() {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Menu />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="lg" justify="flex-end">
            <Grid item xs={12} align="center" maxWidth="lg" sx={{ pt: 4, pb: 4, background: 'rgb(240, 240, 240)' }}>
              <CardMedia
                component="img"
                sx={{
                  borderRadius: '50%', height: 120, width: 120, display: { xs: 'none', sm: 'block' },
                }}
                image="https://picsum.photos/536/354"
              />
            </Grid>
          </Container>

          <Container maxWidth="lg">
            <Typography
              sx={{ pt: 4 }}
              component="h5"
              variant="h5"
              align="center"
              color="text.primary"
              gutterBottom
            >
              My Name
            </Typography>
            <Typography variant="h6" align="center" color="text.secondary" paragraph>
              Something short and leading about the collection below—its contents,
              the creator, etc. Make it short and sweet, but not too short so folks
              don&apos;t simply skip over it entirely.
            </Typography>
            <Stack
              sx={{ pt: 0 }}
              direction="row"
              spacing={0}
              justifyContent="center"
            >
              <Button variant="contained">Upload profile picture</Button>
            </Stack>
          </Container>
        </Box>

        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1, borderColor: 'divider',
            }}
          >
            <TabList className="tablist" onChange={handleChange} centered variant="fullWidth">
              <Tab label="About" value="1" />
              <Tab label="Friends" value="2" />
              <Tab label="Groups" value="3" />
            </TabList>
          </Box>

          <TabPanel value="1" alt="About">
            <Container sx={{ py: 8 }} maxWidth="lg">
              <CardContent sx={{ flexGrow: 1 }} maxWidth="lg">
                <Typography gutterBottom variant="h5" component="h2">
                  Intro
                </Typography>
                <Typography>
                  This is a media card. You can use this section to describe the
                  content.
                </Typography>
              </CardContent>

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  Hobbies
                </Typography>
                <Typography>
                  This is a media card. You can use this section to describe the
                  content.
                </Typography>
              </CardContent>
            </Container>
          </TabPanel>

          <TabPanel value="2" alt="Friends">

            <Container sx={{ py: 8 }} maxWidth="lg">
              {/* End hero unit */}
              <Grid container spacing={1}>
                {cards.map((card) => (
                  <Grid item key={card} xs={6} sm={4} md={2}>
                    <Card
                      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                      <CardMedia
                        component="img"
                        sx={{
                          // 16:9
                          pt: '1%',
                          height: '100px',
                          width: '200px',
                        }}
                        image="https://source.unsplash.com/random"
                        alt="random"
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h6" component="h6">
                          Name
                        </Typography>
                        <Typography gutterBottom variant="body" component="body">
                          Shared group: A
                        </Typography>
                      </CardContent>
                      <CardActions centered>
                        <Button size="small">View</Button>
                        <Button size="small">Edit</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </TabPanel>

          <TabPanel value="3" alt="Groups">

            <Container sx={{ py: 8 }} maxWidth="lg">
              {/* End hero unit */}
              <Grid container spacing={1}>
                {cards.map((card) => (
                  <Grid item key={card} xs={6} sm={4} md={4}>
                    <Card
                      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                      <CardMedia
                        component="img"
                        sx={{
                          // 16:9
                          pt: '1%',
                          height: '200px',
                          width: '400px',
                        }}
                        image="https://source.unsplash.com/random"
                        alt="random"
                      />
                      <CardContent sx={{ flexGrow: 1 }} center>
                        <Typography gutterBottom variant="h6" component="h6">
                          Group Name
                        </Typography>
                        <Typography gutterBottom variant="body" component="body">
                          Group intro
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">View Details</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </TabPanel>
        </TabContext>

      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
