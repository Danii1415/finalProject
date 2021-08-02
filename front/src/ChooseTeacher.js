import React, { useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Button, Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    marginTop: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    minWidth: "400px",
  },
});

const ChooseTeacher = ({
  teachers,
  onSelectedTeacherSubmit,
  onSelectedTeacherChange,
  nextStep,
  selectedTeacherName,
}) => {
  const classes = useStyles();

  const onContinue = () => {
    onSelectedTeacherSubmit();
    nextStep();
  };

  return (
    <Container className={classes.container}>
      <FormControl className={classes.form} onChange={onSelectedTeacherChange}>
        <InputLabel>בחר מרצה</InputLabel>
        <Select
          variant="outlined"
          fullWidth
          onChange={onSelectedTeacherChange}
          value={selectedTeacherName}
        >
          {teachers.map((teacher) => {
            return (
              <MenuItem key={teacher.id} value={teacher.name}>
                {teacher.name}
              </MenuItem>
            );
          })}
        </Select>
        <Button
          size="large"
          onClick={onContinue}
          disabled={selectedTeacherName ? false : true}
          color="primary"
        >
          הבא
        </Button>
      </FormControl>
    </Container>
  );
};

export default ChooseTeacher;
