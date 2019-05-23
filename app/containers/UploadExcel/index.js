import Button from '@material-ui/core/Button';
import MUIDataTable from "mui-datatables";
import React from 'react';
import TextField from '@material-ui/core/TextField';
import _ from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import readXlsxFile from 'read-excel-file'
import reducer from 'containers/LoginPage/reducer';
import saga from './saga';
import { uploadCompanies } from './actions';

export class UploadExcel extends React.PureComponent {
    constructor(props) {
        super(props);
        this.SheetJSFT = [
            "xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
        ].map(function(x) { return "." + x; }).join(",");
        this.state = {
            companies: [],
            rawData: []
        }
        this.titles = [];
        this.translate = {
            CATEGORIA: 'locationType',
            NOME: 'title',
            DISTRITO: 'district',
            OBS: 'obs',
            TEXTO: 'description',
            IMAGEM: 'pictures',
            MORADA: 'address',
            TELEFONE: 'phone',
            EMAIL: 'email',
            SITE: 'website',
            'HORÁRIOS | DATAS': 'availability',
            BILHETEIRA: 'ticket',
            GPS: 'coordinates',
            ENVIADO: 'sent',
            APROVADO: 'approved',
            status: 'status'
        };
    }

    handleChange = (input) => {
        let output = [];
        let raw = [];

        readXlsxFile(input.files[0]).then((rows) => {
            raw = rows;
            output = this.changeTable(rows);
        }).then(() => {
            // this.props.uploadMultiples()
            // this.setState({ companies: output, rawData: raw });
            this.props.uploadCompanies(output);
        })
    }

    changeTable = (rows) => {
        let output = [];
        if(rows.length > 0 && rows[0].length > 0) {
            for(let i = 1; i < rows.length; i++) {
                let toPush = {};
                for(let j = 0; j<rows[0].length; j++) {
                    if(rows[0][j] && rows[0][j].toLowerCase() != 'gps') {
                        toPush[this.translate[rows[0][j]]] = rows[i][j] == 'n/a' ? null : rows[i][j];
                    } else if(rows[0][j] && rows[0][j].toLowerCase() == 'gps') {
                        // toPush[rows[0][j]] = rows[i][j].includes(',') ? rows[i][j].split(',') : rows.split('|');
                        if(rows[i][j] && rows[i][j] != null && rows[i][j] != 'n/a' && typeof rows[i][j] == 'string') {
                           toPush['location'] = {};
                            toPush['location'][this.translate[rows[0][j]]] = rows[i][j].includes(',') ? rows[i][j].split(',').map(Number) : rows[i][j].includes('|') ? rows[i][j].split('|').map(Number) : rows[i][j].split('/').map(Number);
                            toPush['location'][this.translate[rows[0][j]]] = toPush['location'][this.translate[rows[0][j]]].reverse();
                            if((toPush['location'][this.translate[rows[0][j]]].length == 0) || !toPush['location'][this.translate[rows[0][j]]][0] || !toPush['location'][this.translate[rows[0][j]]][1]) {
                                toPush = {};
                            }
                        } else {
                            toPush = {}
                        }
                    }
                }
                if(
                    toPush.location &&
                    toPush.location.coordinates &&
                    toPush.location.coordinates.length > 0
                ) {
                    output.push(toPush);
                }
            }
        }
        // output = _.uniqWith(output, (a, b) => {
        //     return a.location.coordinates[0] == b.location.coordinates[0] && a.location.coordinates[1] == b.location.coordinates[1]
        // })
        output = _.uniq(output);
        return output;
    }

    render() {
        return(
            <div>
                <div>
                    <input
                        accept={this.SheetJSFT}
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={(e) => this.handleChange(e.target)}
                    />
                </div>
                {/*
                    this.state.rawData && this.state.rawData.length > 0 &&
                    <MUIDataTable
                        title={"Employee List"}
                        data={this.state.rawData.splice(1) || []}
                        columns={this.state.rawData[0] || []}
                        options={{
                            resizableColumns: true
                        }}
                    /> */
                }
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
});

export function mapDispatchToProps(dispatch) {
    return {
        uploadCompanies: arr => {
            dispatch(uploadCompanies(arr));
        },
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'excel', reducer });
const withSaga = injectSaga({ key: 'excel', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
  )(UploadExcel);