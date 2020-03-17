import React from 'react';
import {Rect, Text} from 'react-konva';
import IGlobalsatDeviationProps from "../Models/Components/GlobalsatDeviation/IGlobalsatDeviationProps";
import IGlobalsatDeviationState from "../Models/Components/GlobalsatDeviation/IGlobalsatDeviationState";
import StillageItem from "../Models/ArrayItems/StillageItem";
import Orientation from "../Models/Enums/Orientation";
import Konva from "konva";
import Emit from "../Data/Emit";
import GlobalsatInfoType from "../Models/Enums/GlobalsatInfoType";
import IGlobalsatInfoSource from "../Models/Components/GlobalsatInfoModal/IGlobalsatInfoSource";

let rect;
let closeTextNode;
let backTextNode;
let forwardTextNode;

let animation;


export default class GlobalsatDeviation extends React.Component<IGlobalsatDeviationProps, IGlobalsatDeviationState> {
    constructor(readonly props: IGlobalsatDeviationProps) {
        super(props);
        let sts: { LOW?: StillageItem, HIGH?: StillageItem } = {};
        try {
            props.stillages.forEach((el) => {
                if (el.id === props.source.section1ID) sts.LOW = el;
                if (el.id === props.source.section2ID) sts.HIGH = el;
            });
        } catch {}

        this.state = {
            isInfoRect: false,
            parentKey: props.parentKey,
            source: props.source,
            stillages: props.stillages,
            needStillages: sts,
            deviations: props.deviations
        }
    }

    componentDidMount(): void {
        let amplitude = 1;
        let period = 500;
        try {
            animation = new Konva.Animation(frame => {
                try { rect.opacity((Math.sin(frame!.time / period) + 1) / 2); } catch {}
            }, rect.getLayer());
            animation.start();
        } catch {}
    }

    render() {
        const { needStillages, isInfoRect, parentKey, source, deviations, stillages } = this.state;

        if (needStillages.HIGH === undefined || needStillages.LOW === undefined)
            return (
                <Rect
                    x={100}
                    y={100}
                    width={5}
                    height={30}
                    fill={'white'}
                />
            );

        try {
            let _x, _y, _width, _height = 0;
            if (needStillages.HIGH!.orientation === Orientation.HORIZONTAL) {
                _x = needStillages.HIGH!.x - 2.5;
                _y = needStillages.HIGH!.y + 2;
                _width = 5;
                _height = 26;
            } else {
                _x = needStillages.HIGH!.x + 2;
                _y = needStillages.HIGH!.y - 2.5;
                _width = 26;
                _height = 5;
            }

            return [
                <Rect
                    key={`${parentKey}_deviation_rect`}
                    x={_x}
                    y={_y}
                    width={_width}
                    height={_height}
                    cornerRadius={5}
                    fill={'blue'}
                    onClick={() => Emit.Emitter.emit('openGlobalsatInfoModal', {
                        parentKey: parentKey,
                        type: GlobalsatInfoType.DEVIATION,
                        deviationsList: deviations,
                        stillagesList: stillages
                    } as IGlobalsatInfoSource)}
                    ref={node => rect = node}
                />,
            ];

        } catch {}

    }
}