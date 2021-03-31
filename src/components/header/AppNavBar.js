import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

import { HOME_ROUTE, ABOUT_US_ROUTE, ALPHA_TIME_ROUTE } from "../../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: "black",
  },
}));

const AppNavBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
          <NavLink
              to={HOME_ROUTE}
              className="link"
            >
              Alpha
            </NavLink>
          </Typography>
          <Button>
            <NavLink
              to={HOME_ROUTE}
              className="link"
              activeClassName="selected"
            >
              People
            </NavLink>
          </Button>
          <Button>
            <NavLink
              to={ALPHA_TIME_ROUTE}
              className="link"
              activeClassName="selected"
            >
              Alpha Time
            </NavLink>
          </Button>
          <Button>
            <NavLink
              to={ABOUT_US_ROUTE}
              className="link"
              activeClassName="selected"
            >
              About Us
            </NavLink>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AppNavBar;
