import { usersEcho } from "./helpers/echo";
import { userCharlie } from "./helpers/charlie";
import "./App.css";
import firebase from "firebase";
import { useState, useEffect, Fragment } from "react";
import AppNavBar from "./components/header/AppNavBar";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { ROOT_ROUTE, HOME_ROUTE, ABOUT_US_ROUTE, ALPHA_TIME_ROUTE } from "./constants";
import People from "./components/people/People";
import AlphaTime from "./components/alpha-time/alpha-time";

const useStyles = makeStyles((theme) => ({
  appContent: {
    padding: 30,
    height: "100%",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Fragment>
      <BrowserRouter>
        <AppNavBar />
        <Box className={classes.appContent}>
          <Switch>
            <Route exact path={ROOT_ROUTE}>
              <Redirect to={HOME_ROUTE} />
            </Route>
            <Route exact path={HOME_ROUTE}>
              <People />
            </Route>
            <Route exact path={ALPHA_TIME_ROUTE}>
              <AlphaTime />
            </Route>
            <Route exact path={ABOUT_US_ROUTE}>
              <People />
            </Route>
          </Switch>
        </Box>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
