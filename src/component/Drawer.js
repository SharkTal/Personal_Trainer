import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import SportsHandballIcon from '@material-ui/icons/SportsHandball';

import Customerlist from './Customerlist';
import Trainings from './Trainings';
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  drawerPaper: { width: 'inherit' },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary
  }
}))

const PersistentDrawerLeft = () => {
  const classes = useStyles();
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Drawer
          style={{ width: '220px' }}
          variant="persistent"
          anchor="left"
          open={true}
          classes={{ paper: classes.drawerPaper }}
        >
          <List>
            <Link to="/" className={classes.link}>{''}
              <ListItem>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary={'Customers'} />{''}
              </ListItem>
            </Link>
            <Link to="/trainings" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <SportsHandballIcon />
                </ListItemIcon>
                <ListItemText primary={'Trainings'} />
              </ListItem>
            </Link>
          </List>
        </Drawer>
       <Switch>
         <Route exact path="/"> <Customerlist /></Route>
         <Route exact path="/trainings"><Trainings /></Route>
       </Switch>
      </div>
    </Router>

  )
}
export default PersistentDrawerLeft;