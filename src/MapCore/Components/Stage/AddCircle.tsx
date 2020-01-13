import React from 'react';
import IAddCircleProps from "../../Models/Components/AddCircle/IAddCircleProps";
import IAddCircleState from "../../Models/Components/AddCircle/IAddCircleState";
import LayerType from "../../Models/Enums/LayerType";
import {Circle, Text} from "react-konva";
import Orientation from "../../Models/Enums/Orientation";
import SignaturePosition from "../../Models/Enums/SignaturePosition";
import Emit from "../../Data/Emit";
import Position from "../../Models/Enums/Position";

export default class AddCircle extends React.Component<IAddCircleProps, IAddCircleState> {
    constructor(props) {
        super(props);
        this.state = {
            source: this.props.source,
            mapStillages: this.props.mapStillages,
            parentType: this.props.parentType
        };
        this.addCircleClickAction = this.addCircleClickAction.bind(this);
    }

    public addCircleClickAction(type: LayerType, position: Position) {
        Emit.Emitter.emit('addSameShape', type, this.state.source, position);
    }

    render() {
        const {source, mapStillages, parentType} = this.state;
        let fAddCircle, sAddCircle, fAddCircleText, sAddCircleText;
        // TODO: Small stillages
        let firstSideCheck, secondSideCheck = false;
        if (parentType === LayerType.STILLAGES) {
            if (source.orientation === Orientation.HORIZONTAL) {
                if (source.signature.position === SignaturePosition.TOP) {
                    firstSideCheck = false;
                    secondSideCheck = false;
                    for (let i = 0; i < mapStillages.length; i++) {
                        if ((mapStillages[i].x >= (source.x - 80) && mapStillages[i].x < source.x)
                            && (mapStillages[i].y <= (source.y + 25) && mapStillages[i].y >= source.y)) {
                            firstSideCheck = true;
                        }
                        if ((mapStillages[i].x > (source.x + 75) && mapStillages[i].x <= (source.x + 75 + 80))
                            && (mapStillages[i].y <= (source.y + 25) && mapStillages[i].y >= source.y)) {
                            secondSideCheck = true;
                        }
                    }
                    if (!firstSideCheck) {
                        fAddCircle = (
                            <Circle
                                key={source.key + '_addCircle_first'}
                                onTap={() => {
                                    this.addCircleClickAction(LayerType.STILLAGES, Position.LEFT)
                                }}
                                onClick={() => {
                                    this.addCircleClickAction(LayerType.STILLAGES, Position.LEFT)
                                }}
                                radius={10}
                                x={source.x - 20}
                                y={source.y + 7}
                                fill={'#E0E0E0'}
                            />
                        );
                        fAddCircleText = (
                            <Text
                                key={source.key + '_addCircle_plus_first'}
                                onTap={() => {
                                    this.addCircleClickAction(LayerType.STILLAGES, Position.LEFT)
                                }}
                                onClick={() => {
                                    this.addCircleClickAction(LayerType.STILLAGES, Position.LEFT)
                                }}
                                text={'+'}
                                x={source.x - 24.5}
                                y={source.y + 1}
                                fontSize={16}
                                height={100}
                                fontStyle={'bold'}
                                fill={'green'}
                            />
                        );
                    }
                    if (!secondSideCheck) {
                        sAddCircle = (
                            <Circle
                                key={source.key + '_addCircle_second'}
                                onTap={() => {
                                    this.addCircleClickAction(LayerType.STILLAGES, Position.RIGHT)
                                }}
                                onClick={() => {
                                    this.addCircleClickAction(LayerType.STILLAGES, Position.RIGHT)
                                }}
                                radius={10}
                                x={source.x + 95}
                                y={source.y + 7}
                                fill={'#E0E0E0'}
                            />
                        );
                        sAddCircleText = (
                            <Text
                                key={source.key + '_addCircle_plus_second'}
                                onTap={() => {
                                    this.addCircleClickAction(LayerType.STILLAGES, Position.RIGHT)
                                }}
                                onClick={() => {
                                    this.addCircleClickAction(LayerType.STILLAGES, Position.RIGHT)
                                }}
                                text={'+'}
                                x={source.x + 90.5}
                                y={source.y + 1}
                                fontSize={16}
                                height={100}
                                fontStyle={'bold'}
                                fill={'green'}
                            />
                        );
                    }
                } else {
                    firstSideCheck = false;
                    secondSideCheck = false;
                    for (let i = 0; i < mapStillages.length; i++) {
                        if ((mapStillages[i].x >= (source.x - 80) && mapStillages[i].x < source.x)
                            && (mapStillages[i].y <= (source.y + 25) && mapStillages[i].y >= source.y)) {
                            firstSideCheck = true;
                        }
                        if ((mapStillages[i].x > (source.x + 75) && mapStillages[i].x <= (source.x + 75 + 80))
                            && (mapStillages[i].y <= (source.y + 25) && mapStillages[i].y >= source.y)) {
                            secondSideCheck = true;
                        }
                    }
                    if (!firstSideCheck) {
                        fAddCircle = (
                            <Circle
                                key={source.key + '_addCircle_first'}
                                onTap={() => {
                                    this.addCircleClickAction(LayerType.STILLAGES, Position.LEFT)
                                }}
                                onClick={() => {
                                    this.addCircleClickAction(LayerType.STILLAGES, Position.LEFT)
                                }}
                                radius={10}
                                x={source.x - 20}
                                y={source.y + 15}
                                fill={'#E0E0E0'}
                            />
                        );
                        fAddCircleText = (
                            <Text
                                key={source.key + '_addCircle_plus_first'}
                                onTap={() => {
                                    this.addCircleClickAction(LayerType.STILLAGES, Position.LEFT)
                                }}
                                onClick={() => {
                                    this.addCircleClickAction(LayerType.STILLAGES, Position.LEFT)
                                }}
                                text={'+'}
                                x={source.x - 24.5}
                                y={source.y + 9}
                                fontSize={16}
                                height={100}
                                fontStyle={'bold'}
                                fill={'green'}
                            />
                        );
                    }
                    if (!secondSideCheck) {
                        sAddCircle = (
                            <Circle
                                key={source.key + '_addCircle_second'}
                                onTap={() => {
                                    this.addCircleClickAction(LayerType.STILLAGES, Position.RIGHT)
                                }}
                                onClick={() => {
                                    this.addCircleClickAction(LayerType.STILLAGES, Position.RIGHT)
                                }}
                                radius={10}
                                x={source.x + 95}
                                y={source.y + 15}
                                fill={'#E0E0E0'}
                            />
                        );
                        sAddCircleText = (
                            <Text
                                key={source.key + '_addCircle_plus_second'}
                                onTap={() => {
                                    this.addCircleClickAction(LayerType.STILLAGES, Position.RIGHT)
                                }}
                                onClick={() => {
                                    this.addCircleClickAction(LayerType.STILLAGES, Position.RIGHT)
                                }}
                                text={'+'}
                                x={source.x + 90.5}
                                y={source.y + 9}
                                fontSize={16}
                                height={100}
                                fontStyle={'bold'}
                                fill={'green'}
                            />
                        );
                    }
                }
            } else {
                if (source.signature.position === SignaturePosition.LEFT) {
                    firstSideCheck = false;
                    secondSideCheck = false;
                    for (let i = 0; i < mapStillages.length; i++) {
                        if ((mapStillages[i].y >= (source.y - 80) && mapStillages[i].y < source.y)
                            && (mapStillages[i].x <= (source.x + 25) && mapStillages[i].x >= source.x)) {
                            firstSideCheck = true;
                        }
                        if ((mapStillages[i].y > (source.y + 75) && mapStillages[i].y <= (source.y + 75 + 80))
                            && (mapStillages[i].x <= (source.x + 25) && mapStillages[i].x >= source.x)) {
                            secondSideCheck = true;
                        }
                    }
                    if (!firstSideCheck) {
                        fAddCircle = (
                            <Circle
                                key={source.key + '_addCircle_first'}
                                onTap={() => {
                                    this.addCircleClickAction(LayerType.STILLAGES, Position.TOP)
                                }}
                                onClick={() => {
                                    this.addCircleClickAction(LayerType.STILLAGES, Position.TOP)
                                }}
                                radius={10}
                                x={source.x + 6}
                                y={source.y - 20}
                                fill={'#E0E0E0'}
                            />
                        );
                        fAddCircleText = (
                            <Text
                                key={source.key + '_addCircle_plus_first'}
                                onTap={() => {
                                    this.addCircleClickAction(LayerType.STILLAGES, Position.TOP)
                                }}
                                onClick={() => {
                                    this.addCircleClickAction(LayerType.STILLAGES, Position.TOP)
                                }}
                                text={'+'}
                                x={source.x + 1.05}
                                y={source.y - 26}
                                fontSize={16}
                                height={100}
                                fontStyle={'bold'}
                                fill={'green'}
                            />
                        );
                    }

                    if (!secondSideCheck) {
                        sAddCircle = (
                            <Circle
                                key={source.key + '_addCircle_second'}
                                onTap={() => {
                                    this.addCircleClickAction(LayerType.STILLAGES, Position.BOTTOM)
                                }}
                                onClick={() => {
                                    this.addCircleClickAction(LayerType.STILLAGES, Position.BOTTOM)
                                }}
                                radius={10}
                                x={source.x + 6}
                                y={source.y + 95}
                                fill={'#E0E0E0'}
                            />
                        );
                        sAddCircleText = (
                            <Text
                                key={source.key + '_addCircle_plus_second'}
                                onTap={() => {
                                    this.addCircleClickAction(LayerType.STILLAGES, Position.BOTTOM)
                                }}
                                onClick={() => {
                                    this.addCircleClickAction(LayerType.STILLAGES, Position.BOTTOM)
                                }}
                                text={'+'}
                                x={source.x + 1.05}
                                y={source.y + 89}
                                fontSize={16}
                                height={100}
                                fontStyle={'bold'}
                                fill={'green'}
                            />
                        );
                    }
                } else if (source.signature.position === SignaturePosition.RIGHT) {
                    for (let i = 0; i < mapStillages.length; i++) {
                        if ((mapStillages[i].y >= (source.y - 80) && mapStillages[i].y < source.y)
                            && (mapStillages[i].x <= (source.x + 25) && mapStillages[i].x >= source.x)) {
                            firstSideCheck = true;
                        }
                        if ((mapStillages[i].y > (source.y + 75) && mapStillages[i].y <= (source.y + 75 + 80))
                            && (mapStillages[i].x <= (source.x + 25) && mapStillages[i].x >= source.x)) {
                            secondSideCheck = true;
                        }
                    }
                    if (!firstSideCheck) {
                        fAddCircle = (
                            <Circle
                                key={source.key + '_addCircle_first'}
                                onTap={() => {
                                    this.addCircleClickAction(LayerType.STILLAGES, Position.TOP)
                                }}
                                onClick={() => {
                                    this.addCircleClickAction(LayerType.STILLAGES, Position.TOP)
                                }}
                                radius={10}
                                x={source.x + 15}
                                y={source.y - 20}
                                fill={'#E0E0E0'}
                            />
                        );
                        fAddCircleText = (
                            <Text
                                key={source.key + '_addCircle_plus_first'}
                                onTap={() => {
                                    this.addCircleClickAction(LayerType.STILLAGES, Position.TOP)
                                }}
                                onClick={() => {
                                    this.addCircleClickAction(LayerType.STILLAGES, Position.TOP)
                                }}
                                text={'+'}
                                x={source.x + 10.05}
                                y={source.y - 26}
                                fontSize={16}
                                height={100}
                                fontStyle={'bold'}
                                fill={'green'}
                            />
                        );
                    }

                    if (!secondSideCheck) {
                        sAddCircle = (
                            <Circle
                                key={source.key + '_addCircle_second'}
                                onTap={() => {
                                    this.addCircleClickAction(LayerType.STILLAGES, Position.BOTTOM)
                                }}
                                onClick={() => {
                                    this.addCircleClickAction(LayerType.STILLAGES, Position.BOTTOM)
                                }}
                                radius={10}
                                x={source.x + 15}
                                y={source.y + 95}
                                fill={'#E0E0E0'}
                            />
                        );
                        sAddCircleText = (
                            <Text
                                key={source.key + '_addCircle_plus_second'}
                                onTap={() => {
                                    this.addCircleClickAction(LayerType.STILLAGES, Position.BOTTOM)
                                }}
                                onClick={() => {
                                    this.addCircleClickAction(LayerType.STILLAGES, Position.BOTTOM)
                                }}
                                text={'+'}
                                x={source.x + 10.05}
                                y={source.y + 89}
                                fontSize={16}
                                height={100}
                                fontStyle={'bold'}
                                fill={'green'}
                            />
                        );
                    }
                }
            }
        }

        return [fAddCircle, sAddCircle, fAddCircleText, sAddCircleText];
    }
}