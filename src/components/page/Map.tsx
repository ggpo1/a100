import React from 'react';
import IMapProps from './../../model/Components/Map/IMapProps';
import IMapState from './../../model/Components/Map/IMapState';


export default class Map extends React.Component<IMapProps, IMapState> {

    constructor(props: IMapProps) {
        super(props);
    }

    render() {
        return (
            <div>map</div>
        );
    }

}
