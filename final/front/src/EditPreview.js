import React from "react";
import {
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  DialogContent,
  Divider,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  TextField,
  Typography,
  Paper,
  Box,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import Draggable from "react-draggable";

const initialMarkdownText = `# כותרת

  **מודגש**

  *איטליק*
  
  * איבר רשימה 1
  * איבר רשימה 2
  # Markdown

  **Bold**

  *Italic*
  
  * list item 1
  * list item 2`;

const teacherMessages = [
  {
    date: "11/8/21 19:40",
    text: "צריך לעשות דברים בצורה אחרת תוסיפו ככה ותעשו ככה ואחרי זה תוסיפו עוד דברים",
  },
  {
    date: "11/8/21 21:53",
    text: "הערות מרצההערות מרצההערות מרצההערות מרצההערות מרצההערות מרצההערות מרצההערות מרצההערות מרצההערות מרצההערות מרצההערות מרצההערות מרצההערות מרצה הערות מרצה",
  },
  {
    date: "13/8/21 11:01",
    text: "צריך לעשות דברים בצורה אחרת תוסיפו ככה ותעשו ככה ואחרי זה תוסיפו עוד דברים",
  },
];

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const useStyles = makeStyles({
  container: {
    padding: "20px 80px",
  },
  editorsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 100px",
  },
  text: {
    textAlign: "right",
  },
});

const EditPreview = () => {
  const classes = useStyles();
  const [messageList, setMessageList] = useState(teacherMessages);
  //   const [messageList, setMessageList] = useState([]);
  const [markDownText, setMarkDownText] = useState(initialMarkdownText);

  const [status, setStatus] = useState("מחכה לעריכת תלמידים");
  //   const [status, setStatus] = useState("מחכה לאישור מרצה");
  const isTeacher = true;

  const [projectTitle, setProjectTitle] = useState("My Project!!");
  const [teacher, setTeacher] = useState("אמיר קירש");
  const [workshop, setWorkshop] = useState(" הנדסת תוכנה");
  const [openNewMessage, setOpenNewMessage] = useState(false);
  const [openEditMessage, setOpenEditMessage] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [editMessage, setEditMessage] = useState("");
  const [editMessageIdx, setEditMessageIdx] = useState(-1);

  const handleNewMessageClickOpen = () => {
    setOpenNewMessage(true);
  };

  const handleEditMessageClickOpen = (idx) => {
    setOpenEditMessage(true);
    setEditMessage(messageList[idx].text);
    setEditMessageIdx(idx);
  };

  const handleNewMessageClose = () => {
    setOpenNewMessage(false);
    setNewMessage("");
  };

  const handleEditMessageClose = () => {
    setOpenEditMessage(false);
    setEditMessage("");
    setEditMessageIdx(-1);
  };

  const saveEditedMessage = () => {
    let messages = [...messageList];
    const now = new Date();
    messages[editMessageIdx] = {
      text: editMessage,
      date: `${now.getDay()}/${now.getMonth()}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`,
    };
    setMessageList(messages);
    setOpenEditMessage(false);
    setEditMessageIdx("");
    setEditMessageIdx(-1);
  };

  const saveNewMessage = () => {
    let messages = [...messageList];
    const now = new Date();
    messages.push({
      text: newMessage,
      date: `${now.getDay()}/${now.getMonth()}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`,
    });
    setMessageList(messages);
    setOpenNewMessage(false);
    setNewMessage("");
  };

  const deleteMessage = (idx) => {
    //db delete
    const messages = [...messageList];
    messages.splice(idx, 1);
    setMessageList(messages);
  };

  const onPreviewChange = (e) => {
    setMarkDownText(e.target.value);
  };
  return status === "אושר" ? (
    <Container>
      <Typography variant="h1">פרוייקט זה אושר והועבר לדף הסדנאות</Typography>
    </Container>
  ) : (
    <Container style={{ paddingTop: "25px", paddingBottom: "25px" }}>
      <Typography
        style={{ borderBottom: "1px dashed blue" }}
        variant="h4"
      >{`${projectTitle} / ${teacher} / ${workshop}`}</Typography>
      <Container className={classes.editorsContainer}>
        <Container className={classes.text}>
          <ReactMarkdown>{markDownText}</ReactMarkdown>
        </Container>
        {!isTeacher && <Divider orientation="vertical" flexItem />}
        {!isTeacher && (
          <Container>
            <TextField
              multiline
              variant="outlined"
              value={markDownText}
              onChange={onPreviewChange}
            />
          </Container>
        )}
      </Container>
      <Box style={{ margin: "20px" }}>
        {!isTeacher && status === "מחכה לעריכת תלמידים" && (
          <Button
            onClick={() => setStatus("מחכה לעריכת מרצה")}
            variant="contained"
            color="primary"
          >
            הגש תקציר
          </Button>
        )}
      </Box>
      <Typography
        style={{
          backgroundColor:
            status === "מחכה לעריכת תלמידים" ? "orange" : "lightgreen",
        }}
        variant="h5"
      >
        סטטוס הסדנה : {status}
      </Typography>
      <Divider style={{ height: "10px" }} />
      <Grid
        style={{ border: "3px solid blue", marginTop: "40px" }}
        className={classes.container}
        item
        xs={12}
      >
        <Container>
          <Typography variant="h4" align="center">
            הערות המרצה
          </Typography>
        </Container>
        <List>
          {messageList.map((message, idx) => {
            return (
              <div key={idx}>
                <Divider />
                <ListItem>
                  {isTeacher && (
                    <Container>
                      <Fab onClick={() => deleteMessage(idx)}>
                        <DeleteIcon color="primary" />
                      </Fab>
                      <Fab
                        onClick={() => {
                          console.log("clicked");
                          handleEditMessageClickOpen(idx);
                        }}
                      >
                        <EditIcon color="primary" />
                      </Fab>
                    </Container>
                  )}
                  <Grid container>
                    <Grid item xs={12}>
                      <ListItemText
                        align="right"
                        primary={message.text}
                      ></ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemText
                        align="right"
                        secondary={message.date}
                      ></ListItemText>
                    </Grid>
                  </Grid>
                </ListItem>
              </div>
            );
          })}
        </List>
        {isTeacher && (
          <Fab onClick={handleNewMessageClickOpen}>
            <AddIcon color="primary" />
          </Fab>
        )}
      </Grid>
      <Dialog
        open={openNewMessage}
        onClose={handleNewMessageClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          הודעה חדשה
        </DialogTitle>
        <DialogContent>
          <TextField
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            multiline
            autoFocus
            margin="dense"
            label=".. הודעה חדשה"
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleNewMessageClose} color="primary">
            ביטול
          </Button>
          <Button onClick={saveNewMessage} color="primary">
            שמור הודעה
          </Button>
        </DialogActions>
      </Dialog>

      {/* ------------------------------------ */}
      <Dialog
        open={openEditMessage}
        onClose={handleEditMessageClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          ערוך הודעה חדשה
        </DialogTitle>
        <DialogContent>
          <TextField
            value={editMessage}
            onChange={(e) => setEditMessage(e.target.value)}
            multiline
            autoFocus
            margin="dense"
            label=".. ערוך הודעה חדשה"
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleEditMessageClose} color="primary">
            ביטול
          </Button>
          <Button onClick={() => saveEditedMessage()} color="primary">
            שמור הודעה
          </Button>
        </DialogActions>
      </Dialog>
      {isTeacher && status === "מחכה לאישור מרצה" && (
        <Box style={{ marginTop: "20px" }}>
          <Button
            onClick={() => setStatus("מחכה לעריכת תלמידים")}
            variant="contained"
            color="primary"
          >
            דחה את ההגשה
          </Button>
          <Button
            onClick={() => setStatus("אושר")}
            variant="contained"
            color="secondary"
          >
            אשר את ההגשה
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default EditPreview;
