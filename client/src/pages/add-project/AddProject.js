import React, { useEffect, useState } from "react";
import "./AddProject.scss";
import { MenuItem, Select } from "@material-ui/core";
import { Student } from "../../utils";
import StudentForm from "../../components/student-form/StudentForm";

// import ReactMarkdown from "react-markdown";

const kirsh = {
  id: 1,
  name: "אמיר קירש",
  workshops: [
    {
      id: 4,
      name: "הנדסת תוכנה",
    },
    {
      id: 5,
      name: "יישומי רשת",
    },
  ],
};

const guy = {
  id: 2,
  name: "גיא רונן",
  workshops: [
    {
      id: 8,
      name: "סדנה 1",
    },
    {
      id: 13,
      name: "איי איי איי",
    },
  ],
};

const teachers = [kirsh, guy];

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

// const initialTeacher = kirsh;
// const initialWorkshop = kirsh.workshops[0];
// const initialWorkshops = kirsh.workshops;
// const initialStudentList = [
//   new Student("daniel", "kfir", "555555", "dd@default.com"),
//   new Student("shiran", "kfir", "444444", "dd@mooiie.com"),
//   new Student("einav", "kfir", "11111111", "dd@efwefwefwfew.com"),
//   new Student("daniel", "kfir", "2222222", "dd@qqqqqq.com"),
// ];
// const initialGithubLink = "danii1415@github.com";

const AddProject = () => {
  // const [selectedTeacher, setSelectedTeacher] = useState(initialTeacher || "");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [currWorkshops, setCurrWorkshops] = useState([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState("");
  const [currStudentidx, setcurrStudentidx] = useState(0);
  const [studentsList, setStudentsList] = useState([new Student()]);
  // const [studentsList, setStudentsList] = useState(initialStudentList);
  const [markDownText, setMarkDownText] = useState("");
  const [image, setImage] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [githubLink, setgithubLink] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(URL.createObjectURL(img));
    }
  };

  const removePictureClick = () => {
    setImage(null);
  };

  const onGithubLinkChange = (e) => {
    setgithubLink(e.target.value);
  };
  const onTitleChange = (e) => {
    setProjectTitle(e.target.value);
  };

  const selectedTeacherChange = (e) => {
    const teacher = teachers.filter(
      (teacher) => teacher.name === e.target.value
    )[0];
    const workshops = teacher.workshops;
    setSelectedTeacher(teacher);
    setCurrWorkshops(workshops);
  };

  const selectedWorkshopChange = (e) => {
    let workshop = currWorkshops.filter(
      (workshop) => workshop.name === e.target.value
    )[0];
    setSelectedWorkshop(workshop);
  };

  const onStudentListChange = (e, idx) => {
    let studentsArr = [...studentsList];
    let student = studentsArr[idx];
    student[e.target.name] = e.target.value;
    setStudentsList([
      ...studentsArr.slice(0, idx),
      student,
      ...studentsArr.slice(idx + 1),
    ]);
  };

  const onNextStudentClick = () => {
    let studentsArr = [...studentsList];
    if (!studentsArr[currStudentidx + 1]) {
      studentsArr.push(new Student());
      setStudentsList(studentsArr);
    }
    setcurrStudentidx(currStudentidx + 1);
  };

  const onPreviousStudentClick = () => {
    let studentsArr = [...studentsList];
    studentsArr.pop();
    if (currStudentidx !== 0) {
      setcurrStudentidx(currStudentidx - 1);
    }
    setStudentsList(studentsArr);
  };

  const onPreviewChange = (e) => {
    setMarkDownText(e.target.value);
  };

  return (
    <div className="add-form">
      <div className="title">הגשת תקציר לסדנה</div>
      <div className="select-form">
        <label>בחר מרצה</label>
        <Select
          style={{ height: "40px" }}
          variant="outlined"
          onChange={selectedTeacherChange}
          value={selectedTeacher && selectedTeacher.name}
          displayEmpty
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
            getContentAnchorEl: null,
          }}
        >
          <MenuItem disabled key="-1" value="">
            בחר מרצה
          </MenuItem>
          {teachers.map((teacher) => {
            return (
              <MenuItem key={teacher.id} value={teacher.name}>
                {teacher.name}
              </MenuItem>
            );
          })}
        </Select>
      </div>
      <div className="select-form">
        <label>בחר סדנה</label>
        <Select
          disabled={!currWorkshops.length ? true : false}
          style={{ height: "40px" }}
          variant="outlined"
          onChange={selectedWorkshopChange}
          value={selectedWorkshop && selectedWorkshop.name}
          displayEmpty
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
            getContentAnchorEl: null,
          }}
        >
          <MenuItem disabled key="-1" value="">
            בחר סדנה
          </MenuItem>
          {currWorkshops.map((workshop) => {
            return (
              <MenuItem key={workshop.id} value={workshop.name}>
                {workshop.name}
              </MenuItem>
            );
          })}
        </Select>
      </div>
      <div className="input-container">
        <label>שם הפרויקט</label>
        <input
          value={projectTitle}
          onChange={onTitleChange}
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
      <div class="add-students-div">
        <label className="main-label">הוסף פרטי המגישים</label>
        {studentsList.map((student, idx) => {
          return (
            <StudentForm
              currStudentidx={idx}
              student={student}
              onStudentListChange={onStudentListChange}
              isMultipleStudents={studentsList.length > 1 ? true : false}
              isLast={idx === currStudentidx ? true : false}
            />
          );
        })}
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
        {/* </div> */}
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
      <button className="save-button">הגש את הפרויקט</button>
    </div>
  );
};

export default AddProject;
