/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import TrendingTopics from "./TrendingTopics";
import FeaturedPost from "./FeaturedPost";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

const theme = createTheme();

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const topics = [
  "Music",
  "Football",
  "Sports",
  "Ivy Leagues",
  "Arts",
  "Musical",
  "Residential",
  "Rent",
  "Living",
  "News",
];
const sortMethod = [
  "Recently Active",
  "Size: Large-Small",
  "Size: Small-Large",
  "Most Active",
];
const featuredPosts = [
  {
    title: "Penn Football",
    size: "293",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageLabel: "Image Text",
  },
  {
    title: "Penn Musical Lovers",
    size: "200",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageLabel: "Image Text",
  },
  {
    title: "Penn Residential",
    size: "200",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageLabel: "Image Text",
  },
  {
    title: "Daily Philadelphia",
    size: "200",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageLabel: "Image Text",
  },
];
const trendingTopicsToday = [
  "Music",
  "Football",
  "Sports",
  "Ivy Leagues",
  "Arts",
  "Musical",
  "Residential",
  "Rent",
  "Living",
  "News",
];
const trendingTopicsWeekly = [
  "Sports",
  "Ivy Leagues",
  "Arts",
  "Musical",
  "Residential",
  "Rent",
  "Living",
  "News",
  "Music",
  "Football",
];
function Album() {
  const [selectTopics, setSelectTopics] = React.useState([]);
  const [selectSortBy, setSelectSortBy] = React.useState([]);

  const handleChangeTopics = (event) => {
    const {
      target: { value },
    } = event;
    setSelectTopics(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
  };
  const handleChangeSortBy = (event) => {
    const {
      target: { value },
    } = event;
    setSelectSortBy(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
  };
  const useStyles = makeStyles({
    // This group of buttons will be aligned to the right
    rightToolbar: {
      marginLeft: "auto",
      marginRight: -12,
    },
    menuButton: {
      marginRight: 16,
      marginLeft: -12,
    },
  });
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (themes) => `1px solid ${themes.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 0.3 }}
          >
            <img className="barLogo" src="../../logo.png" alt="logo_pic" />
          </Typography>
          <nav>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 7 }}
              id="home"
            >
              Home
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 7 }}
              id="mygroups"
            >
              My Groups
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 7 }}
              id="myposts"
            >
              My Posts
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 7 }}
              id="messages"
            >
              Messages
            </Link>
          </nav>
          <section className={classes.rightToolbar}>
            <Button href="./login" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
              Login
            </Button>
          </section>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        {/* Filter and Sort options */}
        <Container maxWidth="lg" justify="flex-end">
          <Grid container spacing={2}>
            <Grid item key={1} xs={6} md={9}>
              <Box
                sx={{
                  bgcolor: "background.paper",
                  pt: 4,
                  pb: 2,
                }}
              >
                <Container maxWidth="md" justify="flex-end">
                  <div>
                    <FormControl sx={{ m: 1, width: 250 }}>
                      <InputLabel id="demo-multiple-checkbox-label">
                        Filter Topics
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={selectTopics}
                        onChange={handleChangeTopics}
                        input={<OutlinedInput label="Filter Topics" />}
                        renderValue={(selected) => selected.join(", ")}
                        MenuProps={MenuProps}
                      >
                        {topics.map((name) => (
                          <MenuItem key={name} value={name}>
                            <Checkbox
                              checked={selectTopics.indexOf(name) > -1}
                            />
                            <ListItemText primary={name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: 250 }}>
                      <InputLabel id="demo-multiple-checkbox-label">
                        Sort by
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        value={selectSortBy}
                        onChange={handleChangeSortBy}
                        input={<OutlinedInput label="Topics" />}
                        renderValue={(selected) => selected.join(", ")}
                        MenuProps={MenuProps}
                      >
                        {sortMethod.map((name) => (
                          <MenuItem key={name} value={name}>
                            <ListItemText primary={name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </Container>
              </Box>
              {/* Groups */}
              <Container sx={{ pt: 2 }} maxWidth="lg">
                <Grid container rowSpacing={3} columnSpacing={0}>
                  {featuredPosts.map((post) => (
                    <FeaturedPost key={post.title} post={post} />
                  ))}
                </Grid>
              </Container>
            </Grid>
            <Grid item key={2} xs={6} md={3}>
              <TrendingTopics
                trendingTopicsToday={trendingTopicsToday}
                trendingTopicsWeekly={trendingTopicsWeekly}
              />
            </Grid>
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
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

export default Album;
