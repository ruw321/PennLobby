/* eslint-disable no-unused-vars */
import * as React from 'react';
import './TrendingTopics.css';
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

export default function TrendingTopics(props) {
  const { trendingTopicsToday, trendingTopicsWeekly } = props;

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="trendingTopicsContainer">
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Grid className="topic">Top Trending Topics</Grid>
          <TabList className="tablist" onChange={handleChange}>
            <Tab label="Today" value="1" />
            <Tab label="Weekly" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          {trendingTopicsToday.map((topic) => (
            <ListItem>
              {topic}
            </ListItem>
          ))}
        </TabPanel>
        <TabPanel value="2">
          {trendingTopicsWeekly.map((topic) => (
            <ListItem>
              {topic}
            </ListItem>
          ))}
        </TabPanel>
      </TabContext>
    </Box>
  );
}

// const TrendingTopics = (props) => {
//   const { trendingTopicsToday, trendingTopicsWeekly } = props;

//   const [dataToShow, setDataToShow] = useState(trendingTopicsToday);

//   const handleTopicClickToday = () => {
//     setDataToShow(trendingTopicsToday);
//   };
//   const handleTopicClickWeekly = () => {
//     setDataToShow(trendingTopicsWeekly);
//   };

//   return (
//     <div className="trendingTopicsContainer">

//       <Grid container>
//         <Grid item xs={12}>

//           <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//             <Tabs aria-label="basic tabs example">
//               <Tab label="Today" {...a11yProps(0)} onClick={handleTopicClickToday} />
//               <Tab label="Weekly" {...a11yProps(1)} onClick={handleTopicClickWeekly} />
//             </Tabs>
//           </Box>

//           <TabPanel index={0}>
//             {dataToShow.map((topic) => (
//               <ListItem>
//                 {topic}
//               </ListItem>
//             ))}
//           </TabPanel>
//           <TabPanel index={1}>
//             {dataToShow.map((topic) => (
//               <ListItem>
//                 {topic}
//               </ListItem>
//             ))}
//           </TabPanel>

//         </Grid>

//       </Grid>

//     </div>
//   );
// // };

// export default TrendingTopics;
