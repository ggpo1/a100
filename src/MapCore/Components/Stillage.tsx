import React from 'react';
import Konva from 'konva';
import {Rect} from 'react-konva';
import IStillageProps from './../Models/Components/Stillage/IStillageProps';
import IStillageState from './../Models/Components/Stillage/IStillageState';
import Orientation from './../Models/Enums/Orientation';
import StillageSizeReducer from './../Models/Enums/StillageSize/StillageSizeReducer';
import StillageColors from '../Models/Enums/Colors/StillageColors';
import Defect from './Defect';
import PlaceSignature from './PlaceSignature';
import Signature from './SIgnature';
import StillageSize from "../Models/Enums/StillageSize/StillageSize";
import Emit from "../Data/Emit";
import StillageService from "../Services/StillageService";
import LayerType from "../Models/Enums/LayerType";
import DeleteCircle from "./Stage/DeleteCircle";


export default class Stillage extends React.Component<IStillageProps, IStillageState> {
    public stillageService!: StillageService;
    constructor(props) {
        super(props);
        this.stillageService = new StillageService();
        let width, height = 0;
        if (this.props.source.orientation === Orientation.HORIZONTAL) {
            if (this.props.source.size === StillageSize.NORMAL) {
                width = 76;
                height = 49.5;
            } else {
                width = 50;
                height = 49.5;
            }
        } else {
            if (this.props.source.size === StillageSize.NORMAL) {
                width = 49.5;
                height = 76;
            } else {
                width = 49.5;
                height = 50;
            }
        }
        this.props.source.width = width;
        this.props.source.height = height;
        this.state = {
            source: this.props.source,
            isMoveEnabled: false,
        };
        this.setStillageMoveEnabled = this.setStillageMoveEnabled.bind(this);
        this.setStillageMoveNow = this.setStillageMoveNow.bind(this);
    }

    public setStillageMoveEnabled(e) {
        Emit.Emitter.emit('setIsShapeMoving', !this.state.isMoveEnabled);
        this.setState({isMoveEnabled: !this.state.isMoveEnabled})
    }

    public setStillageMoveNow(e, value: boolean) {
        if (e.evt.which === 1) {
            Emit.Emitter.emit('setIsShapeMovingNow', value, {
                type: LayerType.STILLAGES,
                shape: this.state.source
            });
        }
    }

    handleDragStart = e => {
        e.target.setAttrs({
            shadowOffset: {
                x: 2,
                y: 2
            },
            shadowColor: 'grey',
            scaleX: 1.1,
            scaleY: 1.1
        });
    };

    handleDragEnd = e => {
        e.target.to({
            duration: 0.5,
            easing: Konva.Easings.ElasticEaseOut,
            scaleX: 1,
            scaleY: 1,
            shadowOffset: null,
            shadowColor: 'white',
        });
    };

    render() {
        const { source } = this.state;
        const stillageSizeReducer = new StillageSizeReducer();
        let stillage;
        let deleteCircle;
        let viks: Array<JSX.Element> = [];
        let placeSignatures: Array<JSX.Element> = [];
        let signature;
        let stillageSR = new StillageSizeReducer();
        let stillageMoveArrows: Array<JSX.Element> = [];



        if (this.state.isMoveEnabled) {
            stillageMoveArrows = this.stillageService.getStillageArrows(this.state.source);
            deleteCircle = (
                <DeleteCircle
                    key={source.key + '_deleteCircle'}
                    source={source}
                    parentType={LayerType.STILLAGES}
                />
            );
        }

        if (source.signature !== undefined) {
            signature =
                <Signature
                    parentKey={source.key}
                    key={source.key + '_signature'}
                    parentX={source.x}
                    parentY={source.y}
                    parentOrientation={source.orientation}
                    parentSize={source.size}
                    source={source.signature}
                />
            ;
        }

        if (source.placeSignatures !== undefined) {
            let i = 0;
            source.placeSignatures.forEach(element => {
                placeSignatures.push(
                    <PlaceSignature
                        parentKey={source.key}
                        key={source.key + '_placeSignature_' + (i++)}
                        parentX={source.x}
                        parentY={source.y}
                        parentDefects={source.viks!}
                        parentOrientation={source.orientation}
                        source={element}
                    />
                );
            });
        }

        if (source.viks !== undefined) {
            let i = 0;
            source.viks!.forEach(element => {
                viks.push(
                    <Defect
                        parentKey={source.key}
                        key={source.key + '_defect_' + (i++)}
                        parentX={source.x}
                        parentY={source.y}
                        parentOrientation={source.orientation}
                        source={element}
                    />
                );
            });
        }

        if (source.orientation === Orientation.HORIZONTAL) {
            stillage = (
                <Rect
                    key={source.key + '_rect'}
                    // move actions
                    onDblTap={(e) => this.setStillageMoveEnabled(e)}
                    onDblClick={(e) => this.setStillageMoveEnabled(e)}
                    onMouseDown={(e) => this.setStillageMoveNow(e, true)}
                    onTouchStart={(e) => this.setStillageMoveNow(e, true)}
                    onMouseUp={(e) => this.setStillageMoveNow(e, false)}
                    onTouchEnd={(e) => this.setStillageMoveNow(e, false)}
                    onClick={(e) => {
                        Emit.Emitter.emit('mapShapeClickEmit', e.evt.which, e.evt, source.id, LayerType.STILLAGES);
                        // console.error(e.evt.which);
                    }}
                    // ____
                    x={source.x}
                    y={source.y}
                    width={stillageSizeReducer.GetSize(source.size).firstSide}
                    height={stillageSizeReducer.GetSize(source.size).secondSide}
                    fill={StillageColors.STILLAGE_NORMAL}
                    strokeWidth={1} // border width
                    stroke={StillageColors.STILLAGE_NORMAL_STROKE}
                    onDragStart={this.handleDragStart}
                    onDragEnd={this.handleDragEnd}
                />
            );
        } else if (source.orientation === Orientation.VERTICAL) {
            stillage = (
                <Rect
                    key={source.key + '_rect'}
                    // move actions
                    onDblTap={(e) => this.setStillageMoveEnabled(e)}
                    onDblClick={(e) => this.setStillageMoveEnabled(e)}
                    onMouseDown={(e) => this.setStillageMoveNow(e, true)}
                    onTouchStart={(e) => this.setStillageMoveNow(e, true)}
                    onMouseUp={(e) => this.setStillageMoveNow(e, false)}
                    onTouchEnd={(e) => this.setStillageMoveNow(e, false)}
                    // ____
                    x={source.x}
                    y={source.y}
                    width={stillageSizeReducer.GetSize(source.size).secondSide}
                    height={stillageSizeReducer.GetSize(source.size).firstSide}
                    fill={StillageColors.STILLAGE_NORMAL}
                    strokeWidth={1} // border width
                    stroke={StillageColors.STILLAGE_NORMAL_STROKE}
                    onDragStart={this.handleDragStart}
                    onDragEnd={this.handleDragEnd}
                />
            );
        }

        let returns: Array<JSX.Element> = [signature, stillage, viks, placeSignatures, stillageMoveArrows, deleteCircle];

        // console.log('stillage stop');

        return returns;
    }
}
