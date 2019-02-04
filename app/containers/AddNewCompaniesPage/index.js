import Button from '@material-ui/core/Button';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createNewCompany } from './actions';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from 'containers/LoginPage/reducer';
import saga from './saga';
import { selectLogin } from 'containers/LoginPage/selectors';

/* eslint-disable react/prefer-stateless-function */
export class AddNewCompaniesPage extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            latitude: '',
            longitude: '',
            icon: '',
            title: '',
            description: '',
            locationType: '',
            shortAddress: '',
            phone: '',
            address: '',
            website: '',
        };
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        return (
            <form>
                {
                    Object.keys(this.state).map((title, i) => (
                        <TextField
                            label={title}
                            margin="normal"
                            fullWidth
                            autoFocus={i == 0 ? true : false}
                            type="text"
                            key={title + i}
                            onChange={this.handleChange(title)}
                        />
                    ))
                }
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.props.onSubmitForm(this.state, this.props.loginResult.token)}
                >
                    Submit
                </Button>
            </form>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    loginResult: selectLogin(),
});

export function mapDispatchToProps(dispatch) {
    return {
        onSubmitForm: (state, token) => {
            console.log('calling button');
            dispatch(createNewCompany(state, token));
        },
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'login', reducer });
const withSaga = injectSaga({ key: 'companies', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(AddNewCompaniesPage)
