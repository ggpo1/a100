import React from 'react';
import IAddCircleProps from "../../Models/Components/AddCircle/IAddCircleProps";
import IAddCircleState from "../../Models/Components/AddCircle/IAddCircleState";
import LayerType from "../../Models/Enums/LayerType";
import {Circle, Text} from "react-konva";
import Orientation from "../../Models/Enums/Orientation";
import SignaturePosition from "../../Models/Enums/SignaturePosition";

export default class AddCircle extends React.Component<IAddCircleProps, IAddCircleState> {
    constructor(props) {
        super(props);
        this.state = {
            source: this.props.source,
            parentType: this.props.parentType
        }
    }

    render() {
        const {source, parentType} = this.state;
        let fAddCircle, sAddCircle, fAddCircleText, sAddCircleText;

        if (parentType === LayerType.STILLAGES) {
            if (source.orientation === Orientation.HORIZONTAL) {
                if (source.signature.position === SignaturePosition.TOP) {
                    fAddCircle = (
                        <Circle
                            key={source.key + '_addCircle_first'}
                            // onTap={() => { this.deleteShape(LayerType.STILLAGES) }}
                            // onClick={() => { this.deleteShape(LayerType.STILLAGES) }}
                            radius={10}
                            x={source.x - 20}
                            y={source.y + 7}
                            fill={'#E0E0E0'}
                        />
                    );
                    fAddCircleText = (
                        <Text
                            key={source.key + '_addCircle_plus_first'}
                            // onTap={() => { this.deleteShape(LayerType.STILLAGES) }}
                            // onClick={() => { this.deleteShape(LayerType.STILLAGES) }}
                            text={'+'}
                            x={source.x - 24.5}
                            y={source.y + 1}
                            fontSize={16}
                            height={100}
                            fontStyle={'bold'}
                            fill={'green'}
                        />
                    );

                    sAddCircle = (
                        <Circle
                            key={source.key + '_addCircle_second'}
                            // onTap={() => { this.deleteShape(LayerType.STILLAGES) }}
                            // onClick={() => { this.deleteShape(LayerType.STILLAGES) }}
                            radius={10}
                            x={source.x + 95}
                            y={source.y + 7}
                            fill={'#E0E0E0'}
                        />
                    );
                    sAddCircleText = (
                        <Text
                            key={source.key + '_addCircle_plus_second'}
                            // onTap={() => { this.deleteShape(LayerType.STILLAGES) }}
                            // onClick={() => { this.deleteShape(LayerType.STILLAGES) }}
                            text={'+'}
                            x={source.x + 90.5}
                            y={source.y + 1}
                            fontSize={16}
                            height={100}
                            fontStyle={'bold'}
                            fill={'green'}
                        />
                    );
                } else {
                    fAddCircle = (
                        <Circle
                            key={source.key + '_addCircle_first'}
                            // onTap={() => { this.deleteShape(LayerType.STILLAGES) }}
                            // onClick={() => { this.deleteShape(LayerType.STILLAGES) }}
                            radius={10}
                            x={source.x - 20}
                            y={source.y + 15}
                            fill={'#E0E0E0'}
                        />
                    );
                    fAddCircleText = (
                        <Text
                            key={source.key + '_addCircle_plus_first'}
                            // onTap={() => { this.deleteShape(LayerType.STILLAGES) }}
                            // onClick={() => { this.deleteShape(LayerType.STILLAGES) }}
                            text={'+'}
                            x={source.x - 24.5}
                            y={source.y + 9}
                            fontSize={16}
                            height={100}
                            fontStyle={'bold'}
                            fill={'green'}
                        />
                    );

                    sAddCircle = (
                        <Circle
                            key={source.key + '_addCircle_second'}
                            // onTap={() => { this.deleteShape(LayerType.STILLAGES) }}
                            // onClick={() => { this.deleteShape(LayerType.STILLAGES) }}
                            radius={10}
                            x={source.x + 95}
                            y={source.y + 15}
                            fill={'#E0E0E0'}
                        />
                    );
                    sAddCircleText = (
                        <Text
                            key={source.key + '_addCircle_plus_second'}
                            // onTap={() => { this.deleteShape(LayerType.STILLAGES) }}
                            // onClick={() => { this.deleteShape(LayerType.STILLAGES) }}
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
            } else {
                if (source.signature.position === SignaturePosition.LEFT) {
                    fAddCircle = (
                        <Circle
                            key={source.key + '_addCircle_first'}
                            // onTap={() => { this.deleteShape(LayerType.STILLAGES) }}
                            // onClick={() => { this.deleteShape(LayerType.STILLAGES) }}
                            radius={10}
                            x={source.x + 6}
                            y={source.y - 20}
                            fill={'#E0E0E0'}
                        />
                    );
                    fAddCircleText = (
                        <Text
                            key={source.key + '_addCircle_plus_first'}
                            // onTap={() => { this.deleteShape(LayerType.STILLAGES) }}
                            // onClick={() => { this.deleteShape(LayerType.STILLAGES) }}
                            text={'+'}
                            x={source.x + 1.05}
                            y={source.y - 26}
                            fontSize={16}
                            height={100}
                            fontStyle={'bold'}
                            fill={'green'}
                        />
                    );

                    sAddCircle = (
                        <Circle
                            key={source.key + '_addCircle_second'}
                            // onTap={() => { this.deleteShape(LayerType.STILLAGES) }}
                            // onClick={() => { this.deleteShape(LayerType.STILLAGES) }}
                            radius={10}
                            x={source.x + 6}
                            y={source.y + 95}
                            fill={'#E0E0E0'}
                        />
                    );
                    sAddCircleText = (
                        <Text
                            key={source.key + '_addCircle_plus_second'}
                            // onTap={() => { this.deleteShape(LayerType.STILLAGES) }}
                            // onClick={() => { this.deleteShape(LayerType.STILLAGES) }}
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
            }
        }

        return [fAddCircle, sAddCircle, fAddCircleText, sAddCircleText];
    }
}