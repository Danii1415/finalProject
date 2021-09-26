import React, { useEffect, useState } from "react";
import { uploadImage, submitProject } from "../../api/api";
import { MenuItem, Select } from "@material-ui/core";
import { ProjectToAdd, Student } from "../../utils";
import StudentForm from "../../components/student-form/StudentForm";
import { getTeacherData } from "../../api/api";
import "./AddProject.scss";

const AddProject = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [currCourses, setCurrCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [currStudentidx, setCurrStudentidx] = useState(0);
  const [image, setImage] = useState("");
  const [isValidForm, setIsValidForm] = useState(false);
  const [project, setProject] = useState(new ProjectToAdd());
  const [displayProjectSuccess, setDisplayProjectSuccess] = useState(false);
  const [isSaveClicked, setIsSaveClicked] = useState(false);
  const [currFile, setCurrFile] = useState("");

  useEffect(() => {
    if (areFieldsValid()) setIsValidForm(true);
    else setIsValidForm(false);
  });

  useEffect(() => {
    const getTeachers = async () => {
      setTeachers((await getTeacherData()) || []);
    };
    getTeachers();
  }, []);

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(URL.createObjectURL(img));
      setCurrFile(e.target.files[0]);
    }
  };

  const removePictureClick = () => {
    setImage("");
    setCurrFile("");
  };

  const handleUploadImage = async (fileName) => {
    const formData = new FormData();
    formData.append("file", currFile);
    formData.append("filename", fileName);
    await uploadImage(formData);
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

  const areFieldsValid = () => {
    return (
      project.title &&
      project.teacherId &&
      project.courseId &&
      image &&
      project.preview &&
      isStudentListValid() &&
      project.contactEmail &&
      project.contactName &&
      project.contactPhone
    );
  };

  const onProjectSubmit = async () => {
    setIsSaveClicked(true);
    try {
      const res = await submitProject(
        project.title,
        project.teacherId,
        project.courseId,
        project.studentsList,
        project.preview,
        project.githubLink,
        project.contactEmail,
        project.contactName,
        project.contactPhone
      );
      if (res && res.data) {
        const split = currFile.name.split(".");
        await handleUploadImage(`${res.data}.${split[split.length - 1]}`);
        setDisplayProjectSuccess(true);
      }
    } catch (e) {
      setIsSaveClicked(false);
      console.log(e);
    }
  };

  const selectedTeacherChange = (e) => {
    const teacher = teachers.filter(
      (teacher) => teacher.name === e.target.value
    )[0];
    const courses = teacher.courses;

    if (selectedTeacher) {
      setSelectedCourse("");
    }
    setSelectedTeacher(teacher);
    setCurrCourses(courses);
    setProject({ ...project, teacherId: teacher._id });
  };

  const selectedCourseChange = (e) => {
    const course = currCourses.filter(
      (course) => course.name === e.target.value
    )[0];

    setSelectedCourse(course);
    setProject({ ...project, courseId: course._id });
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

  return (
    <>
      {displayProjectSuccess ? (
        <div className="submit-success-message">
          <div className="header">הפרויקט הוגש בהצלחה</div>
          <div className="description">
            קישור לדף עריכת התקציר נשלח למגישים במייל
          </div>
        </div>
      ) : (
        <div className="add-form">
          <div className="title">הגשת תקציר לסדנה</div>
          <div className="select-form">
            <label>בחר מרצה</label>
            <Select
              style={{ height: "40px", backgroundColor: "white" }}
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
              disabled={!currCourses.length ? true : false}
              style={{ height: "40px", backgroundColor: "white" }}
              variant="outlined"
              onChange={selectedCourseChange}
              value={selectedCourse && selectedCourse.name}
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
              {currCourses.map((course) => {
                return (
                  <MenuItem key={course.id} value={course.name}>
                    {course.name}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
          <div className="input-container">
            <label>שם הפרויקט</label>
            <input
              value={project.title}
              onChange={(e) =>
                setProject({ ...project, title: e.target.value })
              }
              name="project-title"
              autoComplete="off"
            />
          </div>
          <div className="input-container">
            <label>Github-קישור ל</label>
            <input
              value={project.githubLink}
              onChange={(e) => {
                setProject({ ...project, githubLink: e.target.value });
              }}
              name="github-link"
              autoComplete="off"
            />
            <span className="text-helper">אופציונלי</span>
          </div>
          <div className="add-students-div">
            <label className="main-label">הוסף פרטי המגישים</label>
            {/* i dont think we need that validation */}
            {project.studentsList &&
              project.studentsList.map((student, idx) => {
                return (
                  <StudentForm
                    // key={student.id}
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
            <label>כתבו תקציר באורך 250-400 מילים</label>
            <textarea
              className="markdown-editor"
              value={project.preview}
              onChange={(e) =>
                setProject({ ...project, preview: e.target.value })
              }
            />
          </div>
          <div className="add-img-container">
            <img src={image} alt="" className="left-side" />
            <div className="right-side">
              <label>תמונת הפרויקט</label>
              <div className="image-buttons">
                <label
                  className={
                    image ? "custom-file-upload grey" : "custom-file-upload"
                  }
                >
                  <input
                    disabled={image ? true : false}
                    onChange={onImageChange}
                    type="file"
                  />
                  הוסף תמונה
                </label>
                <button
                  disabled={!image ? true : false}
                  onClick={removePictureClick}
                  className="remove-img"
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
                  value={project.contactName}
                  onChange={(e) =>
                    setProject({ ...project, contactName: e.target.value })
                  }
                  name="contact-name"
                  autoComplete="off"
                />
              </div>

              <div className="input-container">
                <label>טלפון</label>
                <input
                  value={project.contactPhone}
                  onChange={(e) =>
                    setProject({ ...project, contactPhone: e.target.value })
                  }
                  name="contact-phone"
                  autoComplete="off"
                />
              </div>
              <div className="input-container">
                <label>אימייל</label>
                <input
                  value={project.contactEmail}
                  onChange={(e) =>
                    setProject({ ...project, contactEmail: e.target.value })
                  }
                  name="contact-email"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
          <button
            disabled={!isValidForm || isSaveClicked ? true : false}
            onClick={onProjectSubmit}
            className="save-button"
          >
            הגש את הפרויקט
          </button>
        </div>
      )}
    </>
  );
};

export default AddProject;
