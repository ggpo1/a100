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
    wmsRows: Array<IWmsRow>
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
            wmsRows: []
        }

    }

    componentDidMount() {
        document.title = 'Таблица адресации';

        (async () => {
            let units = await WmsAPI.addressingGetUnitsByResoult(this.state.resoultID);
            let sysRows = await WmsAPI.getSysRows(this.state.resoultID);
            let wmsRows = await WmsAPI.getWmsRows(this.state.resoultID);

            this.setState({ units, sysRows, wmsRows });
        })();
    }

    render() {
        const { units, sysRows, wmsRows } = this.state;

        let unitsOptions: Array<JSX.Element> = [];
        units.forEach((unit, i) => {
            unitsOptions.push(
                <option key={`unitOption_${i}`} value={i}>{unit}</option>
            );
        });



        let valueRowsList: Array<JSX.Element> = [];
        sysRows.forEach((sysRow, i) => {
            let wmsField = wmsRows.filter(wmsRow => wmsRow.a100Row === sysRow.row)[0];
            valueRowsList.push(
                <div key={`valueRow_${i}`} className={'value-row'}>
                    <input className={'sys-cell'} type="text" value={sysRow.row} readOnly />
                    <input className={'wms-cell'} type="text" value={wmsField !== undefined ? wmsField.wmsRow : ''} />
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
                </div>
            </div>
        );
    }
}