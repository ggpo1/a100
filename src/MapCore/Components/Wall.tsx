import React, {Component} from 'react';
import {Line, Rect} from 'react-konva';
import IWallProps from './../Models/Components/Wall/IWallProps';
import IWallState from './../Models/Components/Wall/IWallState';
import Orientation from './../Models/Enums/Orientation';
import LabelButton from "./Stage/LabelButton";
import LabelButtonMode from "../Models/Enums/LabelButtonMode";
import AppState from "../Data/AppState";
import Emit from "../Data/Emit";

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
        this.OnMouseHandlerValue = this.OnMouseHandlerValue.bind(this);
        Emit.Emitter.addListener('wallMouseDbl', this.OnMouseHandlerValue);
    }

    public OnMouseHandlerValue(value) {
        this.setState({isAddLabelButton: value});
    }

    public OnMouseHandler() {
        this.setState({isAddLabelButton: !this.state.isAddLabelButton});
    }

    public WallOnClickHandler() {
        this.setState({isDeleteModal: true});
    }

    public WallOnMouseDownHandler(e) {
        this.setState({ cursorCoords: { x: e.evt.clientX, y: e.evt.clientY }, isAddLabelButton: false });
    }

    render() {
        const { source, isAddLabelButton } = this.state;
        let dModal;
        let labelButton;

        let triangle;

        console.log('\n\n---------------------------------------------');
        console.log('\tWALL ' + source.id);
        console.log('---------------------------------------------');
        console.log('\twallKey: ' + source.key);
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
            console.log('\t' + labelButton.key);
        }
        let wall = (
            <Rect
                key={source.key + '_rect'}
                onDblClick={() => { this.OnMouseHandler() }}
                onDblTap={() => { this.OnMouseHandler() }}
                draggable={false}
                // onDragEnd={ () => this.forceUpdate() }
                onMouseDown={this.WallOnMouseDownHandler}
                x={source.startX}
                y={source.startY}
                cornerRadius={10}
                width={source.orientation === Orientation.HORIZONTAL ? source.length : 10}
                height={source.orientation === Orientation.VERTICAL ? source.length : 10}
                fill={'#dcdcdc'}
            />
        );
        console.log('\t' + wall.key);
        console.log('---------------------------------------------');
        return [wall, labelButton];
    }
}
