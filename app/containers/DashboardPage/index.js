import { Route, withRouter } from 'react-router-dom';

import AddNewCompaniesPage from 'containers/AddNewCompaniesPage/Loadable';
import Appbar from 'components/Appbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import FeaturePage from 'containers/FeaturePage/Loadable';
import Grid from '@material-ui/core/Grid';
import { Helmet } from 'react-helmet';
import HomePage from 'containers/HomePage/Loadable';
import ManageUsersPage from 'containers/manageUsers/Loadable';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Sidebar from 'components/Sidebar';
import UploadExcel from 'containers/UploadExcel/Loadable';
import AddMultiImages from 'containers/AddMultiImages/Loadable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectLogin } from 'containers/LoginPage/selectors';
import { withStyles } from '@material-ui/core/styles';
import AddNewPromotions from 'containers/AddNewPromotions/Loadable';
import Playstores from 'containers/Playstores/Loadable';

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
  toolbar: theme.mixins.toolbar,
});

export class DashboardPage extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.authentication();
    }

    authentication() {
        console.log('authentication', this.props.loginResult);
        if (this.props.loginResult && this.props.loginResult.user && this.props.loginResult.user.id) {
            this.props.history.push('/addNewCompanies');
        } else {
            this.props.history.push('/login');
        }
    }

    render() {
        const user = this.props.loginResult.user || { name: '' };
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <Appbar user={user}/>
                <Sidebar />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Grid
                        container
                        spacing={16}
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item>
                            <Paper elevation={1} style={{ padding: 50, textAlign: 'center' }}>
                                <Route path="/addNewCompanies" component={AddNewCompaniesPage} />
                                <Route path="/manageUsers" component={ManageUsersPage} />
                                <Route path="/addMultipleCompanies" component={UploadExcel} />
                                <Route path="/addImages" component={AddMultiImages} />
                                <Route path="/addPromotions" component={AddNewPromotions} />
                                <Route path='/playstores' component={Playstores} />
                            </Paper>
                        </Grid>
                    </Grid>
                </main>
            </div> 
        )
    }
}

const mapStateToProps = createStructuredSelector({
    loginResult: selectLogin(),
});

export default withStyles(styles)(
    withRouter(
        connect(mapStateToProps)
        (DashboardPage)
    )
);
// export default DashboardPage;
