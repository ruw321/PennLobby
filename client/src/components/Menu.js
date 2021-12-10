/* eslint-disable no-unused-vars */
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
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { IconButton } from "@mui/material";
import TrendingTopics from "./TrendingTopics";
import GroupCard from "./GroupCard";

function Menu() {
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
            href="/lobby"
            sx={{ my: 1, mx: 7 }}
            // fontWeight="600"
            id="home"
          >
            Home
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="/group"
            sx={{ my: 1, mx: 7 }}
            id="mygroups"
          >
            My Groups
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="/post"
            sx={{ my: 1, mx: 7 }}
            id="myposts"
          >
            My Posts
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="/message"
            sx={{ my: 1, mx: 7 }}
            id="messages"
          >
            Messages
          </Link>
        </nav>
        <section className={classes.rightToolbar} margin="auto">
          <IconButton aria-label="delete" href="./message">
            <NotificationsNoneIcon />
          </IconButton>
          <Button href="./login" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Login
          </Button>

        </section>
      </Toolbar>
    </AppBar>
  );
}

export default Menu;
