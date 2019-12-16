import React from 'react';
import {Circle} from "react-konva";
import ILabelButtonProps from "../../Models/Components/LabelButton/ILabelButtonProps";
import ILabelButtonState from "../../Models/Components/LabelButton/ILabelButtonState";
import Orientation from "../../Models/Enums/Orientation";
// import AppState from "../../Data/AppState";
import Emit from "../../Data/Emit";

export default class LabelButton extends React.Component<ILabelButtonProps, ILabelButtonState> {
    constructor(props) {
        super(props);

        this.state = {
            sourceKey: this.props.sourceKey,
            parentX: this.props.parentX,
            parentY: this.props.parentY,
            objectSource: this.props.objectSource,
            labelMode: this.props.labelMode,
        }
    }

    public OnMouseHandler(e, type, isStart: boolean) {
        switch (type) {
            case 'down': Emit.Emitter.emit('wallLabelButtonInteractionWayDown', e, this.state.objectSource, isStart); break;
            case 'up': Emit.Emitter.emit('wallLabelButtonInteractionWayUp', e, this.state.objectSource, isStart); break;
            default:
        }
    }

    render() {
        const { sourceKey, parentX, parentY, objectSource, labelMode } = this.state;
        let startLabelButton, endLabelButton;
        if (objectSource !== undefined) {
            if (objectSource.orientation === Orientation.HORIZONTAL) {
                startLabelButton = (
                    <Circle
                        key={sourceKey + '_startLabelButton_horizontal'}
                        radius={10.5}
                        x={parentX}
                        y={parentY + 5}
                        strokeWidth={0.5}
                        stroke={'#2f00ff'}
                        fill={'#E0E0E0'}

                        onMouseDown={(e) => {this.OnMouseHandler(e, 'down', true)}}
                        onTouchStart={(e) => {this.OnMouseHandler(e, 'down', true)}}
                        onMouseUp={(e) => {this.OnMouseHandler(e, 'up', true)}}
                        onTouchEnd={(e) => {this.OnMouseHandler(e, 'up', true)}}
                    />
                );
                endLabelButton = (
                    <Circle
                        key={sourceKey + '_endLabelButton_horizontal'}
                        radius={10.5}
                        x={parentX + objectSource.length}
                        y={parentY + 5}
                        strokeWidth={0.5}
                        stroke={'#2f00ff'}
                        fill={'#E0E0E0'}

                        onMouseDown={(e) => {this.OnMouseHandler(e, 'down', false)}}
                        onTouchStart={(e) => {this.OnMouseHandler(e, 'down', false)}}
                        onMouseUp={(e) => {this.OnMouseHandler(e, 'up', false)}}
                        onTouchEnd={(e) => {this.OnMouseHandler(e, 'up', false)}}
                    />
                );
            } else if (objectSource.orientation === Orientation.VERTICAL) {
                startLabelButton = (
                    <Circle
                        key={sourceKey + '_startLabelButton_vertical'}
                        radius={10.5}
                        x={parentX + 5}
                        y={parentY - 8}
                        strokeWidth={0.5}
                        stroke={'#2f00ff'}
                        fill={'#E0E0E0'}

                        onMouseDown={(e) => {this.OnMouseHandler(e, 'down', true)}}
                        onTouchStart={(e) => {this.OnMouseHandler(e, 'down', true)}}
                        onMouseUp={(e) => {this.OnMouseHandler(e, 'up', true)}}
                        onTouchEnd={(e) => {this.OnMouseHandler(e, 'up', true)}}
                    />
                );
                endLabelButton = (
                    <Circle
                        key={sourceKey + '_endLabelButton_vertical'}
                        radius={10.5}
                        x={parentX + 5}
                        y={parentY + objectSource.length + 8}
                        strokeWidth={0.5}
                        stroke={'#2f00ff'}
                        fill={'#E0E0E0'}

                        onMouseDown={(e) => {this.OnMouseHandler(e, 'down', false)}}
                        onTouchStart={(e) => {this.OnMouseHandler(e, 'down', false)}}
                        onMouseUp={(e) => {this.OnMouseHandler(e, 'up', false)}}
                        onTouchEnd={(e) => {this.OnMouseHandler(e, 'up', false)}}
                    />
                );
            }

        }
        console.log('\tstartLabelKey: ' + startLabelButton.key);
        console.log('\tendLabelKey: ' + endLabelButton.key);
        return [startLabelButton, endLabelButton];
    }

}