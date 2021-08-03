import { Button, Container, FormLabel, TextField } from "@material-ui/core";
import React from "react";

const StudentForm = ({
  stepNumber,
  goToPreview,
  onPreviousStudentClick,
  onNextStudentClick,
  onStudentListChange,
  currStudent,
}) => {
  return (
    <Container component="main" maxWidth="xs">
      <form
        onChange={(e) => {
          onStudentListChange(e, stepNumber - 3);
        }}
      >
        <FormLabel>משתתף מספר {stepNumber - 2}</FormLabel>
        <TextField
          value={currStudent.firstName}
          id="first"
          name="firstName"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="שם פרטי"
          autoFocus
        />
        <TextField
          value={currStudent.lastName}
          name="lastName"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="שם משפחה"
        />
        <TextField
          value={currStudent.emailAddress}
          type="email"
          name="emailAddress"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="כתובת מייל"
        />
        <TextField
          value={currStudent.idNumber}
          name="idNumber"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="תעודת זהות"
        />
        <Button onClick={onPreviousStudentClick}>הקודם</Button>
        {stepNumber >= 3 && stepNumber <= 5 && (
          <Button onClick={onNextStudentClick}>הוסף תלמיד</Button>
        )}
        <Button onClick={goToPreview}>עבור לתקציר</Button>
      </form>
    </Container>
  );
};

export default StudentForm;
