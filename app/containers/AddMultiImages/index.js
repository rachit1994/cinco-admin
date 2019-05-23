import React from 'react';
import FileBase64 from 'react-file-base64';
import { getAllCompanies } from './actions';
import { selectLogin } from 'containers/LoginPage/selectors';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectCompanies } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { Select } from 'react-material-ui-super-select';

export class AddMultiImages extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: null
        }
    }

    componentDidMount() {
        this.props.getAllCompanies(this.props.loginResult.token);
    }

    render() {
        console.log('props companies', this.props.companies);
        return (
            <div>
                <Select
                    label='Select Companies'
                    options={this.props.companies || [{id: '0', label: ''}]}
                    handleChange={value => this.setState({ value })}
                    handleClearValue={() => this.setState({ value: null })}
                    selectedValue={this.state.value}
                />                
                <FileBase64
                    multiple={ true }
                    onDone={ this.onDrop }
                />
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    companies: makeSelectCompanies(),
    loginResult: selectLogin(),
});

export function mapDispatchToProps(dispatch) {
    return {
        getAllCompanies: (token) => {
            dispatch(getAllCompanies(token));
        },
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'multiImages', reducer });
const withSaga = injectSaga({ key: 'multiImages', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(AddMultiImages)
