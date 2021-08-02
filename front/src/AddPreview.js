import {
  Button,
  Container,
  FormHelperText,
  Input,
  TextField,
  Typography,
  Box,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import ReactMarkdown from "react-markdown";
import "./AddPreview.css";

const useStyles = makeStyles({
  editorsContainer: {
    marginTop: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const AddPreview = ({
  prevStep,
  nextStep,
  markDownText,
  onPreviewChange,
  projectTitle,
  onTitleChange,
  githubLink,
  onGithubLinkChange,
}) => {
  const classes = useStyles();
  return (
    <>
      <Container component="main" maxWidth="xs">
        <form>
          <TextField
            value={projectTitle}
            onChange={onTitleChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="שם הפרוייקט"
            name="project-title"
          />
          <TextField
            value={githubLink}
            onChange={onGithubLinkChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="קישור לגיטהאב"
            name="github-link"
          />
        </form>
      </Container>
      <Container maxWidth="lg">
        <Typography gutterBottom component="h1" align="center" variant="h5">
          MarkDown הגישו את התקציר בכתב
        </Typography>
        <Box className={classes.editorsContainer}>
          <TextField
            multiline
            variant="outlined"
            value={markDownText}
            onChange={onPreviewChange}
          />
          <Box>
            <ReactMarkdown>{markDownText}</ReactMarkdown>
          </Box>
        </Box>
        <Button onClick={prevStep}>הקודם</Button>
        <Button onClick={nextStep}>הבא</Button>
      </Container>
    </>
  );
};

export default AddPreview;
