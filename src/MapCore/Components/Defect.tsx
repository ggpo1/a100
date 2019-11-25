import React, { Component } from 'react';
import IDefectProps from './../Models/Components/Defect/IDefectProps';
import IDefectState from './../Models/Components/Defect/IDefectState';
import DefectRadiusReducer from '../Models/Enums/DefectRadius/DefectRadiusReducer';
import StillageSizeReducer from './../Models/Enums/StillageSize/StillageSizeReducer';
import DefectColors from './../Models/Enums/Colors/DefectColors';
import DefectRadius from '../Models/Enums/DefectRadius/DefectRadius';
import Orientation from './../Models/Enums/Orientation';
import { Circle } from 'react-konva';

export default class Defect extends React.Component<IDefectProps, IDefectState> {
    constructor(props) {
        super(props);
        this.state = {
            parentX: this.props.parentX,
            parentY: this.props.parentY,
            parentOrientation: this.props.parentOrientation,
            source: this.props.source,
        }
    }

    render() {
        const { parentX, parentY, parentOrientation, source } = this.state;
        let vik;
        const defectRadiusReducer = new DefectRadiusReducer();
        const stillageSizeReducer = new StillageSizeReducer();

        const defectOptions = defectRadiusReducer.GetRadius(source.color);
        if (source.place === 1) {
            if (source.color !== DefectColors.RED) {
                vik = 
                    <Circle
                        radius={defectOptions.radius}
                        x={parentX + (defectOptions.radius + defectOptions.centeringValue)}
                        y={parentY + (defectOptions.radius + defectOptions.centeringValue)}
                        fill={source.color}
                    />
                ;
            } else {
                vik = 
                    <Circle
                        radius={DefectRadius.RED}
                        x={parentX + DefectRadius.RED}
                        y={parentY + DefectRadius.RED}
                        fill={source.color}
                    />
                ;
            }
        } else if (source.place === 2) {
            if (parentOrientation === Orientation.VERTICAL) {
                // place 2 and orientation is vertical
                if (source.color === DefectColors.RED) {
                    // red color
                    vik = 
                        <Circle
                            radius={DefectRadius.RED}
                            x={parentX + DefectRadius.RED}
                            y={parentY + DefectRadius.RED * 3}
                            fill={source.color}
                        />
                    ;
                } else {
                    // other colors
                    vik = 
                        <Circle
                            radius={defectOptions.radius}
                            x={parentX + (defectOptions.radius + defectOptions.centeringValue)}
                            y={parentY + (defectOptions.radius + defectOptions.centeringValue + DefectRadius.RED * 2)}
                            fill={source.color}
                        />
                    ;
                }

            } else {
                // place 2 and orientation is horizontal
                if (source.color === DefectColors.RED) {
                    vik = 
                        <Circle
                            radius={defectOptions.radius}
                            x={parentX + defectOptions.radius * 3}
                            y={parentY + defectOptions.radius}
                            fill={source.color}
                        />
                    ;
                } else {
                    vik = 
                        <Circle
                            radius={defectOptions.radius}
                            x={parentX + (defectOptions.radius + defectOptions.centeringValue + DefectRadius.RED * 2)}
                            y={parentY + (defectOptions.radius + defectOptions.centeringValue)}
                            fill={source.color}
                        />
                    ;
                }
            }
        } else if (source.place === 3) {
            if (parentOrientation === Orientation.VERTICAL) {
                // place 3 and orientation is vertical
                if (source.color === DefectColors.RED) {
                    // red color
                    vik = 
                        <Circle
                            radius={DefectRadius.RED}
                            x={parentX + DefectRadius.RED}
                            y={parentY + DefectRadius.RED * 5}
                            fill={source.color}
                        />
                    ;
                } else {
                    // other colors
                    vik = 
                        <Circle
                            radius={defectOptions.radius}
                            x={parentX + (defectOptions.radius + defectOptions.centeringValue)}
                            y={parentY + (defectOptions.radius + defectOptions.centeringValue + DefectRadius.RED * 4)}
                            fill={source.color}
                        />
                    ;
                }
            } else {
                // place 3 and orientations is horizontal
                if (source.color === DefectColors.RED) {
                    // red color
                    vik = 
                        <Circle
                            radius={DefectRadius.RED}
                            x={parentX + DefectRadius.RED * 5}
                            y={parentY + DefectRadius.RED}
                            fill={source.color}
                        />
                    ;
                } else {
                    // other color
                    vik = 
                        <Circle
                            radius={defectOptions.radius}
                            x={parentX + (defectOptions.radius + defectOptions.centeringValue + DefectRadius.RED * 4)}
                            y={parentY + (defectOptions.radius + defectOptions.centeringValue)}
                            fill={source.color}
                        />
                    ;
                }
            }
        }

        return vik;
    }
}