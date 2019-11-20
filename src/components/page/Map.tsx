import React from 'react';
import IMapProps from '../../model/components/Map/IMapProps';
import IMapState from '../../model/components/Map/IMapState';


export default class Map extends React.Component<IMapProps, IMapState> {

    constructor(props: IMapProps) {
        super(props);
    }

    render() {
        return (
            <div>KONVA MAP</div>
        );
    }

}
