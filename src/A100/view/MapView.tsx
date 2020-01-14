import React from 'react';
import IMapViewProps from '../model/Components/MapView/IMapViewProps';
import IMapViewState from '../model/Components/MapView/IMapViewState';
import Map from '../../MapCore/Map';
import MapSource from './../data/MapSource';
import {useParams} from "react-router";
import A100ConnectionDataType from "../model/A100ConnectionDataType";
import A100ConnectionData from "../data/A100ConnectionData";
import {Redirect, Route} from "react-router-dom";

export default class MapView extends React.Component<IMapViewProps, IMapViewState> {

    constructor(props: IMapViewProps) {
        super(props);
        const { match: { params } } = this.props;
        this.state = {
            employeeID: parseInt(params.employeeID),
            controlID: parseInt(params.controlID),
            resoultID: parseInt(params.resoultID),
            warhouseID: parseInt(params.warhouseID)
        };
        A100ConnectionData.data = {
          employeeID: this.state.employeeID,
          controlID: this.state.controlID,
          resoultID: this.state.resoultID,
          warhouseID: this.state.warhouseID
        };
        console.log(A100ConnectionData.data);
    }

    render() {
        let map;
        if (
            isNaN(A100ConnectionData.data!.employeeID) ||
            isNaN(A100ConnectionData.data!.controlID) ||
            isNaN(A100ConnectionData.data!.resoultID) ||
            isNaN(A100ConnectionData.data!.warhouseID)
        ) {
            setTimeout(() => {
                document.location.replace('/map/12/5029/5020/5019');
            }, 2000);
            map = (
                <h3>No params! Wait for redirecting to test...</h3>
            );
        } else {
            map = (
                <Map
                    key={'MapView_component'}
                    parentKey={'MapView_component'}
                    source={MapSource}
                />
            );
        }

        return map;
    }

}
