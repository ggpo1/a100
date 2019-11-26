import React, { Component } from 'react';
import { Rect } from 'react-konva';
import IWallProps from './../Models/Components/Wall/IWallProps';
import IWallState from './../Models/Components/Wall/IWallState';
import Orientation from './../Models/Enums/Orientation';
 
export default class Wall extends Component<IWallProps, IWallState> {
    
    constructor(props) {
        super(props);
        this.state = {
            source: this.props.source,
        }
    }

    render() {
        const { source } = this.state;

        
        return ( 
            <Rect 
                x={source.startX}
                cornerRadius={10}
                y={source.startY}
                width={source.orientation === Orientation.HORIZONTAL ? source.length : 10}
                height={source.orientation === Orientation.VERTICAL ? source.length : 10}
                fill={'#dcdcdc'} 
            />
        );
    }
}
