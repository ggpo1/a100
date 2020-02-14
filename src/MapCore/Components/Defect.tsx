import React from 'react';
import IDefectProps from './../Models/Components/Defect/IDefectProps';
import IDefectState from './../Models/Components/Defect/IDefectState';
import DefectRadiusReducer from '../Models/Enums/DefectRadius/DefectRadiusReducer';
import Orientation from './../Models/Enums/Orientation';
import { Circle } from 'react-konva';
import Emit from "../Data/Emit";


const A100CellSize = 30;
export default class Defect extends React.Component<IDefectProps, IDefectState> {
    constructor(props) {
        super(props);
        this.state = {
            parentSource: this.props.parentSource,
            parentScale: this.props.parentScale,
            isBlockScaling: this.props.isBlockScaling,
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
        console.log(this.state.source);
        Emit.Emitter.emit('setSelectedVik', this.state.source, this.state.parentSource);
        Emit.Emitter.emit('defectBrowsePanelWorkerHandle', true);
    }

    public thisForceUpdate(parentKey: string, newParentX: number, newParentY: number) {
        if (parentKey === this.state.parentKey) {
            this.setState({parentX: newParentX, parentY: newParentY})
        }
    };

    render() {
        const { parentX, parentY, parentOrientation, source, parentScale, isBlockScaling} = this.state;
        const defectRadiusReducer = new DefectRadiusReducer();
        let vik;
        // if (source == undefined) return <div></div>;

        const defectOptions = defectRadiusReducer.GetRadius(source.color);
        // TODO: block scaling

        let deltaX = 0;
        let deltaY = 0;

        // if (source.place === 1) {
        if (parentOrientation === Orientation.HORIZONTAL) {
            deltaX = 15 + ((source.place - 1) * 30);
            deltaY = 15;
            vik = (
                <Circle
                    key={'defect_circle_' + '_' + parentX + '_' + parentY + '_' + parentOrientation + '_' + source.place + '_' + source.level + '_' + source.color}
                    onTap={() => {
                        this.openModal()
                    }}
                    onClick={() => {
                        this.openModal()
                    }}
                    radius={defectOptions.radius}
                    x={parentX + deltaX}
                    y={parentY + deltaY}
                    fill={source.color}
                />
            );
        } else if (parentOrientation === Orientation.VERTICAL) {
            deltaX = 15;
            deltaY = 15 + ((source.place - 1) * 30);
            vik = (
                <Circle
                    key={'defect_circle_' + '_' + parentX + '_' + parentY + '_' + parentOrientation + '_' + source.place + '_' + source.level + '_' + source.color}
                    onTap={() => {
                        this.openModal()
                    }}
                    onClick={() => {
                        this.openModal()
                    }}
                    radius={defectOptions.radius}
                    x={parentX + deltaX}
                    y={parentY + deltaY}
                    fill={source.color}
                />
            );
        }
        // } else if (source.place === 2) {
        //     if (parentOrientation === Orientation.VERTICAL) {
        //
        //         // other colors
        //         vik = (
        //             <Circle
        //                 key={'defect_circle_' + '_' + parentX + '_' + parentY + '_' + parentOrientation + '_' + source.place + '_' + source.level + '_' + source.color}
        //                 onTap={() => { this.openModal() }}
        //                 onClick={() => { this.openModal() }}
        //                 radius={defectOptions.radius}
        //                 x={parentX + (defectOptions.radius + defectOptions.centeringValue)}
        //                 y={parentY + (defectOptions.radius + defectOptions.centeringValue + 12.5 * 2)}
        //                 fill={source.color}
        //             />
        //         );
        //
        //
        //     } else {
        //         // place 2 and orientation is horizontal
        //
        //         vik = (
        //             <Circle
        //                 key={'defect_circle_' + '_' + parentX + '_' + parentY + '_' + parentOrientation + '_' + source.place + '_' + source.level + '_' + source.color}
        //                 onTap={() => { this.openModal() }}
        //                 onClick={() => { this.openModal() }}
        //                 radius={defectOptions.radius}
        //                 x={parentX + (defectOptions.radius + defectOptions.centeringValue + 12.5 * 2)}
        //                 y={parentY + (defectOptions.radius + defectOptions.centeringValue)}
        //                 fill={source.color}
        //             />
        //         );
        //
        //     }
        // } else if (source.place === 3) {
        //     if (parentOrientation === Orientation.VERTICAL) {
        //         // place 3 and orientation is vertical
        //
        //         // other colors
        //         vik = (
        //             <Circle
        //                 key={'defect_circle_' + '_' + parentX + '_' + parentY + '_' + parentOrientation + '_' + source.place + '_' + source.level + '_' + source.color}
        //                 onTap={() => { this.openModal() }}
        //                 onClick={() => { this.openModal() }}
        //                 radius={defectOptions.radius}
        //                 x={parentX + (defectOptions.radius + defectOptions.centeringValue)}
        //                 y={parentY + (defectOptions.radius + defectOptions.centeringValue + 12.5 * 4)}
        //                 fill={source.color}
        //             />
        //         );
        //
        //     } else {
        //         // place 3 and orientations is horizontal
        //
        //         // other color
        //         vik = (
        //             <Circle
        //                 key={'defect_circle_' + '_' + parentX + '_' + parentY + '_' + parentOrientation + '_' + source.place + '_' + source.level + '_' + source.color}
        //                 onTap={() => { this.openModal() }}
        //                 onClick={() => { this.openModal() }}
        //                 radius={defectOptions.radius}
        //                 x={parentX + (defectOptions.radius + defectOptions.centeringValue + 12.5 * 4)}
        //                 y={parentY + (defectOptions.radius + defectOptions.centeringValue)}
        //                 fill={source.color}
        //             />
        //         );
        //
        //     }
        // }

        return vik;
    }
}