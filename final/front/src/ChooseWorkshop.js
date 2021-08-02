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
    <Container className={classes.container}>
      <FormControl>
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
      </FormControl>
      <Box>
        <Button onClick={prevStep}>הקודם</Button>
        <Button
          onClick={nextStep}
          disabled={selectedWorkshopName ? false : true}
        >
          הבא
        </Button>
      </Box>
    </Container>
  );
};

export default ChooseWorkshop;
