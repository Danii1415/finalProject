import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  linkStyle: {
    color: "white",
    textDecoration: "none",
  },
});
const Navbar = ({ loggedInTeacher = false }) => {
  const history = useHistory();
  const classes = useStyles();
  const onSignOut = () => {
    //signOutUser
    history.push("/signin");
  };
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h4" className={classes.root}>
          <Link className={classes.linkStyle} to="/">
            סדנא תשעט
          </Link>
        </Typography>
        <Typography variant="subtitle2" className={classes.root}>
          Logged in as {"teacher"}
        </Typography>
        <Button color="inherit">
          <Link className={classes.linkStyle} to="/addproject">
            הגשת פרוייקט חדש
          </Link>
        </Button>
        <Button color="inherit">
          <Link className={classes.linkStyle} to="/EditPreview">
            עריכת הפרויקט
          </Link>
        </Button>
        {loggedInTeacher === true && (
          <Button color="inherit" onClick={onSignOut}>
            צא
          </Button>
        )}
        {loggedInTeacher === false && (
          <Button color="inherit" onClick={onSignOut}>
            כניסת מרצה
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
