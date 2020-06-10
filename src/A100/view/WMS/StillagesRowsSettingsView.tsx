import React from 'react';
import WmsAPI from './../../api/WmsAPI';
import queryString from 'query-string';
import '../../css/WMS/StillagesRowsSettingsView.css';

interface IStillagesRowsSettingsViewProps {
    match: any,
    location: any
}

interface IStillagesRowsSettingsViewState {
    resoultID: number
}

export default class StillagesRowsSettingsView extends React.Component<IStillagesRowsSettingsViewProps, IStillagesRowsSettingsViewState> {
    constructor(props) {
        super(props);
        let url = this.props.location.search;
        let urlParams = queryString.parse(url);

        this.state = {
            resoultID: parseInt(urlParams['resoultID']!.toString())
        }

    }

    componentDidMount() {
        (async () => {
            await WmsAPI.getUniqRows(this.state.resoultID);
        })();
    }

    render() {
        return (
            <div className={'rows-wrapper'}>
                <div className={'rows-table'}>

                </div>
            </div>
        );
    }
}