import { Divider } from "@material-ui/core";
import React from "react";

const StudentForm = ({
  currStudentidx,
  student,
  onStudentListChange,
  isMultipleStudents,
  isLast,
  disabled,
}) => {
  return (
    <form className="students-form">
      {isMultipleStudents && (
        <label className="student-number">{`משתתף מספר ${
          currStudentidx + 1
        }`}</label>
      )}
      <div className="student-input-row ">
        <div className="input-container first">
          <label>שם משפחה</label>
          <input
            disabled={disabled ? true : false}
            value={student.lastName}
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
            disabled={disabled ? true : false}
            value={student.firstName}
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
            disabled={disabled ? true : false}
            value={student.idNumber}
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
            disabled={disabled ? true : false}
            value={student.emailAddress}
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
      {isMultipleStudents && !isLast && <Divider />}
    </form>
  );
};

export default StudentForm;
