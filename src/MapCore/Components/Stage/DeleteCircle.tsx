import React from 'react';
import IDeleteCircleProps from "../../Models/Components/DeleteCircle/IDeleteCircleProps";
import IDeleteCircleState from "../../Models/Components/DeleteCircle/IDeleteCircleState";
import {Circle, Text} from "react-konva";
import LayerType from "../../Models/Enums/LayerType";
import Orientation from "../../Models/Enums/Orientation";
import SignaturePosition from "../../Models/Enums/SignaturePosition";

export default class DeleteCircle extends React.Component<IDeleteCircleProps, IDeleteCircleState> {
    constructor(props) {
        super(props);
        this.state = {
            source: this.props.source,
            parentType: this.props.parentType,
        }
    }

    render() {
        const { source, parentType } = this.state;
        let deleteCircle;
        let deleteCross;

        if (parentType === LayerType.STILLAGES) {
            if (source.signature.position === SignaturePosition.BOTTOM || source.signature.position === SignaturePosition.RIGHT) {
                deleteCircle = (
                    <Circle
                        key={source.key + '_deleteCircle_circle'}
                        // onTap={() => { this.openModal() }}
                        // onClick={() => { this.openModal() }}
                        radius={10}
                        x={source.x - 10}
                        y={source.y - 20}
                        fill={'#E0E0E0'}
                    />
                );
                deleteCross = (
                    <Text
                        key={source.key + '_deleteCircle_deleteCross'}
                        text={'x'}
                        x={source.x - 15}
                        y={source.y - 27}
                        fontSize={16}
                        height={100}
                        fontStyle={'bold'}
                        fill={'red'}
                    />
                );
            } else if (source.orientation === Orientation.HORIZONTAL && source.signature.position === SignaturePosition.TOP) {
                deleteCircle = (
                    <Circle
                        key={source.key + '_deleteCircle_circle'}
                        // onTap={() => { this.openModal() }}
                        // onClick={() => { this.openModal() }}
                        radius={10}
                        x={source.x - 10}
                        y={source.y - 35}
                        fill={'#E0E0E0'}
                    />
                );
                deleteCross = (
                    <Text
                        key={source.key + '_deleteCircle_deleteCross'}
                        text={'x'}
                        x={source.x - 15}
                        y={source.y - 42}
                        fontSize={16}
                        height={100}
                        fontStyle={'bold'}
                        fill={'red'}
                    />
                );
            } else if (source.orientation === Orientation.VERTICAL && source.signature.position === SignaturePosition.LEFT) {
                deleteCircle = (
                    <Circle
                        key={source.key + '_deleteCircle_circle'}
                        // onTap={() => { this.openModal() }}
                        // onClick={() => { this.openModal() }}
                        radius={10}
                        x={source.x - 35}
                        y={source.y - 10}
                        fill={'#E0E0E0'}
                    />
                );
                deleteCross = (
                    <Text
                        key={source.key + '_deleteCircle_deleteCross'}
                        text={'x'}
                        x={source.x - 40}
                        y={source.y - 17}
                        fontSize={16}
                        height={100}
                        fontStyle={'bold'}
                        fill={'red'}
                    />
                );
            }
        }
        return [deleteCircle, deleteCross];
    }
}