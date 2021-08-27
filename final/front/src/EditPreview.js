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
import "./EditPreview.scss";

// const initialMarkdownText = `# כותרת

//   **מודגש**

//   *איטליק*

//   * איבר רשימה 1
//   * איבר רשימה 2
//   # Markdown

//   **Bold**

//   *Italic*

//   * list item 1
//   * list item 2`;

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
  const [markDownText, setMarkDownText] = useState("");

  const [status, setStatus] = useState("מחכה לעריכת תלמידים");
  //   const [status, setStatus] = useState("מחכה לאישור מרצה");
  const isTeacher = true;

  const [projectTitle, setProjectTitle] = useState("My Project!!");
  const [githubLink, setgithubLink] = useState("github.com/danii1415");
  const [teacher, setTeacher] = useState("אמיר קירש");
  const [workshop, setWorkshop] = useState(" הנדסת תוכנה");
  const [openNewMessage, setOpenNewMessage] = useState(false);
  const [openEditMessage, setOpenEditMessage] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [editMessage, setEditMessage] = useState("");
  const [editMessageIdx, setEditMessageIdx] = useState(-1);

  const onGithubLinkChange = (e) => {
    setgithubLink(e.target.value);
  };

  const onProjectTitleChange = (e) => {
    setProjectTitle(e.target.value);
  };

  const onPreviewChange = (e) => {
    setMarkDownText(e.target.value);
  };

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

  // const onPreviewChange = (e) => {
  //   setMarkDownText(e.target.value);
  // };
  return (
    <div className="container">
      <div className="title">טופס עדכון הפרויקט</div>
      <div className="project-teacher-details-container">
        <div className="input-container">
          <label>שם המרצה</label>
          <input value={"אמיר קירש"} disabled />
        </div>
        <div className="input-container">
          <label>שם הסדנה</label>
          <input value={"הנדסת תוכנה"} disabled />
        </div>
        <div className="input-container">
          <label>מספר פרוייקט</label>
          <input value={"234311"} disabled />
        </div>
      </div>
      <div className="input-container">
        <label>שם הפרויקט</label>
        <input
          value={projectTitle}
          onChange={onProjectTitleChange}
          name="project-title"
          autocomplete="off"
        />
      </div>
      <div className="input-container">
        <label>קישור לגיטהאב</label>
        <input
          value={githubLink}
          onChange={onGithubLinkChange}
          name="github-link"
          autocomplete="off"
        />
      </div>
      <div className="preview-container">
        <label>
          (ראו דוגמא) Markdown כתבו תקציר באורך 250-400 מילים. המערכת תומכת בשפת
        </label>
        {/* <div className="preview-editor-container"> */}
        {/* <div className="markdown-result">
            <ReactMarkdown>{markDownText}</ReactMarkdown>
          </div> */}
        <textarea
          className="markdown-editor"
          value={markDownText}
          onChange={onPreviewChange}
        />
      </div>
      {/* </div> */}
      {/* </div>
      {/* 
      <form className="students-form">
        <label className="main-label">הוסף פרטי המגישים</label>
        <div className="student-input-row ">
          <div className="input-container first">
            <label>שם משפחה</label>
            <input
              value={studentsList[currStudentidx].lastName}
              name="lastName"
              id="lastName"
              autocomplete="off"
              onChange={(e) => {
                onStudentListChange(e, currStudentidx);
              }}
            />
          </div>
          <div className="input-container">
            <label>שם פרטי</label>
            <input
              value={studentsList[currStudentidx].firstName}
              id="first"
              name="firstName"
              autocomplete="off"
              onChange={(e) => {
                onStudentListChange(e, currStudentidx);
              }}
            />
          </div>
        </div>
        <div className="student-input-row">
          <div className="input-container first">
            <label>מספר תעודת זהות</label>
            <input
              value={studentsList[currStudentidx].idNumber}
              name="idNumber"
              id="idNumber"
              autocomplete="off"
              onChange={(e) => {
                onStudentListChange(e, currStudentidx);
              }}
            />
          </div>
          <div className="input-container">
            <label>כתובת מייל</label>
            <input
              value={studentsList[currStudentidx].emailAddress}
              type="email"
              name="emailAddress"
              id="email"
              autocomplete="off"
              onChange={(e) => {
                onStudentListChange(e, currStudentidx);
              }}
            />
          </div>
        </div>
        <div
          className={
            currStudentidx === 0
              ? "student-buttons justify-center"
              : "student-buttons justify-between"
          }
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              onNextStudentClick();
            }}
          >
            הוסף תלמיד
          </button>
          {currStudentidx > 0 && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onPreviousStudentClick();
              }}
            >
              לתלמיד הקודם
            </button>
          )}
        </div>
      </form>
      <div className="add-img-container">
        <img src={image} className="left-side" />
        <div className="right-side">
          <label>תמונת הפרויקט</label>
          <div className="image-buttons">
            <label className="custom-file-upload">
              <input onChange={onImageChange} type="file" />
              הוסף תמונה
            </label>
            <button>הסר תמונה</button>
          </div>
        </div>
      </div>
      <div className="contacts-container">
        <label className="main-label">פרטי איש הקשר</label>
        <div className="contacts-input">
          <div className="input-container">
            <label>שם מלא</label>
            <input
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              name="contact-name"
              autocomplete="off"
            />
          </div>

          <div className="input-container">
            <label>טלפון</label>
            <input
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              name="contact-phone"
              autocomplete="off"
            />
          </div>
          <div className="input-container">
            <label>אימייל</label>
            <input
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              name="contact-email"
              autocomplete="off"
            />
          </div>
        </div>
      </div>
      <button className="save-button">הגש את הפרויקט</button> */}
    </div>
  );
};
export default EditPreview;

// status === "אושר" ? (
//   <Container>
//     <Typography variant="h1">פרוייקט זה אושר והועבר לדף הסדנאות</Typography>
//   </Container>
// ) : (
//   <Container style={{ paddingTop: "25px", paddingBottom: "25px" }}>
//     <Typography
//       style={{ borderBottom: "1px dashed blue" }}
//       variant="h4"
//     >{`${projectTitle} / ${teacher} / ${workshop}`}</Typography>
//     <Container className={classes.editorsContainer}>
//       <Container className={classes.text}>
//         <ReactMarkdown>{markDownText}</ReactMarkdown>
//       </Container>
//       {!isTeacher && <Divider orientation="vertical" flexItem />}
//       {!isTeacher && (
//         <Container>
//           <TextField
//             multiline
//             variant="outlined"
//             value={markDownText}
//             onChange={onPreviewChange}
//           />
//         </Container>
//       )}
//     </Container>
//     <Box style={{ margin: "20px" }}>
//       {!isTeacher && status === "מחכה לעריכת תלמידים" && (
//         <Button
//           onClick={() => setStatus("מחכה לעריכת מרצה")}
//           variant="contained"
//           color="primary"
//         >
//           הגש תקציר
//         </Button>
//       )}
//     </Box>
//     <Typography
//       style={{
//         backgroundColor:
//           status === "מחכה לעריכת תלמידים" ? "orange" : "lightgreen",
//       }}
//       variant="h5"
//     >
//       סטטוס הסדנה : {status}
//     </Typography>
//     <Divider style={{ height: "10px" }} />
//     <Grid
//       style={{ border: "3px solid blue", marginTop: "40px" }}
//       className={classes.container}
//       item
//       xs={12}
//     >
//       <Container>
//         <Typography variant="h4" align="center">
//           הערות המרצה
//         </Typography>
//       </Container>
//       <List>
//         {messageList.map((message, idx) => {
//           return (
//             <div key={idx}>
//               <Divider />
//               <ListItem>
//                 {isTeacher && (
//                   <Container>
//                     <Fab onClick={() => deleteMessage(idx)}>
//                       <DeleteIcon color="primary" />
//                     </Fab>
//                     <Fab
//                       onClick={() => {
//                         console.log("clicked");
//                         handleEditMessageClickOpen(idx);
//                       }}
//                     >
//                       <EditIcon color="primary" />
//                     </Fab>
//                   </Container>
//                 )}
//                 <Grid container>
//                   <Grid item xs={12}>
//                     <ListItemText
//                       align="right"
//                       primary={message.text}
//                     ></ListItemText>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <ListItemText
//                       align="right"
//                       secondary={message.date}
//                     ></ListItemText>
//                   </Grid>
//                 </Grid>
//               </ListItem>
//             </div>
//           );
//         })}
//       </List>
//       {isTeacher && (
//         <Fab onClick={handleNewMessageClickOpen}>
//           <AddIcon color="primary" />
//         </Fab>
//       )}
//     </Grid>
//     <Dialog
//       open={openNewMessage}
//       onClose={handleNewMessageClose}
//       PaperComponent={PaperComponent}
//       aria-labelledby="draggable-dialog-title"
//     >
//       <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
//         הודעה חדשה
//       </DialogTitle>
//       <DialogContent>
//         <TextField
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           multiline
//           autoFocus
//           margin="dense"
//           label=".. הודעה חדשה"
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button autoFocus onClick={handleNewMessageClose} color="primary">
//           ביטול
//         </Button>
//         <Button onClick={saveNewMessage} color="primary">
//           שמור הודעה
//         </Button>
//       </DialogActions>
//     </Dialog>

//     {/* ------------------------------------ */}
//     <Dialog
//       open={openEditMessage}
//       onClose={handleEditMessageClose}
//       PaperComponent={PaperComponent}
//       aria-labelledby="draggable-dialog-title"
//     >
//       <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
//         ערוך הודעה חדשה
//       </DialogTitle>
//       <DialogContent>
//         <TextField
//           value={editMessage}
//           onChange={(e) => setEditMessage(e.target.value)}
//           multiline
//           autoFocus
//           margin="dense"
//           label=".. ערוך הודעה חדשה"
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button autoFocus onClick={handleEditMessageClose} color="primary">
//           ביטול
//         </Button>
//         <Button onClick={() => saveEditedMessage()} color="primary">
//           שמור הודעה
//         </Button>
//       </DialogActions>
//     </Dialog>
//     {isTeacher && status === "מחכה לאישור מרצה" && (
//       <Box style={{ marginTop: "20px" }}>
//         <Button
//           onClick={() => setStatus("מחכה לעריכת תלמידים")}
//           variant="contained"
//           color="primary"
//         >
//           דחה את ההגשה
//         </Button>
//         <Button
//           onClick={() => setStatus("אושר")}
//           variant="contained"
//           color="secondary"
//         >
//           אשר את ההגשה
//         </Button>
//       </Box>
//     )}
//   </Container>
// );
// };
