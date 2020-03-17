import React from 'react';
import IMapViewProps from '../model/Components/MapView/IMapViewProps';
import IMapViewState from '../model/Components/MapView/IMapViewState';
import Map from '../../MapCore/Map';
import MapSource from './../data/MapSource';
import A100ConnectionData from "../data/A100ConnectionData";
import queryString from 'query-string';
import MapAPI from "../api/MapAPI";
import MapSourceUnit from "../../MapCore/Models/MapSourceUnit";
import LogHandler from '../../LogHandler/LogHandler';
import LogType from "../model/enums/LogType";

export default class MapView extends React.Component<IMapViewProps, IMapViewState> {

    public MapAPI!: MapAPI;
    public data!: Array<MapSourceUnit>;

    constructor(props: IMapViewProps) {
        super(props);
        let url = this.props.location.search;
        let urlParams = queryString.parse(url);
        try {
            this.state = {
                mapSource: [],
                resoultID: parseInt(urlParams['resoultID']!.toString()),
            };
            A100ConnectionData.data = {
                resoultID: this.state.resoultID,
            };
            LogHandler.handle('MapView', LogType.LOG, 'url params parsed successfully!');
        } catch (e) {
            LogHandler.handle('MapView', LogType.ERROR, 'error while parsing parameters or they are empty!');
        }
    }

    componentDidMount() {
        let that = this;
        // MapSource.GetMap();
        (async () =>  MapSource.GetUnits())();
        (async () => MapSource.GetGlobalsatData())();
        setTimeout(function() {
            that.forceUpdate();
        }, 5000);
    }

    render() {
        let map;
        if (isNaN(A100ConnectionData.data!.resoultID)) {
            map = (
                <Map
                    key={'MapView_component'}
                    parentKey={'MapView_component'}
                    source={MapSource.data}
                />
            );

            // setTimeout(() => {
            //     document.location.replace('/map?employeeID=12&controlID=5029&resoultID=5020&warhouseID=5019');
            // }, 2000);
            // map = (
            //     <div style={{height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
            //         <h4>Please, wait for redirecting...</h4>
            //     </div>
            // );
        } else {

            map = (
                <Map
                    key={'MapView_component'}
                    parentKey={'MapView_component'}
                    source={MapSource.data}
                />
            );

        }

        return map;
    }

}
