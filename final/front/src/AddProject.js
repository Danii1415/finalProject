import React, { useEffect, useState } from "react";
import "./AddProject.scss";
import { MenuItem, Select } from "@material-ui/core";
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

class Student {
  constructor(firstName = "", lastName = "", idNumber = "", emailAddress = "") {
    this.firstName = firstName;
    this.lastName = lastName;
    this.idNumber = idNumber;
    this.emailAddress = emailAddress;
  }
}

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
  const [step, setStep] = useState(1);
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
    setSelectedWorkshop(teacher.workshops[0]);
    setCurrWorkshops(workshops);
  };

  const selectedWorkshopChange = (e) => {
    let workshop = currWorkshops.filter(
      (workshop) => workshop.name === e.target.value
    )[0];
    setSelectedWorkshop(workshop);
  };

  const onStudentListChange = (e, idx) => {
    console.log(e.target);
    let studentsArr = [...studentsList];
    console.log(studentsArr);
    console.log(idx);
    let student = studentsArr[idx];
    console.log(student);
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
    setStep(step + 1);
  };

  const onPreviousStudentClick = () => {
    if (currStudentidx !== 0) {
      setcurrStudentidx(currStudentidx - 1);
    }
    setStep(step - 1);
  };

  const onPreviewChange = (e) => {
    setMarkDownText(e.target.value);
  };

  useEffect(() => {
    setCurrWorkshops(teachers[0].workshops);
    setSelectedTeacher(teachers[0]);
    setSelectedWorkshop(teachers[0].workshops[0]);
  }, []);

  return (
    <div className="container">
      <div className="title">הגשת תקציר לסדנה</div>
      <div className="select-form">
        <label>בחר מרצה</label>
        <Select
          style={{ height: "40px" }}
          variant="outlined"
          onChange={selectedTeacherChange}
          value={selectedTeacher && selectedTeacher.name}
        >
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
          style={{ height: "40px" }}
          variant="outlined"
          onChange={selectedWorkshopChange}
          value={selectedWorkshop && selectedWorkshop.name}
        >
          {currWorkshops.map((workshop) => {
            return (
              <MenuItem key={workshop.id} value={workshop.name}>
                {workshop.name}
              </MenuItem>
            );
          })}
        </Select>
      </div>
      <form className="students-form">
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
      <div></div>
    </div>
  );
};

export default AddProject;
