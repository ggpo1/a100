import React, {useState} from 'react';
import {Arrow} from 'react-konva';
import IDeviationProps from "../Models/Components/Deviation/IDeviationProps";
import StillageItem from "../Models/ArrayItems/StillageItem";
import DeviationItem from "../Models/ArrayItems/DeviationItem";
import Orientation from "../Models/Enums/Orientation";
import SignaturePosition from "../Models/Enums/SignaturePosition";
import A100SectionSize from "../Data/A100SectionSize";

const LENGTHK = 3;

const Deviation = (props: IDeviationProps) => {
    const [source, setSource] = useState<DeviationItem>(props.source!);
    const [parentSource, setParentSource] = useState<StillageItem>(props.parentSource);

    let startX, startY, endX, endY, pointerLength, pointerWidth = 0;

    if (parentSource.orientation === Orientation.VERTICAL) {
        pointerLength = 3;
        pointerWidth = 2;
        if (source.deviationPosition === SignaturePosition.TOP) {
            if (source.arrowFirstToSecond) {
                startX = source.x;
                startY = source.y;
                endX = source.x + A100SectionSize - LENGTHK;
                endY = source.y;
            } else {
                startX = source.x + A100SectionSize;
                startY = source.y;
                endX = source.x + LENGTHK;
                endY = source.y;
            }
        } else if (source.deviationPosition === SignaturePosition.BOTTOM) {
            if (source.arrowFirstToSecond) {
                startX = source.x;
                startY = source.y + A100SectionSize * parentSource.pmCount!;
                endX = source.x + A100SectionSize - LENGTHK;
                endY = source.y + A100SectionSize * parentSource.pmCount!;
            } else {
                startX = source.x + A100SectionSize;
                startY = source.y + A100SectionSize * parentSource.pmCount!;
                endX = source.x + LENGTHK;
                endY = source.y + A100SectionSize * parentSource.pmCount!;
            }
        }
    } else if (parentSource.orientation === Orientation.HORIZONTAL) {
        pointerLength = 3;
        pointerWidth = 2;
        if (source.deviationPosition === SignaturePosition.LEFT) {
            if (source.arrowFirstToSecond) {
                startX = source.x;
                startY = source.y;
                endX = source.x;
                endY = source.y + A100SectionSize - LENGTHK;
            } else {
                startX = source.x;
                startY = source.y + A100SectionSize;
                endX = source.x;
                endY = source.y + LENGTHK;
            }
        } else if (source.deviationPosition === SignaturePosition.RIGHT) {
            if (source.arrowFirstToSecond) {
                startX = source.x + A100SectionSize * parentSource.pmCount!;
                startY = source.y;
                endX = source.x + A100SectionSize * parentSource.pmCount!;
                endY = source.y + A100SectionSize - LENGTHK;
            } else {
                startX = source.x + A100SectionSize * parentSource.pmCount!;
                startY = source.y + A100SectionSize;
                endX = source.x + A100SectionSize * parentSource.pmCount!;
                endY = source.y + LENGTHK;
            }
        }
    }

    return (
        <Arrow
            points={[startX, startY, endX, endY]}
            stroke={'red'}
            pointerLength={pointerLength}
            pointerWidth={pointerWidth}
        />
    );
};

export  default Deviation;