import React, { useState } from 'react';
import queryString from 'query-string';
import LogHandler from './../../../LogHandler/LogHandler';
import LogType from './../../model/enums/LogType';
import '../../css/WMS/DashboardView.css';
import WmsAPI from './../../api/WmsAPI';
import downArrow from '../../assets/downArrow.png';
import upArrow from '../../assets/upArrow.png';
import GlobalsatBang from './../../../MapCore/Components/GlobalsatBang';
import Emit from './../../../MapCore/Data/Emit';

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
    page: PageType,
    globalsatBangs: Array<GlobalsatBang>
}

const BANGS_HEADERS = [
    {
        key: 'row',
        title: 'ряд'
    },
    {
        key: 'place',
        title: 'место'
    },
    {
        key: 'strength',
        title: 'сила'
    },
    {
        key: 'unitName',
        title: 'блок'
    },
    {
        key: 'bangDate',
        title: 'дата'
    }
]

export default class DashboardView extends React.Component<IDashboardViewProps, IDashboardViewState> {

    constructor(props: IDashboardViewProps) {
        super(props);
        let url = this.props.location.search;
        let urlParams = queryString.parse(url);

        try {
            this.state = {
                resoultID: parseInt(urlParams['resoultID']!.toString()),
                page: PageType.PINS,
                globalsatBangs: []
            }
            LogHandler.handle('AddressSettingsView', LogType.LOG, 'url params parsed successfully!');
        } catch (ex) {
            LogHandler.handle('AddressSettingsView', LogType.ERROR, 'error while parsing parameters or they are empty!');
        }

        Emit.Emitter.addListener('setDashboardGlobalsatBangsList', (bangs: Array<GlobalsatBang>) => {
            this.setState({ globalsatBangs: bangs });
        });
    }

    public arrowClick = () => {
        const { page } = this.state;
        if (page === PageType.PINS) this.setState({ page: PageType.LINKS })
        else this.setState({ page: PageType.PINS });
    };

    componentDidMount() {
        document.title = "A100 API";

        (async () => {
            await WmsAPI.getGlobalsatBangs(this.state.resoultID);
        })();
    }

    render() {
        const { page, globalsatBangs } = this.state;

        // if (globalsatBangs.length === 0) return null;

        // if (page === PageType.PINS) {
        // globalsatBangs.map(el => {
        //     el['strength'] = el['strength'].toFixed(2)
        //     el['bangDate'] = el['bangDate'].replace('T', ' ');
        //     return el;
        // });
        // }

        let pageContent;
        if (page === PageType.PINS) {
            pageContent = (
                <div id="dashboard-pins-grid">
                    <DashboardPin headers={BANGS_HEADERS} rows={globalsatBangs} title={'Вибрации'} />
                    <DashboardPin headers={BANGS_HEADERS} rows={globalsatBangs} title={'Отклонения'} />
                    <DashboardPin headers={BANGS_HEADERS} rows={globalsatBangs} title={'Техника'} />
                    <DashboardPin headers={BANGS_HEADERS} rows={globalsatBangs} title={'События'} />
                </div>
            );
        } else {
            pageContent = (
                <div className={'links-wrapper'}>
                    <div className={'link-block'}>
                        <a target="_blank" href={`/wms/rows?resoultID=${this.state.resoultID}`}>таблица адресации</a>
                    </div>
                    <div className={'link-block'}>
                        <a target="_blank" href={`/wms/props?resoultID=${this.state.resoultID}`}>дополнительные поля</a>
                    </div>
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
    headers: Array<{ key: string, title: string }>,
    rows: Array<any>
}

function DashboardPin(props: IDashboardPinProps) {
    const [title] = useState<string>(props.title),
        [headers] = useState<typeof props.headers>(props.headers),
        [rows, setRows] = useState<Array<any>>(props.rows);

    let headerEls: Array<JSX.Element> = [],
        rowEls: Array<JSX.Element> = [];
    headers.forEach((hEl, i) => {
        headerEls.push(
            <div key={`headerEl_${i}`} className={'header-el'}>{hEl.title}</div>
        );
    });

    rows.forEach((rEl, i) => {
        let cells: Array<JSX.Element> = [];
        headers.forEach((hEl, j) => {
            cells.push(
                <div key={`row_${i}_cell_${j}`} className={'pin-table-row-cell'}>{rEl[hEl.key]}</div>
            );
        });
        rowEls.push(
            <div key={`row_${i}`} className={'pin-table-row'}>
                {cells}
            </div>
        );
    });

    return (
        <div className={'dashboard-pin'}>
            <div className={'pin-title'}>
                <button className={'settings-button'} style={{}}>настройка</button>
            </div>
            <div className={'pin-body'}>
                <div className={'pin-table-header'}>
                    {headerEls}
                </div>
                <div className={'pin-table-content'}>
                    {/* {rowEls} */}
                </div>
            </div>
        </div>
    );
}