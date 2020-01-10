import React from 'react';
import IMapViewProps from '../model/Components/MapView/IMapViewProps';
import IMapViewState from '../model/Components/MapView/IMapViewState';
import Map from '../../MapCore/Map';
import MapSource from './../data/MapSource';
import {useParams} from "react-router";

export default class MapView extends React.Component<IMapViewProps, IMapViewState> {

    constructor(props: IMapViewProps) {
        super(props);
    }

    render() {
        // console.log(this.props.match.params);
        // let {id} = useParams();
        // console.log(id);
        return (
            <Map source={MapSource} />
        );
    }

}
