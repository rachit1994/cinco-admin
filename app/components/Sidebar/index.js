import Drawer from '@material-ui/core/Drawer';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const styles = theme => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
    },
    toolbar: {
        minHeight: 100
    },
  });

const Sidebar = ({ classes }) => (
    <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
        paper: classes.drawerPaper,
        }}
    >
        <div className={classes.toolbar} />
        <List>
            <ListItem button>
                <Link to="/addNewCompanies">
                    Add new Companies
                </Link>
            </ListItem>
            <ListItem button>
                <Link to="/addPromotions">
                    Add new Promotions
                </Link>
            </ListItem>
            <ListItem button>
                <Link to="/manageUsers">
                    Manage Users
                </Link>
            </ListItem>

        </List>
    </Drawer>
);

export default withStyles(styles)(Sidebar);