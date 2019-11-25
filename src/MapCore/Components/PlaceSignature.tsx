import React, { Component } from 'react';
import { Text } from 'react-konva';
import IPlaceSignatureProps from './../Models/Components/IPlaceSignature/IPlaceSignatureProps';
import IPlaceSignatureState from './../Models/Components/IPlaceSignature/IPlaceSignatureState';
import Orientation from './../Models/Enums/Orientation';

export default class PlaceSignature extends Component<IPlaceSignatureProps, IPlaceSignatureState> {
    constructor(props) {
        super(props);

        this.state = {
            parentX: this.props.parentX,
            parentY: this.props.parentY,
            parentOrientation: this.props.parentOrientation,
            parentDefects: this.props.parentDefects,
            source: this.props.source,
        }
    }

    render() {
        const { parentX, parentY, parentOrientation, source } = this.state;
        let ps;
        console.log(this.state.parentDefects)
        if (parentOrientation === Orientation.HORIZONTAL) {
            if (source.place === 1) {
                if (source.title.length === 1) {
                    ps = <Text x={parentX + 9.5} y={parentY + 8} fontSize={11} fill={'white'} text={source.title} />;
                } else if (source.title.length === 2) {
                    ps = <Text x={parentX + 6} y={parentY + 8} fontSize={11} fill={'white'} text={source.title} />;
                }
            } else if (source.place === 2) {

            } else {

            }
        }



        return ps;
    }
}