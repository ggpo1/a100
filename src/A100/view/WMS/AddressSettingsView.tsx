import React from 'react';
import queryString from 'query-string';
import '../../css/WMS/AddressSettingsView.css';
import LogHandler from './../../../LogHandler/LogHandler';
import LogType from './../../model/enums/LogType';
import WmsAPI from './../../api/WmsAPI';
import DataGrid from './../../components/DataGrid/DataGrid';
import GlobalsatSensor from './../../model/GlobalsatSensor';
import Emit from './../../../MapCore/Data/Emit';
import WmsFields from './../../model/WmsFields';


interface IAddressSettingsViewState {
    resoultID: number,
    unitNamesList: Array<string>,
    sensors: Array<GlobalsatSensor>,
    wmsFields: Array<WmsFields>,
    selectedUnit: number,
    isSensorModal: boolean,
    selectedSensor: number
}

interface IAddressSettingsViewProps {
    match: any
    location: any
}

export default class AddressSettingsView extends React.Component<IAddressSettingsViewProps, IAddressSettingsViewState> {
    constructor(props) {
        super(props);
        let url = this.props.location.search;
        let urlParams = queryString.parse(url);
        try {
            this.state = {
                resoultID: parseInt(urlParams['resoultID']!.toString()),
                unitNamesList: [],
                sensors: [],
                wmsFields: [],
                selectedUnit: 0,
                isSensorModal: false,
                selectedSensor: -1
            }
            LogHandler.handle('AddressSettingsView', LogType.LOG, 'url params parsed successfully!');
        } catch (ex) {
            LogHandler.handle('AddressSettingsView', LogType.ERROR, 'error while parsing parameters or they are empty!');
        }

        Emit.Emitter.addListener('setSensorsAddressEmit', (newSensors: Array<GlobalsatSensor>) => this.setState({ sensors: newSensors }));
        Emit.Emitter.addListener('setWMSUnitNamesEmit', (newUnits: Array<string>) => this.setState({ unitNamesList: newUnits }));
        Emit.Emitter.addListener('setWmsFieldsEmit', (newFields) => this.setState({ wmsFields: newFields }));
    }

    componentDidMount() {
        (async () => {
            await WmsAPI.getUnitsByResoult(this.state.resoultID);
            await WmsAPI.getResoultSensors(this.state.resoultID);
            await WmsAPI.getSensorsWmsFields(this.state.resoultID);
        })();
    }

    public unitSelectChange = (value) => {
        this.setState({ selectedUnit: value });
    }

    render() {
        const { sensors, unitNamesList, selectedUnit, wmsFields, isSensorModal, selectedSensor } = this.state;
        // if (unitNamesList.length !== 0 && sensors.length !== 0) {
        //     console.log(unitNamesList);
        //     console.log(sensors);
        // }

        let unitsOptions: Array<JSX.Element> = [];
        unitNamesList.forEach((unit, i) => {
            unitsOptions.push(
                <option key={`unitOption_${i}`} value={i}>{unit}</option>
            );
        });

        // console.log(wmsFields);

        let blockWmsFields = wmsFields.filter(el => el.unitName === unitNamesList[selectedUnit])
        let blockSensors = sensors.filter(el => el.unitName === unitNamesList[selectedUnit]);

        blockSensors.length !== 0 && console.log(blockSensors);
        blockWmsFields.length !== 0 && console.log(blockWmsFields);

        let sensorsBlocks: Array<JSX.Element> = [];
        blockSensors.forEach((el, i) => sensorsBlocks.push(
            <div
                key={`sensorRow_${i}`}
                className={'sensor-row'}
                onClick={() => this.setState({ selectedSensor: i, isSensorModal: true })}
            >{`Ряд ${el.row}, место ${el.place1}`}</div>
        ));

        let sensorModal;
        if (isSensorModal) {
            let fields = blockWmsFields.filter(el => el.sensorID === blockSensors[selectedSensor].sensorID);
            let fieldsBlocks: Array<JSX.Element> = [];
            fields.forEach(field => fieldsBlocks.push(
                <div key={`field_${field.fieldName}`}>
                    <input type="text" value={field.fieldName} />
                </div>))
            sensorModal = [
                <div className={'absolute-opacity-block'}></div>,
                <div className={'absolute-wrapper'}>
                    <div className={'sensor-modal'}>
                        {fieldsBlocks}
                    </div>
                </div>
            ];
        }

        return (
            <div className={'address-settings-view-wrapper'}>
                <div className={'view-content'}>
                    {/* <DataGrid /> */}
                    <div className={'units-selector-wrapper'}>
                        <select onChange={(e) => this.unitSelectChange(e.target.value)} className={'wms-units-address-view-select'}>
                            {unitsOptions}
                        </select>
                    </div>

                    <div className={'sensors-list-wrapper'}>
                        {sensorsBlocks}
                    </div>
                    {sensorModal}
                </div>
            </div>
        );
    }
}