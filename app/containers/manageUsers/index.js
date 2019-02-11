import { deleteUser, getUsersList, searchUserAction, updateUser } from './actions';

import Button from '@material-ui/core/Button';
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
            emailUpdate: '',
            roleUpdate: '',
            passwordUpdate: '',
        };
        this.props.getUsersList(this.props.loginResult.token);
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    searchUser = () => {
        this.props.searchUser(this.state.search, this.props.loginResult.token);
    }

    updateUser = (id) => {
        console.log('update user', id, this.state);
    }

    deleteUser = (id) => {
        console.log('delete user', id, this.state);
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
                            <span>
                                <List key={user.id}>
                                    <ListItem>
                                        <TextField
                                            label="email"
                                            value={user.email}
                                            fullWidth
                                            onChange={this.handleChange('emailUpdate')}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <TextField
                                            label="password"
                                            value={user.password}
                                            fullWidth
                                            onChange={this.handleChange('passwordUpdate')}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <Select
                                            value={user.role}
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
                                    onClick={(user) => this.updateUser(user.id)}
                                >
                                    Update
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={(user) => this.deleteUser(user.id)}
                                >
                                    Delete User
                                </Button>
                            </span>
                        ))
                    }
                </div>
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
        updateUser: (id, update) => dispatch(updateUser(id, update)),
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
