import React, { useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Button, Container, makeStyles } from "@material-ui/core";
import "./ChooseTeacher.css";

// const useStyles = makeStyles({
//   form: {
//     minWidth: "700px",
//     maxWidth: "1000px",
//     display: "flex",
//   },
// });

const ChooseTeacher = ({
  teachers,
  onSelectedTeacherChange,
  selectedTeacherName,
}) => {
  // const classes = useStyles();

  return (
    <FormControl onChange={onSelectedTeacherChange}>
      {/* <InputLabel>בחר מרצה</InputLabel> */}
      <label>בחר מרצה</label>
      <Select
        variant="outlined"
        onChange={onSelectedTeacherChange}
        value={selectedTeacherName || teachers[0].name}
      >
        {teachers.map((teacher) => {
          return (
            <MenuItem key={teacher.id} value={teacher.name}>
              {teacher.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default ChooseTeacher;
