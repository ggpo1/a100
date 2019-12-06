import React, {Component} from 'react';
import {Line, Rect} from 'react-konva';
import IWallProps from './../Models/Components/Wall/IWallProps';
import IWallState from './../Models/Components/Wall/IWallState';
import Orientation from './../Models/Enums/Orientation';
import LabelButton from "./Stage/LabelButton";
import LabelButtonMode from "../Models/Enums/LabelButtonMode";
import AppState from "../Data/AppState";

export default class Wall extends Component<IWallProps, IWallState> {
    
    constructor(props) {
        super(props);
        this.state = {
            source: this.props.source,
            cursorCoords: {
                x: 0,
                y: 0,
            },
            isDeleteModal: false,
            isAddLabelButton: false,
        };
        this.WallOnClickHandler = this.WallOnClickHandler.bind(this);
        this.WallOnMouseDownHandler = this.WallOnMouseDownHandler.bind(this);
        this.OnMouseHandler = this.OnMouseHandler.bind(this);
    }

    public OnMouseHandler(value) {
        this.setState({
            ...this.state,
            ...{ isAddLabelButton: value }
        });
    }

    public WallOnClickHandler() {
        // console.log(this.state.source);
        // Emit.Emitter.emit('deleteWall');
        this.setState(
            {
                ...this.state,
                ...{ isDeleteModal: true }
            }
        );
    }

    public WallOnMouseDownHandler(e) {
        this.setState(
            {
                ...this.state,
                ...{ cursorCoords: { x: e.evt.clientX, y: e.evt.clientY } }
            }
        );
    }

    render() {
        const { source, isAddLabelButton } = this.state;
        let dModal;
        let labelButton;

        let triangle;

        if (isAddLabelButton) {
            labelButton = (
                <LabelButton
                    key={"labelButton_" + source.startX + "_" + source.startY + "_" + source.length}
                    parentX={source.startX}
                    parentY={source.startY}
                    objectSource={source}
                    labelMode={LabelButtonMode.ADD}
                />
            );
        }
        let wall = (
            <Rect
                // onClick={() => { this.OnMouseHandler(true) }}
                draggable={false}
                onMouseDown={this.WallOnMouseDownHandler}
                x={source.startX}
                y={source.startY}
                cornerRadius={10}
                width={source.orientation === Orientation.HORIZONTAL ? source.length : 10}
                height={source.orientation === Orientation.VERTICAL ? source.length : 10}
                fill={'#dcdcdc'}
            />
        );

        return [wall, labelButton];
    }
}
