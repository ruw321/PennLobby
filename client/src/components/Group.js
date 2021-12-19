/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
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
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { FormControlLabel } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import TrendingTopics from "./TrendingTopics";
import GroupCard from "./GroupCard";
import {
  createGroup,
  getAllGroups,
  getAllTopics,
  getTopicByName,
  getAllPublicGroups,
  logout,
} from "../fetch";

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
async function sortGroup(method) {
  let groups = await getAllPublicGroups();
  if (method === "Recently Active") {
    groups = groups.sort(
      (group1, group2) => group2.last_active - group1.last_active
    );
  } else if (method === "Size: Large-Small") {
    groups = groups.sort(
      (group1, group2) => group2.member_ids.length - group1.member_ids.length
    );
  } else if (method === "Size: Small-Large") {
    groups = groups.sort(
      (group1, group2) => group1.member_ids.length - group2.member_ids.length
    );
  } else if (method === "Most Active") {
    groups = groups.sort(
      (group1, group2) => group2.post_ids.length - group1.post_ids.length
    );
  }
  return groups;
}

async function filterByTopic(topicList) {
  let groups = await getAllPublicGroups();
  for (let i = 0; i < topicList.length; i++) {
    const topic = await getTopicByName(topicList[i]);
    groups = groups.filter((group) => group.topic_ids.includes(topic._id));
  }
  return groups;
}

function MyGroup(props) {
  const { updateCurrGroup, updateStatus } = props;
  const [selectTopics, setSelectTopics] = React.useState([]);
  const [selectSortBy, setSelectSortBy] = React.useState([]);
  const [groupCards, setGroupCards] = React.useState([]);
  const [errorOpen, setErrorOpen] = React.useState(false);
  // const navigate = useNavigate();
  const userName = sessionStorage.getItem("username");
  const userID = sessionStorage.getItem("id");
  React.useEffect(async () => {
    if (!userName) {
      // navigate('/login');
      updateStatus("login");
    }
    let groups = await getAllGroups();
    groups = groups.filter((x) => x.member_ids.includes(userID));
    const newGroupCards = groups.map((g) => ({
      title: g.name,
      size: g.member_ids.length,
      description: g.description,
      image: "https://source.unsplash.com/random",
      imageLabel: "Image Text",
      topics: g.topic_ids,
      groupId: g._id,
      memberIds: g.member_ids,
    }));
    setGroupCards(newGroupCards);
  }, []);

  const handleChangeTopics = async (event) => {
    const {
      target: { value },
    } = event;
    const groups = await filterByTopic(value);
    const newGroupCards = groups.map((g) => ({
      title: g.name,
      size: g.member_ids.length,
      description: g.description,
      image: "https://source.unsplash.com/random",
      imageLabel: "Image Text",
      topics: g.topic_ids,
      groupId: g._id,
    }));
    setGroupCards(newGroupCards);
    setSelectTopics(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangeSortBy = async (event) => {
    const {
      target: { value },
    } = event;
    const groups = await sortGroup(value);
    const newGroupCards = groups.map((g) => ({
      title: g.name,
      size: g.member_ids.length,
      description: g.description,
      image: "https://source.unsplash.com/random",
      imageLabel: "Image Text",
      topics: g.topic_ids,
      groupId: g._id,
    }));
    setGroupCards(newGroupCards);
    setSelectSortBy(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  // for groupName form
  const [groupName, setGroupName] = React.useState("");
  const handleChangeGroupName = (event) => {
    setGroupName(event.target.value);
  };

  // for groupType form
  const [groupType, setGroupType] = React.useState("");
  const handleChangeGroupType = (event) => {
    setGroupType(event.target.value);
  };

  // for groupDescription form
  const [groupDescription, setGroupDescription] = React.useState("");
  const handleChangeGroupDescription = (event) => {
    setGroupDescription(event.target.value);
  };

  // for selectedTopic form
  const [selectedTopic, setSelectedTopic] = React.useState([]);
  const handleChangeSelectedTopic = (event) => {
    const {
      // eslint-disable-next-line no-shadow
      target: { value },
    } = event;
    setSelectedTopic(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const id = sessionStorage.getItem("id");
    if (!id || !groupName || !groupDescription || !groupType || selectedTopic.length === 0) {
      // error tell user to fill up all the info
      setErrorOpen(true);
    } else {
      const group = {
        owner: id,
        name: groupName,
        description: groupDescription,
        type: groupType,
        topics: selectedTopic,
      };
      const res = await createGroup(group);
      if (res.ok) {
        const newgroups = groupCards;
        const ngroup = await res.json();
        const newGroupCard = {
          title: ngroup.name,
          size: ngroup.member_ids.length,
          description: ngroup.description,
          image: "https://source.unsplash.com/random",
          imageLabel: "Image Text",
          topics: ngroup.topic_ids,
          groupId: ngroup._id,
        };
        newgroups.push(newGroupCard);
        setGroupCards(newgroups);
      }
      setOpen(false);
    }
  };

  if (userName) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
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
                      <Button
                        variant="contained"
                        sx={{ m: 1, height: 55, width: 262 }}
                        onClick={handleClickOpen}
                      >
                        Create a New Group
                      </Button>

                      <Dialog open={open} onClose={handleClose}>
                        {/* <Grid container spacing={2}> */}
                        <DialogTitle>
                          Please provide group information
                        </DialogTitle>
                        <DialogContent>
                          {/* <Divider /> */}
                          <DialogContentText>
                            Please enter a group name.
                          </DialogContentText>
                          <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Group Name"
                            fullWidth
                            variant="standard"
                            required
                            onChange={handleChangeGroupName}
                            required
                          />

                          <DialogContentText sx={{ pt: 4 }}>
                            Please select a group type.
                          </DialogContentText>
                          <FormControl component="fieldset">
                            <FormLabel component="legend" />
                            <RadioGroup
                              row
                              aria-label="Group Type"
                              name="controlled-radio-buttons-group"
                            // onChange={handleChangeGroupType}
                            >
                              <FormControlLabel
                                control={
                                  <Radio
                                    value="public"
                                    required
                                    onChange={handleChangeGroupType}
                                    required
                                  />
                                }
                                label="Public"
                              />
                              <FormControlLabel
                                control={
                                  <Radio
                                    value="private"
                                    required
                                    onChange={handleChangeGroupType}
                                    required
                                  />
                                }
                                label="Private"
                              />
                            </RadioGroup>
                          </FormControl>

                          <DialogContentText sx={{ pt: 4 }}>
                            Please add group description.
                          </DialogContentText>
                          <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Description"
                            required
                            fullWidth
                            variant="standard"
                            onChange={handleChangeGroupDescription}
                          />

                          <DialogContentText sx={{ pt: 4 }}>
                            Please select group topics.
                          </DialogContentText>
                          <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="demo-multiple-checkbox-label">
                              Group Topics
                            </InputLabel>
                            <Select
                              labelId="demo-multiple-checkbox-label"
                              id="demo-multiple-checkbox"
                              multiple
                              value={selectedTopic}
                              onChange={handleChangeSelectedTopic}
                              input={<OutlinedInput label="Tag" />}
                              renderValue={(selected) => selected.join(", ")}
                              MenuProps={MenuProps}
                            >
                              {topics.map((topic) => (
                                <MenuItem key={topic} value={topic}>
                                  <Checkbox
                                    checked={selectedTopic.indexOf(topic) > -1}
                                  />
                                  <ListItemText primary={topic} />
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </DialogContent>

                        {errorOpen
                          ? (
                            <Alert severity="error">
                              <AlertTitle>Error</AlertTitle>
                              <strong>Please fill up all the fields</strong>
                            </Alert>
                          )
                          : (<Typography />)}

                        <DialogActions>
                          <Button onClick={handleClose}>Cancel</Button>
                          <Button onClick={handleSubmit}>Confirm</Button>
                        </DialogActions>

                        {/* </Grid> */}
                      </Dialog>
                    </div>
                  </Container>
                </Box>

                {/* Groups */}
                <Container sx={{ pt: 2 }} maxWidth="lg">
                  <Grid container rowSpacing={3} columnSpacing={0}>
                    {groupCards.map((post) => (
                      <GroupCard
                        key={post.title}
                        post={post}
                        whetherIn
                        updateCurrGroup={updateCurrGroup}
                        updateStatus={updateStatus}
                        groupCards={groupCards}
                        updateGroupCards={(newcards) => setGroupCards(newcards)}
                      />
                    ))}
                  </Grid>
                </Container>
              </Grid>

              <Grid item key={2} xs={6} md={3}>
                <Grid
                  container
                  align="center"
                  justify="center"
                  alignItems="center"
                  spacing={2}
                >
                  {/* Trending Topics */}
                  <TrendingTopics />
                </Grid>
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
  return <div />;
}

export default MyGroup;
