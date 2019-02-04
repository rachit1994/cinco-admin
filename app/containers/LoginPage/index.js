import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import { Helmet } from 'react-helmet';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { login } from './actions';
import reducer from './reducer';
import saga from './saga';
import { selectLogin } from './selectors';
import { withRouter } from 'react-router-dom';

/* eslint-disable react/prefer-stateless-function */
export class LoginPage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }
    
    componentDidUpdate(prevProps) {
       if(this.props.loginResult && this.props.loginResult.user && this.props.loginResult.user.id) {
            this.props.history.push('/')
       }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

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
                        <form>
                            <TextField
                                label="Email"
                                margin="normal"
                                fullWidth
                                autoFocus
                                type="email"
                                onChange={this.handleChange('email')}
                            />
                            <TextField
                                label="Password"
                                margin="normal"
                                fullWidth
                                type="password"
                                onChange={this.handleChange('password')}
                            />
                            <Button variant="contained" color="primary" onClick={() => this.props.onSubmitForm(this.state)}>
                                Submit
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    loginResult: selectLogin(),
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

export default withRouter(
    compose(
        withReducer,
        withSaga,
        withConnect,
    )(LoginPage)
);
