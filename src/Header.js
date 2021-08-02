import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useMediaQuery,
  Button,
  useScrollTrigger,
  Slide,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import AllWorkshops from "./AllWorkshops";
import Directions from "./Directions";
import EditWorkshop from "./EditWorkshop";
import AddProject from "./AddProject";

// // IMPORTING ICONS
// import MenuIcon from "@material-ui/icons/Menu";
// import HomeIcon from "@material-ui/icons/Home";
// import SchoolIcon from "@material-ui/icons/School";
// import PersonIcon from "@material-ui/icons/Person";
import BookmarksIcon from "@material-ui/icons/Bookmarks";

// // REACT APP IMPORTS
// import Home from "./Pages/Home";
// import College from "./Pages/College";
// import About from "./Pages/About";
// import Personal from "./Pages/Personal";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* <HideOnScroll {...props}> */}
      <BrowserRouter>
        <AppBar>
          <Toolbar>
            <Typography
              variant="h5"
              component="p"
              color="textSecondary"
              className={classes.title}
            >
              Murali
            </Typography>
            {/* {isMobile ? (
                <>
                  <IconButton
                    color="textPrimary"
                    className={classes.menuButton}
                    edge="start"
                    aria-label="menu"
                    onClick={handleMenu}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    KeepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={open}
                  >
                    <MenuItem
                      onClick={() => setAnchorEl(null)}
                      component={Link}
                      to={process.env.PUBLIC_URL + "/"}
                    >
                      <ListItemIcon>
                        <HomeIcon />
                      </ListItemIcon>
                      <Typography variant="h6"> Home</Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => setAnchorEl(null)}
                      component={Link}
                      to={process.env.PUBLIC_URL + "/College"}
                    >
                      <ListItemIcon>
                        <SchoolIcon />
                      </ListItemIcon>
                      <Typography variant="h6"> College </Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => setAnchorEl(null)}
                      component={Link}
                      to={process.env.PUBLIC_URL + "/About"}
                    >
                      <ListItemIcon>
                        <PersonIcon />
                      </ListItemIcon>
                      <Typography variant="h6"> About</Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => setAnchorEl(null)}
                      component={Link}
                      to={process.env.PUBLIC_URL + "/Personal"}
                    >
                      <ListItemIcon>
                        <BookmarksIcon />
                      </ListItemIcon>
                      <Typography variant="h6"> Personal </Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : ( */}
            <div style={{ marginRight: "2rem" }}>
              <Button
                variant="text"
                color="default"
                component={Link}
                to={process.env.PUBLIC_URL + "/"}
                // onClick={() => setAnchorEl(null)}
              >
                Home
              </Button>
              <Button
                variant="text"
                color="default"
                component={Link}
                // onClick={() => setAnchorEl(null)}
                to={process.env.PUBLIC_URL + "/Directions"}
              >
                Directions
              </Button>
              <Button
                variant="text"
                color="default"
                component={Link}
                // onClick={() => setAnchorEl(null)}
                to={process.env.PUBLIC_URL + "/AllWorkshops"}
              >
                AllWorkshops
              </Button>
              <Button
                variant="text"
                color="default"
                component={Link}
                // onClick={() => setAnchorEl(null)}
                to={process.env.PUBLIC_URL + "/EditWorkshop"}
              >
                <BookmarksIcon />
                EditWorkshop
              </Button>
            </div>
            {/* } */}
          </Toolbar>
        </AppBar>
        <Switch>
          <Route
            exact
            path={process.env.PUBLIC_URL + "/"}
            component={AddProject}
          />
          <Route
            exact
            path={process.env.PUBLIC_URL + "/Directions"}
            component={Directions}
          />
          <Route
            exact
            path={process.env.PUBLIC_URL + "/AllWorkshops"}
            component={AllWorkshops}
          />
          <Route
            exact
            path={process.env.PUBLIC_URL + "/EditWorkshop"}
            component={EditWorkshop}
          />
        </Switch>
      </BrowserRouter>
      {/* </HideOnScroll> */}
    </div>
  );
};

export default Header;
