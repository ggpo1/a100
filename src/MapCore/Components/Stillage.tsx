import React from 'react';
import Konva from 'konva';
import { Rect, Text } from 'react-konva';
import IStillageProps from './../Models/Components/Stillage/IStillageProps';
import IStillageState from './../Models/Components/Stillage/IStillageState';
import Orientation from './../Models/Enums/Orientation';
import StillageSizeReducer from './../Models/Enums/StillageSize/StillageSizeReducer';
import StillageColors from '../Models/Enums/Colors/StillageColors';
import Defect from './Defect';
import PlaceSignature from './PlaceSignature';

export default class Stillage extends React.Component<IStillageProps, IStillageState> {
    constructor(props) {
        super(props);
        this.state = {
            source: this.props.source,
        }
    }

    handleDragStart = e => {
        e.target.setAttrs({
            shadowOffset: {
                x: 2,
                y: 2
            },
            shadowColor: 'grey',
            scaleX: 1.1,
            scaleY: 1.1
        });
    };

    handleDragEnd = e => {
        e.target.to({
            duration: 0.5,
            easing: Konva.Easings.ElasticEaseOut,
            scaleX: 1,
            scaleY: 1,
            shadowOffset: null,
            shadowColor: 'white',
        });
    };

    render() {
        const { source } = this.state;
        const stillageSizeReducer = new StillageSizeReducer();
        let stillage;
        let viks: Array<JSX.Element> = [];
        let placeSignatures: Array<JSX.Element> = [];

        if (source.placeSignatures !== undefined) {
            let i = 0;
            source.placeSignatures.forEach(element => {
                placeSignatures.push(
                    <PlaceSignature
                        parentX={source.x}
                        parentY={source.y}
                        parentDefects={source.viks!}
                        parentOrientation={source.orientation}
                        source={element}
                    />
                );
            });
        }

        if (source.viks !== undefined) {
            let i = 0;
            source.viks!.forEach(element => {
                viks.push(
                    <Defect key={"defect_" + source.x + "_" + source.y + "_" + source.id + "_" + (++i)}
                        parentX={source.x}
                        parentY={source.y}
                        parentOrientation={source.orientation}
                        source={element}
                    />
                );                
            });
        }

        if (source.orientation === Orientation.HORIZONTAL) {
            stillage = (
                <Rect
                    x={source.x}
                    y={source.y}
                    width={stillageSizeReducer.GetSize(source.size).firstSide}
                    height={stillageSizeReducer.GetSize(source.size).secondSide}
                    fill={StillageColors.STILLAGE_NORMAL}
                    draggable
                    strokeWidth={1} // border width
                    stroke={StillageColors.STILLAGE_NORMAL_STROKE}
                    onDragStart={this.handleDragStart}
                    onDragEnd={this.handleDragEnd}
                />
            );
        } else if (source.orientation === Orientation.VERTICAL) {
            stillage = (
                <Rect
                    x={source.x}
                    y={source.y}
                    width={stillageSizeReducer.GetSize(source.size).secondSide}
                    height={stillageSizeReducer.GetSize(source.size).firstSide}
                    fill={StillageColors.STILLAGE_NORMAL}
                    draggable
                    strokeWidth={1} // border width
                    stroke={StillageColors.STILLAGE_NORMAL_STROKE}
                    onDragStart={this.handleDragStart}
                    onDragEnd={this.handleDragEnd}
                />
            );
        }
        // let text = <Text text="Тест" x={100} y={100} />
        let returns = [stillage, viks, placeSignatures]
        return returns;
    }
}
