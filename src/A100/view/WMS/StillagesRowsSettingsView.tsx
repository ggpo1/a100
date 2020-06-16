import React from 'react';
import WmsAPI from './../../api/WmsAPI';
import queryString from 'query-string';
import '../../css/WMS/StillagesRowsSettingsView.css';
import ISysRow from '../../model/ISysRow';
import IWmsRow from '../../model/IWmsRow';
import src from '*.bmp';

interface IStillagesRowsSettingsViewProps {
    match: any,
    location: any
}

interface IDTORow {
    unit: string,
    rows: Array<{
        wmsRow: IWmsRow,
        sysRow: ISysRow
    }>
}

interface IStillagesRowsSettingsViewState {
    resoultID: number,
    selectedUnit: number,
    units: Array<string>,
    sysRows: Array<ISysRow>,
    wmsRows: Array<IWmsRow>,
    wmsValues: Array<IDTORow>
}

export default class StillagesRowsSettingsView extends React.Component<IStillagesRowsSettingsViewProps, IStillagesRowsSettingsViewState> {
    constructor(props) {
        super(props);
        let url = this.props.location.search;
        let urlParams = queryString.parse(url);

        this.state = {
            resoultID: parseInt(urlParams['resoultID']!.toString()),
            selectedUnit: 0,
            units: [],
            sysRows: [],
            wmsRows: [],
            wmsValues: []
        }

    }

    public addressationChange = (sysRow: ISysRow, newValue: string, index: number) => {
        const { wmsValues, selectedUnit } = this.state;
        wmsValues[selectedUnit].rows[index].wmsRow.wmsRow = newValue;
        this.setState({ wmsValues });
    }

    public saveButtonClick = () => {
        (async () => {
            // let valid = this.state.wmsValues.filter(el => el.wmsRow.wmsRow.length !== 0).map(el => el.wmsRow);
            let valid = this.state.wmsValues[this.state.selectedUnit].rows.filter(el => el.wmsRow.wmsRow.length !== 0).map(el => el.wmsRow);
            // console.log(valid);
            await WmsAPI.setAddressingRows(valid);
        })();
    }

    componentDidMount() {
        document.title = 'Таблица адресации';

        (async () => {
            let units = await WmsAPI.addressingGetUnitsByResoult(this.state.resoultID);
            let sysRows = await WmsAPI.getSysRows(this.state.resoultID);
            let wmsRows = await WmsAPI.getWmsRows(this.state.resoultID);

            // console.log(wmsRows);

            let wmsValues: Array<IDTORow> = [];

            units.forEach((unit, i) => {

                let _sRs = sysRows.filter(sRow => sRow.mapUnit === unit);
                let _wRs = wmsRows.filter(wRow => wRow.mapUnit === unit);

                // if (unit === '5 Техноавиа Екатеринбург') {
                //     console.log(_sRs);
                //     console.log(_wRs);
                // }

                let rows: Array<{
                    wmsRow: IWmsRow,
                    sysRow: ISysRow
                }> = [];
                _sRs.forEach((sR => {
                    let temp = _wRs.filter(el => el.a100Row === sR.row)[0];
                    if (temp === undefined)
                    temp = {
                            id: -1,
                            a100Row: sR.row,
                            wmsRow: '',
                            resoultID: this.state.resoultID,
                            mapUnit: unit
                        };

                    rows.push({
                        sysRow: sR,
                        wmsRow: temp
                    });
                }));

                wmsValues.push({
                    unit: unit,
                    rows: rows
                });
            });
            console.log(wmsValues);

            sysRows.forEach((sysRow, i) => {
                // let wmsField = wmsRows.filter(wmsRow => wmsRow.a100Row === sysRow.row)[0];
                // if (wmsField === undefined)
                //     wmsField = {
                //         id: -1,
                //         a100Row: sysRow.row,
                //         wmsRow: '',
                //         resoultID: this.state.resoultID,
                //         mapUnit: units[this.state.selectedUnit]
                //     };
                // wmsValues[this.state.selectedUnit] = [];
                // wmsValues[this.state.selectedUnit].push({
                //     wmsRow: wmsField,
                //     sysRow: sysRow
                // });

                // wmsValues[i].wmsRow = wmsField !== undefined ? wmsField : '';
                // wmsValues[i].sysRow = sysRow;



            });

            this.setState({ units, sysRows, wmsRows, wmsValues });
        })();
    }

    render() {
        const { units, sysRows, wmsRows, wmsValues, selectedUnit } = this.state;

        let _sysRows = sysRows.filter(el => el.mapUnit === units[selectedUnit]);

        let unitsOptions: Array<JSX.Element> = [];
        units.forEach((unit, i) => {
            unitsOptions.push(
                <option key={`unitOption_${i}`} value={i}>{unit}</option>
            );
        });

        let valueRowsList: Array<JSX.Element> = [];

        valueRowsList.push(
            <div key={`valueRow_-1`} className={'value-row'}>
                <input className={'header-cell'} type="text" value={'Ряд в А100'} readOnly />
                <input className={'header-cell'} type="text" value={'Желаемый ряд'} readOnly />
            </div>
        );

        _sysRows.forEach((sysRow, i) => {
            // let wmsField = wmsRows.filter(wmsRow => wmsRow.a100Row === sysRow.row && wmsRow.mapUnit === units[selectedUnit])[0];
            valueRowsList.push(
                <div key={`valueRow_${i}`} className={'value-row'}>
                    <input className={'sys-cell'} type="text" value={sysRow.row} readOnly />
                    <input
                        onChange={(e) => this.addressationChange(sysRow, e.target.value, i)}
                        className={'wms-cell'}
                        type="text"
                        value={wmsValues[selectedUnit].rows[i].wmsRow.wmsRow}
                        placeholder={'поставьте желаемый номер ряда'}
                    />
                </div>
            );
        });

        return (
            <div className={'rows-wrapper'}>
                <div className={'units-selector-wrapper'}>
                    <select onChange={(e) => this.setState({ selectedUnit: parseInt(e.target.value) })} className={'wms-units-address-view-select'}>
                        {unitsOptions}
                    </select>
                </div>
                <div className={'rows-table'}>
                    {valueRowsList}
                    <div className={'value-row addressation-save-button-wrapper'}>
                        <button onClick={this.saveButtonClick}>сохранить</button>
                    </div>
                </div>
            </div>
        );
    }
}