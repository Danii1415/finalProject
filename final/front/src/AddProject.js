import React, { useState } from "react";
import ChooseTeacher from "./ChooseTeacher";
import ChooseWorkshop from "./ChooseWorkshop";
import StudentForm from "./StudentForm";
import AddPreview from "./AddPreview";
import AddImage from "./AddImage";
import ProjectSummary from "./ProjectSummary";

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

const initialTeacher = kirsh;
const initialWorkshop = kirsh.workshops[0];
const initialWorkshops = kirsh.workshops;
const initialStudentList = [
  new Student("daniel", "kfir", "555555", "dd@default.com"),
  new Student("shiran", "kfir", "444444", "dd@mooiie.com"),
  new Student("einav", "kfir", "11111111", "dd@efwefwefwfew.com"),
  new Student("daniel", "kfir", "2222222", "dd@qqqqqq.com"),
];
const initialGithubLink = "danii1415@github.com";

const AddProject = () => {
  const [step, setStep] = useState(1);
  // const [selectedTeacher, setSelectedTeacher] = useState(initialTeacher || "");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [currWorkshops, setCurrWorkshops] = useState(null);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [currStudentidx, setcurrStudentidx] = useState(0);
  const [studentsList, setStudentsList] = useState([new Student()]);
  // const [studentsList, setStudentsList] = useState(initialStudentList);
  const [markDownText, setMarkDownText] = useState(initialMarkdownText);
  const [image, setImage] = useState(null);
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
    let teacher = teachers.filter(
      (teacher) => teacher.name === e.target.value
    )[0];
    setSelectedTeacher(teacher);
  };

  const selectedTeacherSubmit = () => {
    const curr = selectedTeacher.workshops;
    console.log(curr);

    setCurrWorkshops(curr);
  };

  const selectedWorkshopChange = (e) => {
    let workshop = currWorkshops.filter(
      (workshop) => workshop.name == e.target.value
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
    setStep(step + 1);
  };

  const onPreviousStudentClick = () => {
    if (currStudentidx !== 0) {
      setcurrStudentidx(currStudentidx - 1);
    }
    setStep(step - 1);
  };

  const nextStep = () => {
    let curr = step;
    setStep(curr + 1);
  };
  const prevStep = () => {
    console.log(currStudentidx);
    if (step === 7) {
      setStep(currStudentidx + 3);
    } else {
      let curr = step;
      setStep(curr - 1);
    }
  };
  const goToPreview = () => {
    setStep(7);
  };

  const onPreviewChange = (e) => {
    setMarkDownText(e.target.value);
  };

  return (
    <>
      {step === 1 && (
        <ChooseTeacher
          selectedTeacherName={selectedTeacher.name}
          nextStep={nextStep}
          teachers={teachers}
          onSelectedTeacherSubmit={selectedTeacherSubmit}
          onSelectedTeacherChange={selectedTeacherChange}
        />
      )}
      {step === 2 && (
        <ChooseWorkshop
          onChange={selectedWorkshopChange}
          currWorkshops={currWorkshops}
          nextStep={nextStep}
          prevStep={prevStep}
          selectedWorkshopName={selectedWorkshop && selectedWorkshop.name}
          workshopId={selectedWorkshop && selectedWorkshop.id}
        />
      )}
      {step >= 3 && step <= 6 && (
        <StudentForm
          nextStep={nextStep}
          prevStep={prevStep}
          stepNumber={step}
          onStudentListChange={onStudentListChange}
          currStudent={studentsList[currStudentidx]}
          goToPreview={goToPreview}
          onPreviousStudentClick={onPreviousStudentClick}
          onNextStudentClick={onNextStudentClick}
        />
      )}
      {step === 7 && (
        <AddPreview
          githubLink={githubLink}
          onGithubLinkChange={onGithubLinkChange}
          projectTitle={projectTitle}
          onTitleChange={onTitleChange}
          markDownText={markDownText}
          onPreviewChange={onPreviewChange}
          prevStep={prevStep}
          nextStep={nextStep}
        />
      )}
      {step === 8 && (
        <AddImage
          nextStep={nextStep}
          prevStep={prevStep}
          image={image}
          onImageChange={onImageChange}
          removePictureClick={removePictureClick}
        />
      )}
      {step === 9 && (
        <ProjectSummary
          prevStep={prevStep}
          onProjectSubmit={() => {}}
          // img={image}
          githubLink={githubLink}
          teacherName={selectedTeacher.name}
          workshopName={selectedWorkshop.name}
          studentsInfo={studentsList}
          projectPreview={markDownText}
          projectTitle={projectTitle}
        />
      )}
    </>
  );
};

export default AddProject;
