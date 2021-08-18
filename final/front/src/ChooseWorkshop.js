import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  makeStyles,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  container: {
    marginTop: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "400px",
  },
});

const ChooseWorkshop = ({
  onChange,
  currWorkshops,
  nextStep,
  prevStep,
  selectedWorkshopName,
}) => {
  const classes = useStyles();

  return (
    <form>
      <FormLabel>בחר סדנה</FormLabel>
      <RadioGroup value={selectedWorkshopName} onChange={onChange}>
        {currWorkshops &&
          currWorkshops.map((workshop) => {
            return (
              <FormControlLabel
                key={workshop.id}
                value={workshop.name}
                control={<Radio />}
                label={workshop.name}
              />
            );
          })}
      </RadioGroup>
    </form>
  );
};

export default ChooseWorkshop;
