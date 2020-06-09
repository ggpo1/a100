import React, { useState } from 'react';
import queryString from 'query-string';
import LogHandler from './../../../LogHandler/LogHandler';
import LogType from './../../model/enums/LogType';
import '../../css/WMS/DashboardView.css';
import WmsAPI from './../../api/WmsAPI';
import downArrow from '../../assets/downArrow.png';

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

    componentDidMount() {
        (async () => {
            await WmsAPI.getGlobalsatBangs(this.state.resoultID);
        })();
    }

    render() {
        return (
            <div className={'dashboard-wrapper'}>
                <div className={'dashboard-pins-wrapper'}>
                    <div id="dashboard-pins-grid">
                        <DashboardPin title={'Вибрации'} />
                        <DashboardPin title={'Отклонения'} />
                        <DashboardPin title={'Техника'} />
                        <DashboardPin title={'События'} />
                    </div>
                    {/* <a href={`/wms/adresssettings?resoultID=${this.state.resoultID}`}>Дополнительные поля</a> */}
                    <div className={'down-arrow-wrapper'}>
                        <img src={downArrow} alt=""/>
                    </div>
                </div>
            </div>
        );
    }
}

interface IDashboardPinProps {
    title: string,
}

function DashboardPin(props: IDashboardPinProps) {
    const [title] = useState<string>(props.title);

    return (
        <div className={'dashboard-pin'}>
            <div className={'pin-title'}>
                <button className={'settings-button'} style={{}}>настройка</button>
            </div>
            <div className={'pin-body'}>
                {title}
            </div>
        </div>
    );
}