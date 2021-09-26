import React, { useEffect } from "react";
import { Divider, Drawer } from "@material-ui/core";
import { ProjectToEdit } from "../../utils";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Student } from "../../utils";
import StudentForm from "../../components/student-form/StudentForm";
import Axios from "axios";
import { useHistory, useParams } from "react-router";
import "./EditProject.scss";

const EditProject = () => {
  const [project, setProject] = useState(new ProjectToEdit());
  const { projectId } = useParams();
  const [image, setImage] = useState("");
  const [currStudentidx, setCurrStudentidx] = useState(0);
  const [messageList, setMessageList] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [messageSender, setMessageSender] = useState("");
  const loggedInTeacher = useSelector(
    (state) => state.security.loggedInTeacher
  );
  const [isOpenDrawer, setisOpenDrawer] = useState(false);
  const [isValidForm, setIsValidForm] = useState(true);
  const history = useHistory();
  const [currImgLink, setCurrImgLink] = useState("");
  const [isTeacherMessageRequired, setIsTeacherMessageRequired] =
    useState(true);
  const [isSaveClicked, setIsSaveClicked] = useState(false);
  const [currFile, setCurrFile] = useState("");

  useEffect(() => {
    let res = true;
    for (const message of messageList) {
      if (
        new Date(message.created).getTime() -
          parseInt(project.lastUpdateByStudent) >
          0 &&
        message.fromTeacher === true
      )
        res = false;
    }
    setIsTeacherMessageRequired(res);
  }, [messageList]);

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await Axios.get(
          `http://localhost:5000/projects/msgs/${projectId}/`
        );
        if (res && res.data) {
          const {
            status,
            preview,
            title,
            studentList,
            imgLink,
            githubLink,
            contactEmail,
            contactName,
            contactPhone,
            lastUpdateByStudent,
            _id,
            msgs,
            imageIsOld,
            number,
          } = res.data;
          setProject({
            ...project,
            status: status,
            title: title,
            preview: preview,
            imgLink: imgLink,
            studentsList: studentList,
            courseName: res.data.course.name,
            teacherName: res.data.teacher.name,
            githubLink: githubLink,
            contactEmail: contactEmail,
            contactName: contactName,
            contactPhone: contactPhone,
            lastUpdateByStudent: lastUpdateByStudent,
            teacherId: res.data.teacher._id,
            _id: _id,
            imageIsOld: imageIsOld,
            number: number,
          });
          setMessageList(msgs.reverse());
          setCurrStudentidx(studentList.length - 1);
          setCurrImgLink(imgLink);
        }
      } catch {}
    };
    getProject();
  }, []);

  const handleUploadImage = async (fileName) => {
    const formData = new FormData();
    formData.append("file", currFile);
    formData.append("filename", fileName);
    try {
      const res = await Axios({
        method: "post",
        url: "http://localhost:5000/upload/",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const updateProject = async (newStatus = project.status) => {
    try {
      const res = await Axios.put(
        `http://localhost:5000/projects/${project._id}/`,
        {
          status: newStatus,
          title: project.title,
          preview: project.preview,
          githubLink: project.githubLink,
          contactEmail: project.contactEmail,
          contactName: project.contactName,
          contactPhone: project.contactPhone,
          lastUpdateByStudent: loggedInTeacher
            ? project.lastUpdateByStudent
            : Date.now().toString(),
          imageIsOld: project.imageIsOld,
        }
      );
      if (res && res.data) {
        if (currFile) {
          const split = currFile.name.split(".");
          await handleUploadImage(`${project._id}.${split[split.length - 1]}`);
        }
        setProject({ ...project, status: newStatus });
        if (loggedInTeacher) {
          history.push(`/${project.teacherId}/projects`);
        }
      }
    } catch (e) {
      setIsSaveClicked(false);
    }
  };

  useEffect(() => {
    if (areFieldsValid()) setIsValidForm(true);
    else setIsValidForm(false);
  });

  const areFieldsValid = () => {
    return (
      project.title &&
      (currImgLink || image) &&
      project.preview &&
      project.contactEmail &&
      project.contactName &&
      project.contactPhone &&
      isStudentListValid()
    );
  };

  const saveAndReject = async () => {
    if (isTeacherMessageRequired) {
      openDrawer();
      setIsSaveClicked(false);
    } else await updateProject("pendingStudentsEdit");
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
      setCurrFile(e.target.files[0]);
    }
  };

  const saveNewMessage = async () => {
    const _newMessage = {
      text: newMessage,
      projectId: project._id,
      fromTeacher: loggedInTeacher ? true : false,
      name: loggedInTeacher ? project.teacherName : messageSender,
      created: new Date(),
    };
    try {
      const res = await Axios.post("http://localhost:5000/msg/", {
        text: _newMessage.text,
        projectId: _newMessage.projectId,
        fromTeacher: _newMessage.fromTeacher,
        name: _newMessage.name,
      });
      let messages = [...messageList];
      messages.push(_newMessage);
      setMessageList(messages);
      setNewMessage("");
    } catch (e) {}
  };

  const getMessageDetailsFormat = (messageDate, senderName) => {
    const date = new Date(messageDate);
    const dateFormat = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    return `${dateFormat}, ${senderName}`;
  };

  const onMessageSenderChange = (e) => {
    setMessageSender(e.target.value);
  };

  const removeImage = () => {
    setProject({ ...project, imageIsOld: false });
    setCurrImgLink("");
    setImage("");
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
            <div className="messages-and-preview-container">
              <div className="messages-container">
                <div className="messages-display-container">
                  <div className="header">תיבת ההודעות</div>
                  <Divider
                    style={{ marginBottom: "10px", marginTop: "10px" }}
                  />
                  {messageList.map((message, idx) => {
                    return (
                      <div className="message-container" key={idx}>
                        <div
                          className={
                            loggedInTeacher
                              ? message.fromTeacher === true
                                ? "content-sender"
                                : "content-reciever"
                              : message.fromTeacher === true
                              ? "content-reciever"
                              : "content-sender"
                          }
                        >
                          <span className="message-text">{message.text}</span>
                          <span className="message-details">
                            {getMessageDetailsFormat(
                              message.created,
                              message.name
                            )}
                          </span>
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
                              <option
                                key={student._id}
                                value={`${student.firstName} ${student.lastName}`}
                              >
                                {`${student.firstName} ${student.lastName}`}
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
              <div className="drawer-preview-container">
                <div className="preview-header">תקציר הפרויקט</div>
                <Divider style={{ marginBottom: "10px", marginTop: "10px" }} />
                <div className="preview-text">{project.preview}</div>
              </div>
            </div>
            {loggedInTeacher && isTeacherMessageRequired && (
              <div className="warning-message-wrapper">
                <span className="leave-message-warning">
                  ( יש להשאיר לתלמידים הודעה כדי לדחות את ההגשה )
                </span>
              </div>
            )}
            <div className="buttons-div">
              {loggedInTeacher && (
                <button
                  onClick={saveAndReject}
                  disabled={
                    isTeacherMessageRequired || isSaveClicked || !isValidForm
                      ? true
                      : false
                  }
                  className="reject-button"
                >
                  שמור והחזר לעריכת המגישים
                </button>
              )}
              <button onClick={closeDrawer} className="return-button">
                חזור לעריכת הפרויקט
              </button>
            </div>
            {/* <div ref={drawerEndRef}>a</div> */}
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
          <input value={project.courseName} disabled />
        </div>
        <div className="input-container">
          <label>מספר פרויקט</label>
          <input value={project.number} disabled />
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
          value={project.githubLink}
          onChange={(e) => {
            setProject({ ...project, githubLink: e.target.value });
          }}
          name="github-link"
          autoComplete="off"
        />
        <span className="text-helper">אופציונלי</span>
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
        <img
          alt=""
          src={
            project.imageIsOld
              ? project.imgLink
              : image
              ? image
              : currImgLink
              ? `http://localhost:5000/get_image/${project._id}/`
              : ""
          }
          className="left-side"
        />
        <div className="right-side">
          <label>תמונת הפרויקט</label>
          <div className="image-buttons">
            <label
              className={
                areFieldsDisabled || currImgLink || image
                  ? "custom-file-upload disabled"
                  : "custom-file-upload"
              }
            >
              <input
                disabled={
                  areFieldsDisabled || currImgLink || image ? true : false
                }
                onChange={onImageChange}
                type="file"
              />
              הוסף תמונה
            </label>
            <button
              onClick={removeImage}
              disabled={
                areFieldsDisabled || (!currImgLink && !image) ? true : false
              }
              className={
                areFieldsDisabled || (!currImgLink && !image)
                  ? "remove-img disabled"
                  : "remove-img"
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
              value={project.contactName}
              onChange={(e) => {
                setProject({ ...project, contactName: e.target.value });
              }}
              name="contact-name"
              autoComplete="off"
            />
          </div>

          <div className="input-container">
            <label>טלפון</label>
            <input
              disabled={areFieldsDisabled ? true : false}
              value={project.contactPhone}
              onChange={(e) => {
                setProject({ ...project, contactPhone: e.target.value });
              }}
              name="contact-phone"
              autoComplete="off"
            />
          </div>
          <div className="input-container">
            <label>אימייל</label>
            <input
              disabled={areFieldsDisabled ? true : false}
              value={project.contactEmail}
              onChange={(e) => {
                setProject({ ...project, contactEmail: e.target.value });
              }}
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
            disabled={!isValidForm || isSaveClicked ? true : false}
            className="approval-button"
          >
            שמור ואשר הגשה
          </button>
          {project.status === "pendingTeacherApproval" && (
            <button
              onClick={() => saveAndReject()}
              disabled={!isValidForm || isSaveClicked ? true : false}
              className="decline-button"
            >
              שמור והחזר לעריכת המגישים
            </button>
          )}
          <button
            onClick={async () => {
              await updateProject();
            }}
            disabled={!isValidForm || isSaveClicked ? true : false}
            className="save-only"
          >
            שמור בלבד
          </button>
        </div>
      )}
      {!loggedInTeacher && (
        <button
          onClick={async () => updateProject("pendingTeacherApproval")}
          className="student-project-submit-button"
          disabled={
            project.status === "pendingTeacherApproval" ||
            !isValidForm ||
            isSaveClicked
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
