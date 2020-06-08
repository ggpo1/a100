import React from 'react';
import queryString from 'query-string';
import LogHandler from './../../../LogHandler/LogHandler';
import LogType from './../../model/enums/LogType';
import '../../css/WMS/DashboardView.css';

interface IDashboardViewProps {
    match: any,
    location: any
}

interface IDashboardViewState {
    resoultID: number
}

export default class DashboardView extends React.Component<IDashboardViewProps, IDashboardViewState> {

    constructor(props: IDashboardViewProps) {
        super(props);
        let url = this.props.location.search;
        let urlParams = queryString.parse(url);

        try {
            this.state = {
                resoultID: parseInt(urlParams['resoultID']!.toString())
            }
            LogHandler.handle('AddressSettingsView', LogType.LOG, 'url params parsed successfully!');
        } catch (ex) {
            LogHandler.handle('AddressSettingsView', LogType.ERROR, 'error while parsing parameters or they are empty!');
        }
    }

    render() {
        return (<div className={'dashboard-wrapper'}>
            <div className={'dashboard-pins-wrapper'}>
                <a href={`/wms/adresssettings?resoultID=${this.state.resoultID}`}>Дополнительные поля</a>
            </div>

        </div>);
    }
}