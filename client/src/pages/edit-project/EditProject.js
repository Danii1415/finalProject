//fix hours and minutes 1 digit sometimes

import React, { useEffect } from "react";
import { Divider, Fab, Drawer } from "@material-ui/core";
import { ProjectToEdit } from "../../utils";
import CloseIcon from "@material-ui/icons/Close";
import { useState } from "react";
import "./EditProject.scss";
import { useSelector } from "react-redux";
import logoThree from "../../images/dd.png";
import { Student } from "../../utils";
import StudentForm from "../../components/student-form/StudentForm";
import Axios from "axios";
import { useHistory, useParams } from "react-router";

// const initialMessages = [
//   {
//     date: "11/8/21 19:40",
//     text: "צריך לעשות דברים בצורה אחרת תוסיפו ככה ותעשו ככה ואחרי זה תוסיפו עוד דברים",
//     fromTeacher: true,
//     name: "אמיר קירש",
//   },
//   {
//     date: "11/8/21 21:53",
//     text: "הערות מרצההערות מרצההערות מרצההערות מרצההערות מרצההערות מרצההערות מרצההערות מרצההערות מרצההערות מרצההערות מרצההערות מרצההערות מרצההערות מרצה הערות מרצה",
//     fromTeacher: false,
//     name: "דניאל כפיר",
//   },
//   {
//     date: "13/8/21 11:01",
//     text: "צריך לעשות דברים בצורה אחרת תוסיפו ככה ותעשו ככה ואחרי זה תוסיפו עוד דברים",
//     fromTeacher: true,
//     name: "אמיר קירש",
//   },
// ];

const EditProject = () => {
  const [project, setProject] = useState(new ProjectToEdit());
  const { projectId } = useParams();
  const [image, setImage] = useState("");
  const [currStudentidx, setCurrStudentidx] = useState(0);
  // const [messageList, setMessageList] = useState(initialMessages);
  const [messageList, setMessageList] = useState([]);
  const [githubLink, setgithubLink] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [messageSender, setMessageSender] = useState("");
  const loggedInTeacher = useSelector(
    (state) => state.security.loggedInTeacher
  );
  const [isOpenDrawer, setisOpenDrawer] = useState(true);
  const [isValidForm, setIsValidForm] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await Axios.get(
          `http://localhost:5000/projects/${projectId}/`
        );
        if (res && res.data) {
          const { status, preview, title, studentList, imgLink } = res.data;
          console.log(res.data);
          // check if fields like (status works and not status:status)
          setProject({
            ...project,
            status: status,
            title: title,
            preview: preview,
            imgLink: imgLink,
            studentsList: studentList,
            workshopName: res.data.workshop.name,
            teacherName: res.data.teacher.name,
          });
          console.log(studentList.length - 1);
          setCurrStudentidx(studentList.length - 1);
        }
      } catch {}
    };
    getProject();
  }, []);

  const updateProject = async (newStatus = project.status) => {
    try {
      const res = await Axios.put(
        "http://localhost:5000/projects/613768a4b8277c2f0220181c/",
        {
          status: newStatus,
          title: project.title,
          studentList: project.studentsList,
          preview: project.preview,
          // lastUpdateByStudent: loggedInTeacher ? project.lastUpdateByStudent : Date.now()
        }
      );
      setProject({ ...project, status: newStatus });
    } catch {}
  };

  useEffect(() => {
    if (areFieldsValid()) setIsValidForm(true);
    else setIsValidForm(false);
  });

  const areFieldsValid = () => {
    return (
      project.title &&
      // project.imgLink &&
      project.preview &&
      project.status &&
      isStudentListValid()
    );
  };

  const saveAndReject = () => {
    //check if last edit from students is later than last message from teacher, if not redirect to drawer and make teacher send another message
    updateProject("pendingStudentsEdit");
  };

  const isStudentListValid = () => {
    for (const student of project.studentsList) {
      if (
        !student.lastName ||
        !student.firstName ||
        !student.id ||
        !student.mail
      ) {
        return false;
      }
    }
    return true;
  };

  const onStudentListChange = (e, idx) => {
    let studentsArr = [...project.studentsList];
    let student = studentsArr[idx];
    student[e.target.name] = e.target.value;
    studentsArr = [
      ...studentsArr.slice(0, idx),
      student,
      ...studentsArr.slice(idx + 1),
    ];
    setProject({ ...project, studentsList: studentsArr });
  };

  const onNextStudentClick = () => {
    let studentsArr = [...project.studentsList];
    if (!studentsArr[currStudentidx + 1]) {
      studentsArr.push(new Student());
      setProject({ ...project, studentsList: studentsArr });
    }
    setCurrStudentidx(currStudentidx + 1);
  };

  const onPreviousStudentClick = () => {
    let studentsArr = [...project.studentsList];
    studentsArr.pop();
    if (currStudentidx !== 0) {
      setCurrStudentidx(currStudentidx - 1);
    }
    setProject({ ...project, studentsList: studentsArr });
  };

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

  const saveNewMessage = () => {
    let messages = [...messageList];
    const now = new Date();
    const _newMessage = {
      text: newMessage,
      date: `${now.getDate()}/${
        now.getMonth() + 1
      }/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`,
      fromTeacher: loggedInTeacher ? true : false,
      name: loggedInTeacher ? "אמיר קירש" : messageSender,
    };
    messages.push(_newMessage);
    setMessageList(messages);
    setNewMessage("");
  };

  const getMessageDetails = (message) => {
    return message.date + " ," + message.name;
  };

  const onMessageSenderChange = (e) => {
    setMessageSender(e.target.value);
  };

  const areFieldsDisabled =
    !loggedInTeacher && project.status === "pendingTeacherApproval";

  const statusFormat =
    project.status === "pendingTeacherApproval"
      ? "ממתין לאישור מרצה"
      : "ממתין לעריכת סטודנטים";

  return (
    <div className="edit-form">
      <div className="title-container">
        <Drawer anchor="left" open={isOpenDrawer} onClose={closeDrawer}>
          <div className="drawer-container">
            <div className="messages-container">
              <div className="messages-display-container">
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
                <div className="send-message-buttons-div">
                  <button
                    disabled={
                      (!loggedInTeacher && !messageSender) || !newMessage
                        ? true
                        : false
                    }
                    onClick={saveNewMessage}
                    className="new-message-button"
                  >
                    הוסף הודעה חדשה
                  </button>
                  <select
                    disabled={loggedInTeacher ? true : false}
                    className="name-select"
                    onChange={onMessageSenderChange}
                  >
                    {!loggedInTeacher ? (
                      <>
                        <option value="" disabled selected>
                          בחר סטודנט
                        </option>
                        {project.studentsList.map((student) => {
                          return (
                            <option key={student.id} value={student.name}>
                              {student.name}
                            </option>
                          );
                        })}
                      </>
                    ) : (
                      <option>אמיר קירש</option>
                    )}
                  </select>
                </div>
                <textarea
                  className="new-message-input"
                  placeholder="כתוב הודעה חדשה..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
              </div>
            </div>
            <div className="drawer-preview-container">aaa</div>
          </div>
        </Drawer>
        <button className="messages-button" onClick={openDrawer}>
          פתח תיבת הודעות
        </button>
        <span
          className={
            project.status === "pendingTeacherApproval"
              ? "status-orange"
              : "status-red"
          }
        >
          {statusFormat}
        </span>
        <div className="update-title">טופס עדכון הפרויקט</div>
      </div>
      <div className="project-teacher-details-container">
        <div className="input-container">
          <label>שם המרצה</label>
          <input value={project.teacherName} disabled />
        </div>
        <div className="input-container">
          <label>שם הסדנה</label>
          <input value={project.workshopName} disabled />
        </div>
        <div className="input-container">
          <label>מספר פרויקט</label>
          <input value={projectId} disabled />
        </div>
      </div>
      <div className="input-container">
        <label>שם הפרויקט</label>
        <input
          disabled={areFieldsDisabled ? true : false}
          value={project.title}
          onChange={(e) => {
            setProject({ ...project, title: e.target.value });
          }}
          name="project-title"
          autoComplete="off"
        />
      </div>
      <div className="input-container">
        <label>קישור לגיטהאב</label>
        <input
          disabled={areFieldsDisabled ? true : false}
          value={githubLink}
          onChange={onGithubLinkChange}
          name="github-link"
          autoComplete="off"
        />
      </div>
      <div className="preview-container">
        <label>עריכת התקציר</label>
        <textarea
          disabled={areFieldsDisabled ? true : false}
          className="markdown-editor"
          value={project.preview}
          onChange={(e) => {
            setProject({ ...project, preview: e.target.value });
          }}
        />
      </div>
      <div className="add-students-div">
        <label className="main-label">הוסף פרטי המגישים</label>
        {project.studentsList &&
          project.studentsList.map((student, idx) => {
            return (
              <StudentForm
                //  key={student.id}
                disabled={areFieldsDisabled ? true : false}
                currStudentidx={idx}
                student={student}
                onStudentListChange={onStudentListChange}
                isMultipleStudents={
                  project.studentsList.length > 1 ? true : false
                }
                isLast={idx === currStudentidx ? true : false}
              />
            );
          })}
        {!areFieldsDisabled && (
          <div
            className={
              currStudentidx === 0 || currStudentidx === 3
                ? "student-buttons justify-center"
                : "student-buttons justify-between"
            }
          >
            {currStudentidx < 3 && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onNextStudentClick();
                }}
              >
                הוסף תלמיד
              </button>
            )}
            {currStudentidx > 0 && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onPreviousStudentClick();
                }}
              >
                הסר תלמיד
              </button>
            )}
          </div>
        )}
      </div>
      <div className="add-img-container">
        <img src={logoThree} className="left-side" />
        <div className="right-side">
          <label>תמונת הפרויקט</label>
          <div className="image-buttons">
            <label
              className={
                areFieldsDisabled
                  ? "custom-file-upload disabled"
                  : "custom-file-upload"
              }
            >
              <input
                disabled={areFieldsDisabled ? true : false}
                onChange={onImageChange}
                type="file"
              />
              הוסף תמונה
            </label>
            <button
              disabled={areFieldsDisabled ? true : false}
              className={
                areFieldsDisabled ? "remove-img disabled" : "remove-img"
              }
            >
              הסר תמונה
            </button>
          </div>
        </div>
      </div>
      <div className="contacts-container">
        <label className="main-label">פרטי איש הקשר</label>
        <div className="contacts-input">
          <div className="input-container">
            <label>שם מלא</label>
            <input
              disabled={areFieldsDisabled ? true : false}
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              name="contact-name"
              autoComplete="off"
            />
          </div>

          <div className="input-container">
            <label>טלפון</label>
            <input
              disabled={areFieldsDisabled ? true : false}
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              name="contact-phone"
              autoComplete="off"
            />
          </div>
          <div className="input-container">
            <label>אימייל</label>
            <input
              disabled={areFieldsDisabled ? true : false}
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              name="contact-email"
              autoComplete="off"
            />
          </div>
        </div>
      </div>
      {loggedInTeacher && (
        <div className="teacher-project-approval">
          <button
            onClick={() => updateProject("approved")}
            disabled={!isValidForm ? true : false}
            className="approval-button"
          >
            שמור ואשר הגשה
          </button>
          {project.status === "pendingTeacherApproval" && (
            <button
              onClick={() => saveAndReject()}
              disabled={!isValidForm ? true : false}
              className="decline-button"
            >
              שמור והחזר לעריכת המגישים
            </button>
          )}
          <button
            onClick={async () => {
              await updateProject();
              //here push to teacher projects page
              // history.push("/");
            }}
            disabled={!isValidForm ? true : false}
            className="save-only"
          >
            שמור בלבד
          </button>
        </div>
      )}
      {!loggedInTeacher && (
        <button
          onClick={() => updateProject("pendingTeacherApproval", true)}
          className="student-project-submit-button"
          disabled={
            project.status === "pendingTeacherApproval" || !isValidForm
              ? true
              : false
          }
        >
          {project.status === "pendingTeacherApproval"
            ? "ממתין לאישור המרצה"
            : "הגש לאישור מרצה"}
        </button>
      )}
    </div>
  );
};
export default EditProject;
