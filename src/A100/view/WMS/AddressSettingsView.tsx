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
import AddNewWmsFieldDTO from './../../model/DTO/AddNewWmsFieldDTO';


interface IAddressSettingsViewState {
    resoultID: number,
    unitNamesList: Array<string>,
    sensors: Array<GlobalsatSensor>,
    wmsFields: Array<WmsFields>,
    selectedUnit: number,
    isSensorModal: boolean,
    selectedSensor: number,
    modalFieldNameValue: string,
    modalFieldValue: string
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
                selectedSensor: -1,
                modalFieldNameValue: '',
                modalFieldValue: ''
            }
            LogHandler.handle('AddressSettingsView', LogType.LOG, 'url params parsed successfully!');
        } catch (ex) {
            LogHandler.handle('AddressSettingsView', LogType.ERROR, 'error while parsing parameters or they are empty!');
        }

        Emit.Emitter.addListener('setSensorsAddressEmit', (newSensors: Array<GlobalsatSensor>) => this.setState({ sensors: newSensors }));
        Emit.Emitter.addListener('setWMSUnitNamesEmit', (newUnits: Array<string>) => this.setState({ unitNamesList: newUnits }));
        Emit.Emitter.addListener('setWmsFieldsEmit', (newFields) => this.setState({ wmsFields: newFields }));
        Emit.Emitter.addListener('addNewFieldToSource', this.addNewFieldToSource);
    }

    componentDidMount() {
        (async () => {
            await WmsAPI.getUnitsByResoult(this.state.resoultID);
            await WmsAPI.getResoultSensors(this.state.resoultID);
            await WmsAPI.getSensorsWmsFields(this.state.resoultID);
        })();
    }

    public addNewFieldToSource = (field) => {
        let wmsFields = this.state.wmsFields;
        wmsFields.push(field);
        this.setState({ wmsFields, modalFieldNameValue: '', modalFieldValue: '' });
    }

    public modalAddNewButtonHandler = () => {
        if (this.state.modalFieldNameValue.length !== 0 && this.state.modalFieldValue.length !== 0) {
            let field: AddNewWmsFieldDTO = {
                fieldName: this.state.modalFieldNameValue,
                value: this.state.modalFieldValue,
                sensorID: this.state.sensors[this.state.selectedSensor].sensorID,
                resoultID: this.state.resoultID
            };
            (() => {
                WmsAPI.addField(field);

                setTimeout(async() => {
                    await WmsAPI.getSensorsWmsFields(this.state.resoultID);
                }, 500)
                
            })();
        } else {
            alert('Введите значения!');
        }
    }

    public modalDeleteButtonHandler = (field: any) => {
        (async () => {
            await WmsAPI.removeField(field.id);

            await WmsAPI.getSensorsWmsFields(this.state.resoultID);
        })();
    }

    public modalFieldNameValueHandle(value: string) {
        this.setState({ modalFieldNameValue: value })
    }

    public modalFieldValueHandle(value: string) {
        this.setState({ modalFieldValue: value });
    }

    public unitSelectChange = (value) => {
        this.setState({ selectedUnit: value });
    }

    render() {
        const {
            sensors,
            unitNamesList,
            selectedUnit,
            wmsFields,
            isSensorModal,
            selectedSensor,
            modalFieldNameValue,
            modalFieldValue
        } = this.state;
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

        // blockSensors.length !== 0 && console.log(blockSensors);
        // blockWmsFields.length !== 0 && console.log(blockWmsFields);

        let sensorsBlocks: Array<JSX.Element> = [];
        blockSensors.forEach((el, i) => sensorsBlocks.push(
            <div
                key={`sensorRow_${i}`}
                className={'sensor-row'}
                onClick={() => this.setState({ selectedSensor: i, isSensorModal: true })}
            >{`ряд ${el.row}, место ${el.place1}`}</div>
        ));

        let sensorModal;
        if (isSensorModal) {
            let fields = blockWmsFields.filter(el => el.sensorID === blockSensors[selectedSensor].sensorID);
            let fieldsBlocks: Array<JSX.Element> = [];
            fields.forEach((field, i) => fieldsBlocks.push(
                <div className={'wms-field-row'} key={`field_${i}`}>
                    <input readOnly className={'field-input field-name-input'} type="text" value={field.fieldName} />
                    <input readOnly className={'field-input'} type="text" value={field.value} />
                    <div onClick={() => this.modalDeleteButtonHandler(field)} className={'delete-button'}>x</div>
                </div>));

            let input1Color = modalFieldNameValue.length === 0 ? 'red' : '',
                input2Color = modalFieldValue.length === 0 ? 'red' : '';

            fieldsBlocks.push(
                <div key={'addInputsBlock'} className={'wms-field-row'}>
                    <input style={{ borderColor: input1Color, outlineColor: input1Color }} onChange={(e) => this.modalFieldNameValueHandle(e.target.value)} placeholder={'+ название поля'} type="text" value={this.state.modalFieldNameValue} />
                    <input style={{ borderColor: input2Color, outlineColor: input2Color }} onChange={(e) => this.modalFieldValueHandle(e.target.value)} placeholder={'+ значение по умолчанию'} type="text" value={this.state.modalFieldValue} />
                </div>
            );

            let buttonColor = modalFieldNameValue.length === 0 ? 'red' : modalFieldValue.length === 0 ? 'red' : '';

            fieldsBlocks.push(
                <div key={'addButtonBlock'} className={'wms-field-row'}>
                    <button onClick={this.modalAddNewButtonHandler} className={'modal-add-button'} style={{}}>добавить</button>
                </div>
            );

            sensorModal = [
                <div key={'modalAbsoluteOpacityBlock'} className={'absolute-opacity-block'}></div>,
                <div key={'modalAbsoluteWrapper'} className={'absolute-wrapper'}>
                    <div onClick={() => this.setState({ isSensorModal: false })} className={'modal-closer'} />
                    <div className={'sensor-modal'}>
                        <div className={'modal-title'}>
                            дополнительные поля
                        </div>
                        <div className={'modal-fields'}>
                            {fieldsBlocks}
                        </div>
                    </div>
                    <div onClick={() => this.setState({ isSensorModal: false })} className={'modal-closer'} />
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