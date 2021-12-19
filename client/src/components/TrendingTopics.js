/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {
  getAllGroups
} from "../fetch";

export default function TrendingTopics(props) {
  // Change into Group Suggestions
  const [groupsByPopularity, setGroupsByPopularity] = React.useState([]);
  const [groupsByLastActive, setGroupsByLastActive] = React.useState([]);

  React.useEffect(async () => {
    const groups = await getAllGroups();
    const groupsMap = groups.map((g) =>
      (
        {
          title: g.name,
          size: g.member_ids.length,
          description: g.description,
          image: "https://source.unsplash.com/random",
          imageLabel: "Image Text",
          topics: g.topic_ids,
          groupId: g._id,
          memberIds: g.member_ids,
          last_active: new Date(g.last_active),
        }
      ));
    const groupsByPopularitySorted = groupsMap.sort(
      (group1, group2) => group2.size - group1.size
    );
    const groupsByPopularity2 = [];
    const groupsByActive2 = [];

    for (let i = 0; i < groupsByPopularitySorted.length; i++) {
      groupsByPopularity2.push(groupsByPopularitySorted[i]);
    }
      
    const groupsByLastActiveSorted = groupsMap.sort(
      (group1, group2) => group2.last_active - group1.last_active
    );

    for (let i = 0; i < groupsByLastActiveSorted.length; i++) {
      groupsByActive2.push(groupsByLastActiveSorted[i]);
    }

    setGroupsByPopularity(groupsByPopularity2);
    setGroupsByLastActive(groupsByActive2);
  }, []);

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="trendingTopicsContainer">
      <TabContext value={value}>
        <Box sx={{
          borderBottom: 1, borderColor: 'divider',
        }}
        >
          <Grid className="topic">Group Suggestions</Grid>
          <TabList className="tablist" onChange={handleChange} centered>
            <Tab label="Most Popular" value="1" />
            <Tab label="Most Active" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          {groupsByPopularity.slice(0, 10).map((group, index) => (
            <ListItem key={group}>
              {`${(index + 1)}.  ${group.title} (${group.memberIds.length})`}
            </ListItem>
          ))}
        </TabPanel>
        <TabPanel value="2">
          {groupsByLastActive.slice(0, 10).map((group, index) => (
            <ListItem key={group}>
              {`${(index + 1)}.  ${group.title}`}
            </ListItem>
          ))}
        </TabPanel>

      </TabContext>
    </Box>
  );
}
