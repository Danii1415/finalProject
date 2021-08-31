import React from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  DialogContent,
  Divider,
  Fab,
  TextField,
  Paper,
  Drawer,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
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
    fromTeacher: true,
    name: "אמיר קירש",
  },
  {
    date: "11/8/21 21:53",
    text: "הערות מרצההערות מרצההערות מרצההערות מרצההערות מרצההערות מרצההערות מרצההערות מרצההערות מרצההערות מרצההערות מרצההערות מרצההערות מרצההערות מרצה הערות מרצה",
    fromTeacher: false,
    name: "דניאל כפיר",
  },
  {
    date: "13/8/21 11:01",
    text: "צריך לעשות דברים בצורה אחרת תוסיפו ככה ותעשו ככה ואחרי זה תוסיפו עוד דברים",
    fromTeacher: true,
    name: "אמיר קירש",
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

const EditPreview = () => {
  const [image, setImage] = useState("");
  const [messageList, setMessageList] = useState(teacherMessages);
  //   const [messageList, setMessageList] = useState([]);
  const [markDownText, setMarkDownText] = useState("");

  // const [status, setStatus] = useState("pendingTeacherApproval");
  const [status, setStatus] = useState("pendingStudentsEdit");
  const [isTeacher, setIsTeacher] = useState(false);

  const [projectTitle, setProjectTitle] = useState("My Project!!");
  const [githubLink, setgithubLink] = useState("github.com/danii1415");
  const [teacher, setTeacher] = useState("אמיר קירש");
  const [workshop, setWorkshop] = useState(" הנדסת תוכנה");
  const [openNewMessage, setOpenNewMessage] = useState(false);
  const [openEditMessage, setOpenEditMessage] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [editMessage, setEditMessage] = useState("");
  const [editMessageIdx, setEditMessageIdx] = useState(-1);
  const [contactEmail, setContactEmail] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const [isOpenDrawer, setisOpenDrawer] = useState(true);

  const openDrawer = () => {
    setisOpenDrawer(true);
  };

  const closeDrawer = () => {
    setisOpenDrawer(false);
  };

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(URL.createObjectURL(img));
    }
  };

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
    const _newMessage = {
      text: newMessage,
      date: `${now.getDay()}/${now.getMonth()}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`,
      isTeacher: isTeacher ? true : false,
      name: isTeacher ? "אמיר קירש" : "דניאל כפיר",
    };
    messages.push(_newMessage);
    setMessageList(messages);
    setOpenNewMessage(false);
    // setIsTeacher(!isTeacher);
    setNewMessage("");
  };

  const deleteMessage = (idx) => {
    //db delete
    const messages = [...messageList];
    messages.splice(idx, 1);
    setMessageList(messages);
  };

  const getMessageDetails = (message) => {
    return message.date + ", " + message.name;
  };

  return (
    <div className="container">
      <div className="title-container">
        <Drawer anchor="left" open={isOpenDrawer} onClose={closeDrawer}>
          <div className="drawer-container">
            <div className="messages-container">
              <div className="header">
                <div> תיבת ההודעות</div>
                <Fab onClick={closeDrawer}>
                  <CloseIcon color="primary" />
                </Fab>
              </div>
              {messageList.map((message, idx) => {
                return (
                  <div className="message-container" key={idx}>
                    <Divider
                      style={{ marginBottom: "10px", marginTop: "10px" }}
                    />
                    <div className="message-div">
                      <div className="actions">
                        <Fab onClick={() => deleteMessage(idx)}>
                          <DeleteIcon color="primary" />
                        </Fab>
                        <Fab
                          onClick={() => {
                            handleEditMessageClickOpen(idx);
                          }}
                        >
                          <EditIcon color="primary" />
                        </Fab>
                      </div>
                      <div
                        className={
                          message.fromTeacher === true
                            ? "content-teacher"
                            : "content-student"
                        }
                      >
                        <span className="message-text">{message.text}</span>
                        <span className="message-details">
                          {getMessageDetails(message)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="new-message-container">
              <button
                disabled={newMessage ? false : true}
                onClick={saveNewMessage}
                className="new-message-button"
              >
                הוסף הודעה חדשה
              </button>
              <textarea
                className="new-message-input"
                placeholder="כתוב הודעה חדשה..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
            </div>
          </div>
        </Drawer>
        <button className="messages-button" onClick={openDrawer}>
          פתח תיבת הודעות
        </button>
        <div className="update-title">טופס עדכון הפרויקט</div>
      </div>
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
        <label>עריכת התקציר</label>
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
      {isTeacher && (
        <div className="teacher-project-approval">
          <button className="decline-button">דחה והחזר לעריכת המגישים</button>
          <button className="approval-button">אשר הגשת הפרויקט</button>
        </div>
      )}
      {!isTeacher && (
        <button
          className="student-project-submit-button"
          disabled={status === "pendingTeacherApproval" ? true : false}
        >
          {status === "pendingTeacherApproval"
            ? "ממתין לאישור המרצה"
            : "הגש לאישור מרצה"}
        </button>
      )}
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
    </div>
  );
};
export default EditPreview;
