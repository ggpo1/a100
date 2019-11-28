import React, {Component} from 'react';
import {Rect, Line} from 'react-konva';
import IWallProps from './../Models/Components/Wall/IWallProps';
import IWallState from './../Models/Components/Wall/IWallState';
import Orientation from './../Models/Enums/Orientation';

export default class Wall extends Component<IWallProps, IWallState> {
    
    constructor(props) {
        super(props);
        this.state = {
            source: this.props.source,
            cursorCoords: {
                x: 0,
                y: 0,
            },
            isDeleteModal: false
        };
        this.WallOnClickHandler = this.WallOnClickHandler.bind(this);
        this.WallOnMouseDownHandler = this.WallOnMouseDownHandler.bind(this);
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
        const { source } = this.state;
        let dModal;

        let triangle;

        if (this.state.isDeleteModal) {
            if (this.state.source.orientation === Orientation.HORIZONTAL) {
                dModal = (
                    <Rect
                        // onClick={() => this.WallOnClickHandler()}
                        // onMouseDown={this.WallOnMouseDownHandler}
                        x={this.state.cursorCoords.x - 47}
                        cornerRadius={10}
                        y={this.state.cursorCoords.y - 58}
                        width={100}
                        height={40}
                        strokeWidth={0.5}
                        stroke={'black'}
                        fill={'white'}
                    />
                );
                triangle = (
                    <Line
                        x={this.state.cursorCoords.x - 36}
                        y={this.state.cursorCoords.y - 18}
                        points={[0, 0, 80, 0, 40, 15]}
                        closed
                        strokeWidth={0.5}
                        stroke={'black'}
                        fill={"white"}
                    />
                );
            }
        }

        let wall = (
            <Rect
                onClick={() => this.WallOnClickHandler()}
                onMouseDown={this.WallOnMouseDownHandler}
                x={source.startX}
                cornerRadius={10}
                y={source.startY}
                width={source.orientation === Orientation.HORIZONTAL ? source.length : 10}
                height={source.orientation === Orientation.VERTICAL ? source.length : 10}
                fill={'#dcdcdc'}
            />
        );

        return [wall, triangle, dModal, ];
    }
}
