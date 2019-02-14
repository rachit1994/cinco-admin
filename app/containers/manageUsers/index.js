import { deleteUser, getUsersList, searchUserAction, updateUser } from './actions';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectUsers } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { selectLogin } from 'containers/LoginPage/selectors';

/* eslint-disable react/prefer-stateless-function */
export class ManageUsersPage extends React.PureComponent {
    constructor(props) {
        super(props);
        console.log('token>>', this.props.loginResult);
        this.state = {
            search: '',
            email: null,
            role: null,
            password: null,
            open: false,
            deleteUserId: ''
        };
        this.props.getUsersList(this.props.loginResult.token);
    }

    handleChange = name => event => {
        if(event.target.value.trim().length > 0) {
            this.setState({
                [name]: event.target.value.trim(),
            });
        }
        
    };

    searchUser = () => {
        this.props.searchUser(this.state.search, this.props.loginResult.token);
    }

    updateUser = (id) => {
        console.log('update user', id, this.state);
        const update = {};
        Object.keys(this.state).map((state) => {
            if(this.state[state] && this.state[state].length > 0) {
                update[state] = this.state[state];
            }
        })
        this.props.updateUser(id, update, this.props.loginResult.token);
    }

    deleteUser = (id) => {
        console.log('delete user', id, this.state);
        this.setState({ deleteUserId: id });
        this.openDialog();
    }
    
    handleClose = () => {
        this.setState({ open: false });
    }

    openDialog = () => {
        this.setState({ open: true });
    }

    acceptedDelete = () => {
        this.props.deleteUser(this.state.deleteUserId);
    }

    render() {
        return(
            <div>
                <div style={{ display: 'flex' }}>
                    <TextField
                        onChange={this.handleChange('search')}
                    />
                    <Button
                        variant="outlined"
                        onClick={() => this.searchUser()}
                        style={{ padding: '2px 15px' }}
                    >
                        Search
                    </Button>
                </div>
                <div style={{ border: 'solid 1px', margin: '15px 0px', padding: '15px 0px' }}>
                    {
                        this.props.users && this.props.users.length > 0 &&
                        this.props.users.map((user) => (
                            <span key={user.id}>
                                <List key={user.id}>
                                    <ListItem>
                                        <TextField
                                            label="email"
                                            value={this.state.email || user.email}
                                            fullWidth
                                            onChange={this.handleChange('email')}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <TextField
                                            label="password"
                                            value={this.state.password || user.password}
                                            fullWidth
                                            onChange={this.handleChange('password')}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <Select
                                            value={this.state.role || user.role}
                                            onChange={this.handleChange('roleUpdate')}
                                        >
                                            <MenuItem value="user">User</MenuItem>
                                            <MenuItem value="admin">Admin</MenuItem>
                                        </Select>
                                    </ListItem>
                                </List>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => this.updateUser(user.id)}
                                >
                                    Update
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => this.deleteUser(user.id)}
                                >
                                    Delete User
                                </Button>
                            </span>
                        ))
                    }
                </div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogTitle>Do you really want to delete this user?</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={this.acceptedDelete} color="primary" autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    users: makeSelectUsers(),
    loginResult: selectLogin(),
});

export function mapDispatchToProps(dispatch) {
    return {
        getUsersList: (token) => dispatch(getUsersList(token)),
        searchUser: (text, token) => dispatch(searchUserAction(text, token)),
        updateUser: (id, update, token) => dispatch(updateUser(id, update, token)),
        deleteUser: (id) => dispatch(deleteUser(id))
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'users', reducer });
const withSaga = injectSaga({ key: 'users', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(ManageUsersPage)
