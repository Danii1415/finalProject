import {
  Button,
  Container,
  FormHelperText,
  Input,
  TextField,
  Typography,
  Box,
  makeStyles,
  Grid,
} from "@material-ui/core";
import React from "react";
import ReactMarkdown from "react-markdown";
import "./AddPreview.css";

const useStyles = makeStyles({
  editorsContainer: {
    marginTop: "40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    textAlign: "right",
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
      <Grid component="main" maxWidth="xs">
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
      </Grid>
      <Grid xs={12}>
        <Typography gutterBottom component="h1" align="center" variant="h5">
          MarkDown הגישו את התקציר בכתב
        </Typography>
        <Grid className={classes.editorsContainer}>
          <Grid xs={5} className={classes.text}>
            <ReactMarkdown>{markDownText}</ReactMarkdown>
          </Grid>
          <Grid xs={5}>
            <TextField
              multiline
              variant="outlined"
              value={markDownText}
              onChange={onPreviewChange}
            />
          </Grid>
        </Grid>
        <Button onClick={prevStep}>הקודם</Button>
        <Button onClick={nextStep}>הבא</Button>
      </Grid>
    </>
  );
};

export default AddPreview;
