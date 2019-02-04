import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import saga from './saga';
import reducer from './reducer';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { login } from './actions';

/* eslint-disable react/prefer-stateless-function */
export class LoginPage extends React.PureComponent {
    state = {
        email: '',
        password: ''
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    submit() {
        this.props.onSubmitForm(this.state);
    }

    render() {
        return (
            <Grid
                container
                spacing={16}
                direction="column"
                justify="center"
                alignItems="center"
                style={{ height: '100vh' }}
            >
                <Grid item>
                    <Paper elevation={1} style={{ padding: 50, textAlign: 'center' }}>
                        <TextField
                            label="Email"
                            margin="normal"
                            fullWidth
                            autoFocus
                            onChange={this.handleChange('email')}
                        />
                        <TextField
                            label="Password"
                            margin="normal"
                            fullWidth
                            type="password"
                            onChange={this.handleChange('password')}
                        />
                        <Button variant="contained" color="primary" onClick={() => this.submit()}>
                            Submit
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = createStructuredSelector({
});

export function mapDispatchToProps(dispatch) {
    return {
        onSubmitForm: state => {
            dispatch(login(state.email, state.password));
        },
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'login', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
  )(LoginPage);

