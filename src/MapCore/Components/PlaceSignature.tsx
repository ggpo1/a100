import React, {Component} from 'react';
import {Text} from 'react-konva';
import IPlaceSignatureProps from './../Models/Components/IPlaceSignature/IPlaceSignatureProps';
import IPlaceSignatureState from './../Models/Components/IPlaceSignature/IPlaceSignatureState';
import Orientation from './../Models/Enums/Orientation';
import Emit from "../Data/Emit";
import PlaceSignatureItem from "../Models/ArrayItems/PlaceSignatureItem";

const A100CellSize = 30;

export default class PlaceSignature extends Component<IPlaceSignatureProps, IPlaceSignatureState> {
    constructor(props) {
        super(props);

        this.state = {
            parentSource: this.props.parentSource,
            parentPlaceSignatures: this.props.parentPlaceSignatures,
            isBlockScaling: this.props.isBlockScaling,
            parentScale: this.props.parentScale,
            pmCount: this.props.pmCount,
            parentKey: this.props.parentKey,
            parentX: this.props.parentX,
            parentY: this.props.parentY,
            parentOrientation: this.props.parentOrientation,
            parentDefects: this.props.parentDefects,
            source: this.props.source,
        };

        this.openModal = this.openModal.bind(this);
        this.thisForceUpdate = this.thisForceUpdate.bind(this);
        this.forceSource = this.forceSource.bind(this);

        Emit.Emitter.addListener('placeSignaturesForceUpdate', this.thisForceUpdate);
        Emit.Emitter.addListener('placeSignaturesForceSource', this.forceSource);
    }

    public get getScaleK(): number {
        const { parentScale, parentOrientation, isBlockScaling, source } = this.state;

        const VERTICAL_PARENT_SCALE_K_BIG = 20 * parentScale;
        const HORIZONTAL_PARENT_SCALE_K_BIG = 20 * parentScale;
        const VERTICAL_PARENT_SCALE_K_SMALL = 13 * parentScale;
        const HORIZONTAL_PARENT_SCALE_K_SMALL = 13 * parentScale;

        if (parentScale > 1 && isBlockScaling) {
            if (parentOrientation === Orientation.VERTICAL) return VERTICAL_PARENT_SCALE_K_BIG;
            if (parentOrientation === Orientation.HORIZONTAL) return HORIZONTAL_PARENT_SCALE_K_BIG;
        } else if (parentScale === 1 && isBlockScaling) {
            if (parentOrientation === Orientation.VERTICAL) {
                if (source.title.length === 1) return VERTICAL_PARENT_SCALE_K_SMALL;
                if (source.title.length === 2) return VERTICAL_PARENT_SCALE_K_SMALL - 5;
            }
            if (parentOrientation === Orientation.HORIZONTAL) return HORIZONTAL_PARENT_SCALE_K_SMALL;
        }
        return 0;
    }

    public get fontSize(): number {
        const {parentScale, parentOrientation, isBlockScaling} = this.state;
        const NORMAL_FONT_SIZE = 14;
        const SCALED_FONT_SIZE_NORMAL = 25;
        const SCALED_FONT_SIZE_BIG = 35;

        if (parentScale > 1) {
            return SCALED_FONT_SIZE_BIG;
        } else if (parentScale === 1 && isBlockScaling) {
            return SCALED_FONT_SIZE_NORMAL;
        } else if (!isBlockScaling) {
            return NORMAL_FONT_SIZE;
            // return SCALED_FONT_SIZE_NORMAL;
        }

        return 0;
    }

    public forceSource(parenKey: string, place: number, newSource: PlaceSignatureItem) {
        if (parenKey === this.state.parentKey && place === this.state.source.place) {
            this.setState({ source: newSource });
        }
    }

    public openModal() {
        console.log(this.state);
        const { parentDefects, source, parentSource } = this.state;
        let selectedDefectSource;
        parentDefects.forEach(el => {
            if (el.place === source.place) selectedDefectSource = el;
        });


        Emit.Emitter.emit('setSelectedVik', selectedDefectSource, parentSource);
        Emit.Emitter.emit('defectBrowsePanelWorkerHandle', true);
    }

    public thisForceUpdate(parentKey: string, newParentX: number, newParentY: number) {
        if (parentKey === this.state.parentKey) {
            this.setState({ parentX: newParentX, parentY: newParentY })
        }
    };

    render() {
        const { parentX, parentY, parentOrientation, source, parentPlaceSignatures, pmCount, isBlockScaling, parentScale } = this.state;

        let ps;
        let delta = 0;
        if (parentOrientation === Orientation.HORIZONTAL) {
            delta = (A100CellSize * source.place - (A100CellSize/2 + 4 * source.title.length)) * parentScale * (isBlockScaling ? 2 : 1);
            ps = <Text
                key={'place_signature_text_' + parentX + '_' + parentY + '_' + parentOrientation + '_' + source.place + '_' + source.title + '_' + source.title.length}
                onTap={() => { this.openModal() }}
                onClick={() => { this.openModal() }}
                x={parentX + delta}
                y={parentY + 9 + this.getScaleK}
                fontSize={this.fontSize}
                fill={'white'}
                text={source.title}
            />;
        } else {
            if (isBlockScaling) {
                delta = (A100CellSize * source.place - (A100CellSize / 2)) * parentScale * (isBlockScaling ? 2 : 1) - 10;
                ps = <Text
                    key={'place_signature_text_' + parentX + '_' + parentY + '_' + parentOrientation + '_' + source.place + '_' + source.title + '_' + source.title.length}
                    onTap={() => {
                        this.openModal()
                    }}
                    onClick={() => {
                        this.openModal()
                    }}
                    x={parentX + (30 * parentScale - 10 * source.title.length)}
                    y={parentY + delta}
                    fontSize={this.fontSize}
                    fill={'white'}
                    text={source.title}
                />;
            } else {
                delta = (A100CellSize * source.place - (A100CellSize / 2 + this.fontSize / 2)) * parentScale * (isBlockScaling ? 2 : 1);
                ps = <Text
                    key={'place_signature_text_' + parentX + '_' + parentY + '_' + parentOrientation + '_' + source.place + '_' + source.title + '_' + source.title.length}
                    onTap={() => {
                        this.openModal()
                    }}
                    onClick={() => {
                        this.openModal()
                    }}
                    x={parentX + 10.5 + this.getScaleK - (source.title.length > 1 ? (source.title.length * 2) : 0)}
                    y={parentY + delta}
                    fontSize={this.fontSize}
                    fill={'white'}
                    text={source.title}
                />;
            }
        }



        return ps;
    }
}