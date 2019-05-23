import React from 'react';
import _ from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import readXlsxFile from 'read-excel-file';
import { selectLogin } from 'containers/LoginPage/selectors';
import { getAllCompanies } from 'containers/AddMultiImages/actions';
import { makeSelectCompanies } from 'containers/AddMultiImages/selectors';
import TextField from '@material-ui/core/TextField';
import { addNewPromotion } from './actions';
import reducer from './reducer';
import saga from './saga';
import { Select } from 'react-material-ui-super-select';
import Button from '@material-ui/core/Button';

export class AddNewPromotions extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            from: null,
            to: null,
            text: null,
            discount: null
        };
    }

    componentWillMount() {
        console.log('>>>>');
        this.props.getAllCompanies(this.props.loginResult.token);
    }

    render() {
        return (
            <div>
                <Select
                    label='Select Companies'
                    options={this.props.companies || [{id: '0', label: ''}]}
                    handleChange={value => this.setState({ value })}
                    handleClearValue={() => this.setState({ value: null })}
                    selectedValue={this.state.value}
                />
                <TextField
                    label="from"
                    type="datetime-local"
                    defaultValue={new Date()}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={event => this.setState({ from: event.target.value })}
                />
                <TextField
                    label="to"
                    type="datetime-local"
                    defaultValue={new Date().toISOString()}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={event => this.setState({ to: event.target.value })}
                />
                <TextField
                    onChange={event => this.setState({ text: event.target.value })}
                />
                <TextField
                    type="number"
                    onChange={event => this.setState({ discount: event.target.value })}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.props.onSubmitForm(this.state, this.props.loginResult.token)}
                >
                    Submit
                </Button>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    loginResult: selectLogin(),
    companies: makeSelectCompanies(),
});

export function mapDispatchToProps(dispatch) {
    return {
        getAllCompanies: (token) => {
            dispatch(getAllCompanies(token));
        },
        onSubmitForm: (state, token) => {
            console.log('calling button');
            dispatch(addNewPromotion(state, token));
        },
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'newPromotion', reducer });
const withSaga = injectSaga({ key: 'newPromotion', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(AddNewPromotions);