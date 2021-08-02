import Photo from "./download.png";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
  makeStyles,
  Link,
  Container,
  Box,
  Paper,
} from "@material-ui/core";
import React from "react";

import ReactMarkdown from "react-markdown";
import StudentInfo from "./StudentInfo";

const useStyles = makeStyles({
  center: {
    textAlign: "center",
  },
  container: {
    maxWidth: "500px",
    marginTop: "40px",
  },
  flex: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row-reverse",
  },
});

const ProjectSummary = ({
  prevStep,
  onProjectSubmit,
  img,
  teacherName,
  workshopName,
  studentsInfo,
  projectPreview,
  projectTitle,
  githubLink,
}) => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Box className={classes.center}>
        <img src={Photo} alt="photo" />
        <Box className={classes.flex}>
          <Typography gutterBottom variant="h5" component="h2">
            {" : שם הסדנא"}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {projectTitle}
          </Typography>
        </Box>
        <Box className={classes.flex}>
          <Typography gutterBottom variant="h5" component="h2">
            {" : שם המרצה"}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {teacherName} / {workshopName}
          </Typography>
        </Box>
        {githubLink && <Link to={githubLink}> עבור לגיטאהב</Link>}
        <Typography gutterBottom variant="h5" component="h2">
          תקציר הסדנה
        </Typography>
      </Box>
      <Paper elevation={2}>
        <ReactMarkdown>{projectPreview}</ReactMarkdown>
      </Paper>
      <Box className={classes.center}>
        <Button onClick={prevStep} size="small" color="primary">
          הקודם
        </Button>
        <Button size="small" color="primary">
          הגש תקציר
        </Button>
      </Box>
    </Container>
  );
};

export default ProjectSummary;
