import React, { Component } from 'react';
import IDefectProps from './../Models/Components/Defect/IDefectProps';
import IDefectState from './../Models/Components/Defect/IDefectState';
import DefectRadiusReducer from '../Models/Enums/DefectRadius/DefectRadiusReducer';
import StillageSizeReducer from './../Models/Enums/StillageSize/StillageSizeReducer';
import DefectColors from './../Models/Enums/Colors/DefectColors';
import DefectRadius from '../Models/Enums/DefectRadius/DefectRadius';
import Orientation from './../Models/Enums/Orientation';
import { Circle } from 'react-konva';
import Emit from "../Data/Emit";

export default class Defect extends React.Component<IDefectProps, IDefectState> {
    constructor(props) {
        super(props);
        this.state = {
            parentKey: this.props.parentKey,
            parentX: this.props.parentX,
            parentY: this.props.parentY,
            parentOrientation: this.props.parentOrientation,
            source: this.props.source,
        };

        this.openModal = this.openModal.bind(this);
        this.thisForceUpdate = this.thisForceUpdate.bind(this);

        Emit.Emitter.addListener('defectsForceUpdate', this.thisForceUpdate);
    }

    public openModal() {
        // Emit.Emitter.emit('defectBrowsePanelWorkerHandle', true);
    }

    public thisForceUpdate(parentKey: string, newParentX: number, newParentY: number) {
        if (parentKey === this.state.parentKey) {
            this.setState({parentX: newParentX, parentY: newParentY})
        }
    };

    render() {
        const { parentX, parentY, parentOrientation, source } = this.state;
        const defectRadiusReducer = new DefectRadiusReducer();
        let vik;

        const defectOptions = defectRadiusReducer.GetRadius(source.color);
        if (source.place === 1) {
            vik =
                <Circle
                    key={'defect_circle_' + '_' + parentX + '_' + parentY + '_' + parentOrientation + '_' + source.place + '_' + source.level + '_' + source.color}
                    onTap={() => { this.openModal() }}
                    onClick={() => { this.openModal() }}
                    radius={defectOptions.radius}
                    x={parentX + (defectOptions.radius + defectOptions.centeringValue)}
                    y={parentY + (defectOptions.radius + defectOptions.centeringValue)}
                    fill={source.color}
                />
                ;

        } else if (source.place === 2) {
            if (parentOrientation === Orientation.VERTICAL) {

                // other colors
                vik =
                    <Circle
                        key={'defect_circle_' + '_' + parentX + '_' + parentY + '_' + parentOrientation + '_' + source.place + '_' + source.level + '_' + source.color}
                        onTap={() => { this.openModal() }}
                        onClick={() => { this.openModal() }}
                        radius={defectOptions.radius}
                        x={parentX + (defectOptions.radius + defectOptions.centeringValue)}
                        y={parentY + (defectOptions.radius + defectOptions.centeringValue + 12.5 * 2)}
                        fill={source.color}
                    />
                    ;


            } else {
                // place 2 and orientation is horizontal

                vik =
                    <Circle
                        key={'defect_circle_' + '_' + parentX + '_' + parentY + '_' + parentOrientation + '_' + source.place + '_' + source.level + '_' + source.color}
                        onTap={() => { this.openModal() }}
                        onClick={() => { this.openModal() }}
                        radius={defectOptions.radius}
                        x={parentX + (defectOptions.radius + defectOptions.centeringValue + 12.5 * 2)}
                        y={parentY + (defectOptions.radius + defectOptions.centeringValue)}
                        fill={source.color}
                    />
                    ;

            }
        } else if (source.place === 3) {
            if (parentOrientation === Orientation.VERTICAL) {
                // place 3 and orientation is vertical

                // other colors
                vik =
                    <Circle
                        key={'defect_circle_' + '_' + parentX + '_' + parentY + '_' + parentOrientation + '_' + source.place + '_' + source.level + '_' + source.color}
                        onTap={() => { this.openModal() }}
                        onClick={() => { this.openModal() }}
                        radius={defectOptions.radius}
                        x={parentX + (defectOptions.radius + defectOptions.centeringValue)}
                        y={parentY + (defectOptions.radius + defectOptions.centeringValue + 12.5 * 4)}
                        fill={source.color}
                    />
                    ;

            } else {
                // place 3 and orientations is horizontal

                // other color
                vik =
                    <Circle
                        key={'defect_circle_' + '_' + parentX + '_' + parentY + '_' + parentOrientation + '_' + source.place + '_' + source.level + '_' + source.color}
                        onTap={() => { this.openModal() }}
                        onClick={() => { this.openModal() }}
                        radius={defectOptions.radius}
                        x={parentX + (defectOptions.radius + defectOptions.centeringValue + 12.5 * 4)}
                        y={parentY + (defectOptions.radius + defectOptions.centeringValue)}
                        fill={source.color}
                    />
                    ;

            }
        }

        return vik;
    }
}