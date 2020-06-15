import React from 'react';
import WmsAPI from './../../api/WmsAPI';
import queryString from 'query-string';
import '../../css/WMS/StillagesRowsSettingsView.css';
import ISysRow from '../../model/ISysRow';
import IWmsRow from '../../model/IWmsRow';

interface IStillagesRowsSettingsViewProps {
    match: any,
    location: any
}

interface IStillagesRowsSettingsViewState {
    resoultID: number,
    selectedUnit: number,
    units: Array<string>,
    sysRows: Array<ISysRow>,
    wmsRows: Array<IWmsRow>,
    wmsValues: Array<{
        wmsRow: IWmsRow,
        sysRow: ISysRow
    }>
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
        const { wmsValues } = this.state;
        wmsValues[index].wmsRow.wmsRow = newValue;
        this.setState({ wmsValues });
    }

    public saveButtonClick = () => {
        (async () => {
            let valid = this.state.wmsValues.filter(el => el.wmsRow.wmsRow.length !== 0).map(el => el.wmsRow);
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

            let wmsValues: Array<{
                wmsRow: IWmsRow,
                sysRow: ISysRow
            }> = [];
            sysRows.forEach((sysRow, i) => {
                let wmsField = wmsRows.filter(wmsRow => wmsRow.a100Row === sysRow.row)[0];
                if (wmsField === undefined)
                    wmsField = {
                        id: -1,
                        a100Row: sysRow.row,
                        wmsRow: '',
                        resoultID: this.state.resoultID,
                        mapUnit: units[this.state.selectedUnit]
                    };
                wmsValues[i] = {
                    wmsRow: wmsField,
                    sysRow: sysRow
                }

                // wmsValues[i].wmsRow = wmsField !== undefined ? wmsField : '';
                // wmsValues[i].sysRow = sysRow;
            });

            this.setState({ units, sysRows, wmsRows, wmsValues });
        })();
    }

    render() {
        const { units, sysRows, wmsRows, wmsValues } = this.state;

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

        sysRows.forEach((sysRow, i) => {
            let wmsField = wmsRows.filter(wmsRow => wmsRow.a100Row === sysRow.row)[0];
            valueRowsList.push(
                <div key={`valueRow_${i}`} className={'value-row'}>
                    <input className={'sys-cell'} type="text" value={sysRow.row} readOnly />
                    <input 
                        onChange={(e) => this.addressationChange(sysRow, e.target.value, i)} 
                        className={'wms-cell'} 
                        type="text" 
                        value={wmsValues[i].wmsRow.wmsRow}
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