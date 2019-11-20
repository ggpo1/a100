import React from 'react';
import IMapViewProps from '../model/Components/MapView/IMapViewProps';
import IMapViewState from '../model/Components/MapView/IMapViewState';
import Map from './../components/page/Map';

export default class MapView extends React.Component<IMapViewProps, IMapViewState> {

    constructor(props: IMapViewProps) {
        super(props);
    }

    render() {
        return (
            <Map StillageBlocks={[]} />
        );
    }

}
