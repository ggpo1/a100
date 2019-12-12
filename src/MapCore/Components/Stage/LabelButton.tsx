import React from 'react';
import {Circle} from "react-konva";
import ILabelButtonProps from "../../Models/Components/LabelButton/ILabelButtonProps";
import ILabelButtonState from "../../Models/Components/LabelButton/ILabelButtonState";
import Orientation from "../../Models/Enums/Orientation";
import AppState from "../../Data/AppState";

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

    public OnMouseHandler(value) {
        AppState.State.isAddLabelButton = value;
    }

    render() {
        const { sourceKey, parentX, parentY, objectSource, labelMode } = this.state;
        let startLabelButton, endLabelButton;
        if (objectSource !== undefined) {
            if (objectSource.orientation === Orientation.HORIZONTAL) {
                startLabelButton = (
                    <Circle
                        key={sourceKey + '_startLabelButton'}
                        onMouseOver={() => { this.OnMouseHandler(true) }}
                        onMouseLeave={() => { this.OnMouseHandler(false) }}
                        radius={10.5}
                        x={parentX}
                        y={parentY + 5}
                        strokeWidth={0.5}
                        stroke={'#2f00ff'}
                        fill={'#E0E0E0'}
                    />
                );
                endLabelButton = (
                    <Circle
                        key={sourceKey + '_endLabelButton'}
                        onMouseOver={() => { this.OnMouseHandler(true) }}
                        onMouseLeave={() => { this.OnMouseHandler(false) }}
                        radius={10.5}
                        x={parentX + objectSource.length}
                        y={parentY + 5}
                        strokeWidth={0.5}
                        stroke={'#2f00ff'}
                        fill={'#E0E0E0'}
                    />
                );
            } else if (objectSource.orientation === Orientation.VERTICAL) {
                startLabelButton = (
                    <Circle
                        key={sourceKey + '_startLabelButton'}
                        onMouseOver={() => { this.OnMouseHandler(true) }}
                        onMouseLeave={() => { this.OnMouseHandler(false) }}
                        radius={10.5}
                        x={parentX + 5}
                        y={parentY - 8}
                        strokeWidth={0.5}
                        stroke={'#2f00ff'}
                        fill={'#E0E0E0'}
                    />
                );
                endLabelButton = (
                    <Circle
                        key={sourceKey + '_endLabelButton'}
                        onMouseOver={() => { this.OnMouseHandler(true) }}
                        onMouseLeave={() => { this.OnMouseHandler(false) }}
                        radius={10.5}
                        x={parentX + 5}
                        y={parentY + objectSource.length + 8}
                        strokeWidth={0.5}
                        stroke={'#2f00ff'}
                        fill={'#E0E0E0'}
                    />
                );
            }

        }

        return [startLabelButton, endLabelButton];
    }

}