import React, { useState } from 'react';
import queryString from 'query-string';
import LogHandler from './../../../LogHandler/LogHandler';
import LogType from './../../model/enums/LogType';
import '../../css/WMS/DashboardView.css';
import WmsAPI from './../../api/WmsAPI';
import downArrow from '../../assets/downArrow.png';
import upArrow from '../../assets/upArrow.png';

enum PageType {
    PINS,
    LINKS
}

interface IDashboardViewProps {
    match: any,
    location: any
}

interface IDashboardViewState {
    resoultID: number,
    page: PageType
}

export default class DashboardView extends React.Component<IDashboardViewProps, IDashboardViewState> {

    constructor(props: IDashboardViewProps) {
        super(props);
        let url = this.props.location.search;
        let urlParams = queryString.parse(url);

        try {
            this.state = {
                resoultID: parseInt(urlParams['resoultID']!.toString()),
                page: PageType.PINS
            }
            LogHandler.handle('AddressSettingsView', LogType.LOG, 'url params parsed successfully!');
        } catch (ex) {
            LogHandler.handle('AddressSettingsView', LogType.ERROR, 'error while parsing parameters or they are empty!');
        }
    }

    public arrowClick = () => {
        const { page } = this.state;
        if (page === PageType.PINS) this.setState({ page: PageType.LINKS })
        else this.setState({ page: PageType.PINS });
    };

    componentDidMount() {
        document.title = "Dashboard";

        (async () => {
            await WmsAPI.getGlobalsatBangs(this.state.resoultID);
        })();
    }

    render() {
        const { page } = this.state;

        let pageContent;
        if (page === PageType.PINS) {
            pageContent = (
                <div id="dashboard-pins-grid">
                    <DashboardPin title={'Вибрации'} />
                    <DashboardPin title={'Отклонения'} />
                    <DashboardPin title={'Техника'} />
                    <DashboardPin title={'События'} />
                </div>
            );
        } else {
            pageContent = (
                <div>
                    <a target="_blank" href={`/wms/adresssettings?resoultID=${this.state.resoultID}`}>Дополнительные поля</a>
                </div>
            );
        }

        return (
            <div className={'dashboard-wrapper'}>
                <div className={'dashboard-pins-wrapper'}>
                    {pageContent}
                    {/*  */}
                    <div onClick={this.arrowClick} className={'down-arrow-wrapper'}>
                        <img src={page === PageType.PINS ? downArrow : upArrow} alt="" />
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