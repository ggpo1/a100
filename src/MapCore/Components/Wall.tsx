import React, {Component} from 'react';
import {Image, Line, Rect} from 'react-konva';
import IWallProps from './../Models/Components/Wall/IWallProps';
import IWallState from './../Models/Components/Wall/IWallState';
import Orientation from './../Models/Enums/Orientation';
import LabelButton from "./Stage/LabelButton";
import LabelButtonMode from "../Models/Enums/LabelButtonMode";
import AppState from "../Data/AppState";
import Emit from "../Data/Emit";
import LayerType from "../Models/Enums/LayerType";
import DeleteCircle from "./Stage/DeleteCircle";

export default class Wall extends Component<IWallProps, IWallState> {
    
    constructor(props) {
        super(props);
        this.state = {
            source: this.props.source,
            cursorCoords: {
                x: 0,
                y: 0,
            },
            isDelete: false,
            isAddLabelButton: false,
        };
        this.WallOnClickHandler = this.WallOnClickHandler.bind(this);
        this.OnMouseHandler = this.OnMouseHandler.bind(this);
        this.OnMouseHandlerValue = this.OnMouseHandlerValue.bind(this);
        this.setShapeMoveNow = this.setShapeMoveNow.bind(this);
        Emit.Emitter.addListener('wallMouseDbl', this.OnMouseHandlerValue);
    }

    public OnMouseHandlerValue(value) {
        this.setState({isAddLabelButton: value, isDelete: value});
    }

    public OnMouseHandler() {
        this.setState({isAddLabelButton: !this.state.isAddLabelButton, isDelete: !this.state.isDelete});
    }

    public WallOnClickHandler() {
        this.setState({isDelete: true});
    }

    clickHandler = () => {
        const { source } = this.state;

        console.log(source);
    };

    public setShapeMoveNow(e, value: boolean) {
        if (e.evt.which === 1) {
            Emit.Emitter.emit('setIsShapeMovingNow', value, {
                type: LayerType.WALLS,
                shape: this.state.source
            });
        }
    }

    render() {
        const { source, isAddLabelButton, isDelete } = this.state;
        let labelButton;
        let deleteCircle;
        let triangle;

        if (isDelete) {
            deleteCircle = (
                <DeleteCircle
                    key={source.key + '_deleteCircle'}
                    source={source}
                    parentType={LayerType.WALLS}
                />
            );
        }

        if (isAddLabelButton) {
            labelButton = (
                <LabelButton
                    key={source.key + '_labelButton'}
                    sourceKey={source.key + '_labelButton'}
                    parentX={source.startX}
                    parentY={source.startY}
                    objectSource={source}
                    labelMode={LabelButtonMode.ADD}
                />
            );
        }
        let wall = (
            <Rect
                key={source.key + '_rect'}
                onDblClick={() => { this.OnMouseHandler() }}
                onDblTap={() => { this.OnMouseHandler() }}
                draggable={false}
                // onDragEnd={ () => this.forceUpdate() }
                onMouseDown={(e) => this.setShapeMoveNow(e, true)}
                onTouchStart={(e) => this.setShapeMoveNow(e, true)}
                onMouseUp={(e) => this.setShapeMoveNow(e, false)}
                onTouchEnd={(e) => this.setShapeMoveNow(e, false)}
                x={source.startX}
                y={source.startY}
                cornerRadius={10}
                onClick={() => { this.clickHandler() }}
                width={source.orientation === Orientation.HORIZONTAL ? source.length : 10}
                height={source.orientation === Orientation.VERTICAL ? source.length : 10}
                // source.color === undefined ? '#dcdcdc' : source.color
                fill={source.color!.length === 0 ? '#dcdcdc' : source.color}
            />
        );
        return [wall, labelButton, deleteCircle];
    }
}
