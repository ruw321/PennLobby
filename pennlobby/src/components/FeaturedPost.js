// eslint-disable-next-line import/no-extraneous-dependencies
import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";

const buttons = [
  <Button key="one" className="groupBtn1" style={{ textTransform: "none" }}>
    View Detail
  </Button>,
  <Button key="two" className="groupBtn2" style={{ textTransform: "none" }}>
    Join Group
  </Button>,
  <Button key="three" className="groupBtn3" style={{ textTransform: "none" }}>
    Members
  </Button>,
];

const tags = ["Football", "Sports", "tag3"];

function FeaturedPost(props) {
  const { post } = props;

  return (
    <>
      <Grid item xs={9} md={9}>
        <CardActionArea component="a" href="#">
          <Card sx={{ display: "flex", height: "200px" }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography component="h2" variant="h5">
                {post.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {/* <img className="groupSizeIcon" src="../../groupSize.png" alt="gpsz" /> */}
                {post.size}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {post.description}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                {tags.map((tag) => (
                  <Button key={tag} value={tag} className="tagsBtn">
                    {tag}
                  </Button>
                ))}
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              sx={{ width: 160, display: { xs: "none", sm: "block" } }}
              image={post.image}
              alt={post.imageLabel}
            />
          </Card>
        </CardActionArea>
      </Grid>
      <Grid item xs={3} md={3}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
            "& > *": {
              m: 1,
            },
          }}
        >
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical contained button group"
            variant="contained"
            className="groupBtnGroup"
          >
            {buttons}
          </ButtonGroup>
        </Box>
      </Grid>
    </>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.shape({
    size: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeaturedPost;
