import React, { Component } from 'react';
import { Text } from 'react-konva';
import IPlaceSignatureProps from './../Models/Components/IPlaceSignature/IPlaceSignatureProps';
import IPlaceSignatureState from './../Models/Components/IPlaceSignature/IPlaceSignatureState';
import Orientation from './../Models/Enums/Orientation';
import Emit from "../Data/Emit";

export default class PlaceSignature extends Component<IPlaceSignatureProps, IPlaceSignatureState> {
    constructor(props) {
        super(props);

        this.state = {
            parentX: this.props.parentX,
            parentY: this.props.parentY,
            parentOrientation: this.props.parentOrientation,
            parentDefects: this.props.parentDefects,
            source: this.props.source,
        };

        this.openModal = this.openModal.bind(this);
    }

    public openModal() {
        // Emit.Emitter.emit('defectBrowsePanelWorkerHandle', true);
    }

    render() {
        const { parentX, parentY, parentOrientation, source } = this.state;
        let ps;
        if (parentOrientation === Orientation.HORIZONTAL) {
            if (source.place === 1) {
                if (source.title.length === 1) {
                    ps = <Text
                            key={'place_signature_text_' + parentX + '_' + parentY + '_' + parentOrientation + '_' + source.place + '_' + source.title + '_' + source.title.length}
                            onTap={() => { this.openModal() }}
                            onClick={() => { this.openModal() }}
                            x={parentX + 9.5}
                            y={parentY + 8}
                            fontSize={11} fill={'white'}
                            text={source.title}
                    />;
                } else if (source.title.length === 2) {
                    ps = <Text
                            key={'place_signature_text_' + parentX + '_' + parentY + '_' + parentOrientation + '_' + source.place + '_' + source.title + '_' + source.title.length}
                            onTap={() => { this.openModal() }}
                            onClick={() => { this.openModal() }}
                            x={parentX + 6}
                            y={parentY + 8}
                            fontSize={11}
                            fill={'white'}
                            text={source.title}
                    />;
                } else if (source.title.length > 2) {
                    ps = <Text
                            key={'place_signature_text_' + parentX + '_' + parentY + '_' + parentOrientation + '_' + source.place + '_' + source.title + '_' + source.title.length}
                            onTap={() => { this.openModal() }}
                            onClick={() => { this.openModal() }}
                            x={parentX + 5}
                            y={parentY + 9}
                            fontSize={9}
                            fill={'white'}
                            text={source.title}
                    />;
                }
            } else if (source.place === 2) {
                if (source.title.length === 1) {
                    ps = <Text
                            key={'place_signature_text_' + parentX + '_' + parentY + '_' + parentOrientation + '_' + source.place + '_' + source.title + '_' + source.title.length}
                            onTap={() => { this.openModal() }}
                            onClick={() => { this.openModal() }}
                            x={parentX + 34.5}
                            y={parentY + 8}
                            fontSize={11}
                            fill={'white'}
                            text={source.title}
                    />;
                } else if (source.title.length === 2) {
                    ps = <Text
                            key={'place_signature_text_' + parentX + '_' + parentY + '_' + parentOrientation + '_' + source.place + '_' + source.title + '_' + source.title.length}
                            onTap={() => { this.openModal() }}
                            onClick={() => { this.openModal() }}
                            x={parentX + 31.5}
                            y={parentY + 8}
                            fontSize={11}
                            fill={'white'}
                            text={source.title}
                    />;
                } else if (source.title.length > 2) {
                    ps = <Text
                            key={'place_signature_text_' + parentX + '_' + parentY + '_' + parentOrientation + '_' + source.place + '_' + source.title + '_' + source.title.length}
                            onTap={() => { this.openModal() }}
                            onClick={() => { this.openModal() }}
                            x={parentX + 30}
                            y={parentY + 9}
                            fontSize={9}
                            fill={'white'}
                            text={source.title}
                    />;
                }
            } else {
                if (source.title.length === 1) {
                    ps = <Text
                            key={'place_signature_text_' + parentX + '_' + parentY + '_' + parentOrientation + '_' + source.place + '_' + source.title + '_' + source.title.length}
                            onTap={() => { this.openModal() }}
                            onClick={() => { this.openModal() }}
                            x={parentX + 59}
                            y={parentY + 8}
                            fontSize={11}
                            fill={'white'}
                            text={source.title}
                    />;
                } else if (source.title.length === 2) {
                    ps = <Text
                            key={'place_signature_text_' + parentX + '_' + parentY + '_' + parentOrientation + '_' + source.place + '_' + source.title + '_' + source.title.length}
                            onTap={() => { this.openModal() }}
                            onClick={() => { this.openModal() }}
                            x={parentX + 56.25}
                            y={parentY + 8}
                            fontSize={11}
                            fill={'white'}
                            text={source.title}
                    />;
                } else {
                    ps = <Text
                            key={'place_signature_text_' + parentX + '_' + parentY + '_' + parentOrientation + '_' + source.place + '_' + source.title + '_' + source.title.length}
                            onTap={() => { this.openModal() }}
                            onClick={() => { this.openModal() }}
                            x={parentX + 55}
                            y={parentY + 9}
                            fontSize={9}
                            fill={'white'}
                            text={source.title}
                    />;
                }
            }
        } else {
            if (source.place === 1) {
                if (source.title.length === 1) {
                    ps = <Text
                            key={'place_signature_text_' + parentX + '_' + parentY + '_' + parentOrientation + '_' + source.place + '_' + source.title + '_' + source.title.length}
                            onTap={() => { this.openModal() }}
                            onClick={() => { this.openModal() }}
                            x={parentX + 9}
                            y={parentY + 8}
                            fontSize={11}
                            fill={'white'}
                            text={source.title}
                    />;
                } else if (source.title.length === 2) {
                    ps = <Text
                            key={'place_signature_text_' + parentX + '_' + parentY + '_' + parentOrientation + '_' + source.place + '_' + source.title + '_' + source.title.length}
                            onTap={() => { this.openModal() }}
                            onClick={() => { this.openModal() }}
                            x={parentX + 6.25}
                            y={parentY + 8}
                            fontSize={11}
                            fill={'white'}
                            text={source.title}
                    />;
                } else if (source.title.length > 2) {
                    ps = <Text
                            key={'place_signature_text_' + parentX + '_' + parentY + '_' + parentOrientation + '_' + source.place + '_' + source.title + '_' + source.title.length}
                            onTap={() => { this.openModal() }}
                            onClick={() => { this.openModal() }}
                            x={parentX + 5}
                            y={parentY + 8}
                            fontSize={9}
                            fill={'white'}
                            text={source.title}
                    />;
                }
            } else if (source.place === 2) {
                if (source.title.length === 1) {
                    ps = <Text
                            key={'place_signature_text_' + parentX + '_' + parentY + '_' + parentOrientation + '_' + source.place + '_' + source.title + '_' + source.title.length}
                            onTap={() => { this.openModal() }}
                            onClick={() => { this.openModal() }}
                            x={parentX + 9}
                            y={parentY + 33}
                            fontSize={11}
                            fill={'white'}
                            text={source.title}
                    />;
                } else if (source.title.length === 2) {
                    ps = <Text
                            key={'place_signature_text_' + parentX + '_' + parentY + '_' + parentOrientation + '_' + source.place + '_' + source.title + '_' + source.title.length}
                            onTap={() => { this.openModal() }}
                            onClick={() => { this.openModal() }}
                            x={parentX + 6}
                            y={parentY + 32.5}
                            fontSize={11}
                            fill={'white'}
                            text={source.title}
                    />;
                } else if (source.title.length > 2) {
                    ps = <Text
                            key={'place_signature_text_' + parentX + '_' + parentY + '_' + parentOrientation + '_' + source.place + '_' + source.title + '_' + source.title.length}
                            onTap={() => { this.openModal() }}
                            onClick={() => { this.openModal() }}
                            x={parentX + 5}
                            y={parentY + 33}
                            fontSize={9}
                            fill={'white'}
                            text={source.title}
                    />;
                }
            } else {
                if (source.title.length === 1) {
                    ps = <Text
                            key={'place_signature_text_' + parentX + '_' + parentY + '_' + parentOrientation + '_' + source.place + '_' + source.title + '_' + source.title.length}
                            onTap={() => { this.openModal() }}
                            onClick={() => { this.openModal() }}
                            x={parentX + 9.5}
                            y={parentY + 57.55}
                            fontSize={11}
                            fill={'white'}
                            text={source.title}
                    />;
                } else if (source.title.length === 2) {
                    ps = <Text
                            key={'place_signature_text_' + parentX + '_' + parentY + '_' + parentOrientation + '_' + source.place + '_' + source.title + '_' + source.title.length}
                            onTap={() => { this.openModal() }}
                            onClick={() => { this.openModal() }}
                            x={parentX + 6.5}
                            y={parentY + 57.55}
                            fontSize={11}
                            fill={'white'}
                            text={source.title}
                    />;
                } else {
                    ps = <Text
                            key={'place_signature_text_' + parentX + '_' + parentY + '_' + parentOrientation + '_' + source.place + '_' + source.title + '_' + source.title.length}
                            onTap={() => { this.openModal() }}
                            onClick={() => { this.openModal() }}
                            x={parentX + 5}
                            y={parentY + 59}
                            fontSize={9}
                            fill={'white'}
                            text={source.title}
                    />;
                }
            }
        }



        return ps;
    }
}