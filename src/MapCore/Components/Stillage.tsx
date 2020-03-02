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
import Emit from "../Data/Emit";
import StillageService from "../Services/StillageService";
import LayerType from "../Models/Enums/LayerType";
import DeleteCircle from "./Stage/DeleteCircle";
import AddCircle from "./Stage/AddCircle";
import PlaceSignatureItem from "../Models/ArrayItems/PlaceSignatureItem";
import SignatureItem from "../Models/ArrayItems/SignatureItem";
import DefectColors from "../Models/Enums/Colors/DefectColors";
import Deviation from "./Deviation";
import LogHandler from "../../LogHandler/LogHandler";
import LogType from "../../A100/model/enums/LogType";


export default class Stillage extends React.Component<IStillageProps, IStillageState> {
    public stillageService!: StillageService;
    constructor(props) {
        super(props);
        this.stillageService = new StillageService();
        let width, height = 0;
        if (this.props.source.orientation === Orientation.HORIZONTAL) {
            width = this.props.source.pmCount! * 30;
            height = 30;
        } else {
            width = 30;
            height = this.props.source.pmCount! * 30;
        }
        this.props.source.width = width;
        this.props.source.height = height;

        let deviations: Array<JSX.Element> = [];

        try {
            props.source.deviations!.forEach((el, i) => {
                deviations.push(
                    <Deviation
                        source={el}
                        parentSource={props.source}
                        key={`${props.source.key}_deviation_${i}`}
                    />
                );
            });
        } catch(e) {
            LogHandler.handle('Stillage', LogType.ERROR, 'deviation array is undefined!');
            props.source.deviations = [];
        }

        let placeSignatures: Array<JSX.Element> = [];
        if (props.source.placeSignatures !== undefined) {
            let i = 0;
            props.source.placeSignatures.forEach(element => {
                placeSignatures.push(
                    <PlaceSignature
                        parentSource={props.source}
                        parentPlaceSignatures={props.source.placeSignatures!}
                        isBlockScaling={props.source.isBlockScaling!}
                        parentScale={props.source.scale!}
                        pmCount={props.source.pmCount!}
                        parentKey={props.source.key}
                        key={`${props.source.key}_placeSignature_${(i++)}`}
                        parentX={props.source.x}
                        parentY={props.source.y}
                        parentDefects={props.source.viks!}
                        parentOrientation={props.source.orientation}
                        source={element}
                    />
                );
            });
        }

        let signature;
        if (props.source.signature !== undefined) {
            signature =
                <Signature
                    parentScale={props.source.scale!}
                    isBlockScaling={props.source.isBlockScaling!}
                    pmCount={props.source.pmCount!}
                    parentKey={props.source.key}
                    key={`${props.source.key}_signature`}
                    parentX={props.source.x}
                    parentY={props.source.y}
                    parentOrientation={props.source.orientation}
                    parentSize={props.source.size}
                    source={props.source.signature}
                />
            ;
        }

        let redDefects: Array<JSX.Element> = [];
        let greenDefects: Array<JSX.Element> = [];
        let yellowDefects: Array<JSX.Element> = [];
        if (props.source.viks !== undefined && props.source.viks.length !== 0) {
            props.source.viks!.forEach((element, i) => {
                if (element.color === DefectColors.RED) {
                    redDefects.push(
                        <Defect
                            parentSource={props.source}
                            parentScale={props.source.scale!}
                            isBlockScaling={props.source.isBlockScaling!}
                            parentKey={props.source.key}
                            key={`${props.source.key}_defect_${(i++)}`}
                            parentX={props.source.x}
                            parentY={props.source.y}
                            parentOrientation={props.source.orientation}
                            source={element}
                        />
                    );
                } else if (element.color === DefectColors.GREEN) {
                    greenDefects.push(
                        <Defect
                            parentSource={props.source}
                            parentScale={props.source.scale!}
                            isBlockScaling={props.source.isBlockScaling!}
                            parentKey={props.source.key}
                            key={`${props.source.key}_defect_${(i++)}`}
                            parentX={props.source.x}
                            parentY={props.source.y}
                            parentOrientation={props.source.orientation}
                            source={element}
                        />
                    );
                } else if (element.color === DefectColors.YELLOW) {
                    yellowDefects.push(
                        <Defect
                            parentSource={props.source}
                            parentScale={props.source.scale!}
                            isBlockScaling={props.source.isBlockScaling!}
                            parentKey={props.source.key}
                            key={`${props.source.key}_defect_${(i++)}`}
                            parentX={props.source.x}
                            parentY={props.source.y}
                            parentOrientation={props.source.orientation}
                            source={element}
                        />
                    );
                }
            });
        }

        this.state = {
            source: this.props.source,
            mapStillages: this.props.mapStillages,
            isMoveEnabled: false,
            isAdding: false,
            deviations,
            placeSignatures,
            signature,
            redDefects,
            yellowDefects,
            greenDefects
        };

        this.setStillageMoveEnabled = this.setStillageMoveEnabled.bind(this);
        this.setStillageMoveNow = this.setStillageMoveNow.bind(this);
        this.isAddingChange = this.isAddingChange.bind(this);
        this.setIsAddingChange = this.setIsAddingChange.bind(this);
        this.placeSignaturesForceUpdate = this.placeSignaturesForceUpdate.bind(this);
        this.signaturesForceUpdate = this.signaturesForceUpdate.bind(this);

        Emit.Emitter.addListener('stillageIsAddingChange', this.isAddingChange);
        Emit.Emitter.addListener('forceSetIsAddingChange', this.setIsAddingChange);
        Emit.Emitter.addListener('placeSignatureForceUpdate', this.placeSignaturesForceUpdate);
        Emit.Emitter.addListener('signaturesForceUpdate', this.signaturesForceUpdate);
    }

    public placeSignaturesForceUpdate(key: string, newPlaces: Array<PlaceSignatureItem>) {
        // автоматическое подставление номеров мест при передвижении стеллажа
        const {source} = this.state;
        if (key === this.state.source.key) {
            source.placeSignatures = newPlaces;
            for (let i = 0; i < newPlaces.length; i++) {
                Emit.Emitter.emit('placeSignaturesForceSource', source.key, newPlaces[i].place, newPlaces[i]);
            }
            this.forceUpdate(() => this.setState({source}));
        }
    }

    public signaturesForceUpdate(key: string, newSignature: SignatureItem) {
        const {source} = this.state;
        if (key === this.state.source.key) {
            source.signature = newSignature;
            Emit.Emitter.emit('signatureForceUpdate', source.key, newSignature);
            this.setState({source});
        }
    }

    public setIsAddingChange(value: boolean) {
        this.forceUpdate(() => this.setState({isAdding: value}));
    }

    public isAddingChange() {
        this.setState({isAdding: !this.state.isAdding});
    }

    public setStillageMoveEnabled(e) {
        Emit.Emitter.emit('setIsShapeMoving', !this.state.isMoveEnabled);
        this.setState({isMoveEnabled: !this.state.isMoveEnabled})
    }

    public setStillageMoveNow(e, value: boolean) {
        console.log(this.state.source);
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
        let addCircles;
        let stillageMoveArrows: Array<JSX.Element> = [];

        if (this.state.isAdding) {
              addCircles = (
                <AddCircle
                    key={source.key + '_addCircle'}
                    source={source}
                    mapStillages={this.state.mapStillages}
                    parentType={LayerType.STILLAGES}
                />
            );
        }

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

        if (source.orientation === Orientation.HORIZONTAL) {
            stillage = (
                <Rect
                    key={`${source.key}_rect`}
                    // move actions
                    onDblTap={(e) => this.setStillageMoveEnabled(e)}
                    onDblClick={(e) => this.setStillageMoveEnabled(e)}
                    onMouseDown={(e) => this.setStillageMoveNow(e, true)}
                    onTouchStart={(e) => this.setStillageMoveNow(e, true)}
                    onMouseUp={(e) => this.setStillageMoveNow(e, false)}
                    onTouchEnd={(e) => this.setStillageMoveNow(e, false)}
                    onClick={(e) => {
                        Emit.Emitter.emit('mapShapeClickEmit', e.evt.which, e.evt, source.id, LayerType.STILLAGES);
                    }}
                    x={source.x}
                    y={source.y}
                    width={stillageSizeReducer.GetA100Size(source.pmCount!, source.orientation, source.scale!, source.isBlockScaling!).firstSide}
                    height={stillageSizeReducer.GetA100Size(source.pmCount!, source.orientation, source.scale!, source.isBlockScaling!).secondSide}
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
                    key={`${source.key}_rect`}
                    onDblTap={(e) => this.setStillageMoveEnabled(e)}
                    onDblClick={(e) => this.setStillageMoveEnabled(e)}
                    onMouseDown={(e) => this.setStillageMoveNow(e, true)}
                    onTouchStart={(e) => this.setStillageMoveNow(e, true)}
                    onMouseUp={(e) => this.setStillageMoveNow(e, false)}
                    onTouchEnd={(e) => this.setStillageMoveNow(e, false)}
                    x={source.x}
                    y={source.y}
                    width={stillageSizeReducer.GetA100Size(source.pmCount!, source.orientation, source.scale!, source.isBlockScaling!).firstSide}
                    height={stillageSizeReducer.GetA100Size(source.pmCount!, source.orientation, source.scale!, source.isBlockScaling!).secondSide}
                    fill={StillageColors.STILLAGE_NORMAL}
                    strokeWidth={1} // border width
                    stroke={StillageColors.STILLAGE_NORMAL_STROKE}
                    onDragStart={this.handleDragStart}
                    onDragEnd={this.handleDragEnd}
                />
            );
        }

        return [
            addCircles,
            this.state.signature,
            stillage,
            this.state.greenDefects,
            this.state.yellowDefects,
            this.state.redDefects,
            this.state.placeSignatures,
            stillageMoveArrows,
            deleteCircle,
            this.state.deviations
        ];
    }
}
