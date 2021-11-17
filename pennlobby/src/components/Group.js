import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Container, Box } from "@mui/material";

function Group() {
  // use Card
  const [groupName] = useState("Penn Football Club");
  // const [memberCnt] = useState(298);
  // const [groupDesc] = useState(
  //   "Everything you need to know about Penn Football"
  // );
  // const [groupTags] = useState(["Football", "Sports", "Ivy Leagues"]);

  const buttons = [
    <Button key="one">View Details</Button>,
    <Button key="two">Join Group</Button>,
    <Button key="three">Members</Button>,
  ];

  return (
    <Container maxWidth="sm" className="group">
      <div className="group-text">
        <h1>{groupName}</h1>
      </div>
      {/* <img src="pic_trulli.jpg" alt="Italian Trulli">
        Image Placeholder
      </img> */}
      <Box
        sx={{
          display: "flex",
          "& > *": {
            m: 1,
          },
        }}
      >
        <ButtonGroup
          orientation="vertical"
          aria-label="vertical outlined button group"
        >
          {buttons}
        </ButtonGroup>
        <ButtonGroup
          orientation="vertical"
          aria-label="vertical contained button group"
          variant="contained"
        >
          {buttons}
        </ButtonGroup>
        <ButtonGroup
          orientation="vertical"
          aria-label="vertical contained button group"
          variant="text"
        >
          {buttons}
        </ButtonGroup>
      </Box>
      const buttons = [<Button key="one">One</Button>,
      <Button key="two">Two</Button>,<Button key="three">Three</Button>, ];
    </Container>
  );
}

export default Group;
