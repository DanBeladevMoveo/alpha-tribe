import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

import { HOME_ROUTE, ABOUT_US_ROUTE, ALPHA_TIME_ROUTE } from '../../constants';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: 'black',
  },
}));

const AppNavBar = () => {
  const classes = useStyles();
  const history = useHistory();

  const onButtonClick = (path) => {
    history.push(path);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.appBar}>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            Alpha
          </Typography>
          <Button color='inherit' onClick={() => onButtonClick(HOME_ROUTE)}>
            People
          </Button>
          <Button color='inherit' onClick={() => onButtonClick(ALPHA_TIME_ROUTE)}>
            Alpha Time
          </Button>
          <Button
            color='inherit'
            onClick={() => onButtonClick(ABOUT_US_ROUTE)} >
            About Us
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AppNavBar;

