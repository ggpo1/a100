import React, {useState} from 'react';
import {Text, Rect} from 'react-konva';

import GlobalsatInfoModalProps from '../../../Models/Components/GlobalsatInfoModal/IGlobalsatInfoModalProps';
import GlobalsatInfoType from './../../../Models/Enums/GlobalsatInfoType';
import StillageItem from './../../../Models/ArrayItems/StillageItem';
import Orientation from './../../../Models/Enums/Orientation';
import GlobalsatDeviation from './../../../../A100/model/GlobalsatDeviation';
import GlobalsatBang from '../../../Models/ArrayItems/GlobalsatBang';

function GlobalsatInfoModal(props: GlobalsatInfoModalProps): any {
    const [source] = useState<typeof props.source>(props.source);
    const [selectedInfo, setSelectedInfo] = useState<number>(0);

    // let sourceByType = () => {
    //     if (type === GlobalsatInfoType.BANG) return source as GlobalsatBang;
    //     if (type === GlobalsatInfoType.DEVIATION) return source as GlobalsatDeviation;
    // }

    let sts: { LOW?: StillageItem, HIGH?: StillageItem } = {};

    if (source.stillagesList !== undefined && source !== undefined) {
        source.stillagesList.forEach(el => {
            if (el.id === (
                source.type === GlobalsatInfoType.BANG ? source.bangsList![selectedInfo].section1ID : source.deviationsList![selectedInfo].section1ID
            )) sts.LOW = el;
            if (el.id === (
                source.type === GlobalsatInfoType.BANG ? source.bangsList![selectedInfo].section2ID : source.deviationsList![selectedInfo].section2ID
            )) sts.HIGH = el;
        });


        let _x, _y, _width, _height = 0;
        if (sts.HIGH!.orientation === Orientation.HORIZONTAL) {
            _x = sts.HIGH!.x - 2.5;
            _y = sts.HIGH!.y + 2;
            _width = 5;
            _height = 26;
        } else {
            _x = sts.HIGH!.x + 2;
            _y = sts.HIGH!.y - 2.5;
            _width = 26;
            _height = 5;
        }

        if (source.type === GlobalsatInfoType.BANG) {
            return [
                <Text
                    key={`${source.parentKey}_deviation_strengthTitle`}
                    x={0}
                    y={0}
                    fontSize={16}
                    text={` `}
                    fontStyle={'bold'}
                    fill={'white'}
                />,
            ];
        } else if (source.type === GlobalsatInfoType.DEVIATION) {
            return [
                <Rect
                    key={`${source.parentKey}_deviation_infoRect`}
                    x={_x}
                    y={_y}
                    fill={'white'}
                    width={250}
                    height={200}
                    shadowColor={'rgba(0,0,0,0.75)'}
                    shadowOffsetX={0}
                    shadowOffsetY={0}
                    shadowBlur={30}
                    strokeWidth={0.5}
                    stroke={'#BDBDBD'}
                    cornerRadius={10}
                />,
                <Text
                    key={`${source.parentKey}_deviation_closeButton`}
                    x={_x + 93}
                    y={_y + 7}
                    // ref={node => closeTextNode = node}
                    // onMouseOver={() => closeTextNode.fill('red')}
                    // onMouseLeave={() => closeTextNode.fill('#BDBDBD')}
                    fontSize={15}
                    text={'закрыть'}
                    fontStyle={'bold'}
                    fill={'#BDBDBD'}
                    // onClick={() => this.setState({isInfoRect: false})}
                />,
                <Text
                    key={`${source.parentKey}_deviation_rowTitle`}
                    x={_x + 20}
                    y={_y + 40}
                    fontSize={16}
                    text={`Ряд:`}
                    fontStyle={'bold'}
                    fill={'black'}
                />,
                <Text
                    key={`${source.parentKey}_deviation_rowTitleValue`}
                    x={_x + 150}
                    y={_y + 40}
                    fontSize={15}
                    text={source.deviationsList![selectedInfo].row}
                    fontStyle={'normal'}
                    fill={'#666666'}
                />,
                <Text
                    key={`${source.parentKey}_deviation_placeTitle`}
                    x={_x + 20}
                    y={_y + 65}
                    fontSize={16}
                    text={`Место: `}
                    fontStyle={'bold'}
                    fill={'black'}
                />,
                <Text
                    key={`${source.parentKey}_deviation_placeTitleValue`}
                    x={_x + 150}
                    y={_y + 65}
                    fontSize={15}
                    text={source.deviationsList![selectedInfo].place2}
                    fontStyle={'normal'}
                    fill={'#666666'}
                />,
                <Text
                    key={`${source.parentKey}_dateTitle`}
                    x={_x + 20}
                    y={_y + 90}
                    fontSize={16}
                    text={`Дата: `}
                    fontStyle={'bold'}
                    fill={'black'}
                />,
                <Text
                    key={`${source.parentKey}_deviation_dateTitleValue`}
                    x={_x + 150}
                    y={_y + 90}
                    fontSize={15}
                    text={`${source.deviationsList![selectedInfo].deviationDate.split('T')[0]}`}
                    fontStyle={'normal'}
                    fill={'#666666'}
                />,
                <Text
                    key={`${source.parentKey}_deviation_timeTitle`}
                    x={_x + 20}
                    y={_y + 115}
                    fontSize={16}
                    text={`Время: `}
                    fontStyle={'bold'}
                    fill={'black'}
                />,
                <Text
                    key={`${source.parentKey}_deviation_timeTitleValue`}
                    x={_x + 150}
                    y={_y + 115}
                    fontSize={15}
                    text={`${source.deviationsList![selectedInfo].deviationDate.split('T')[1]}`}
                    fontStyle={'normal'}
                    fill={'#666666'}
                />,
                <Text
                    key={`${source.parentKey}_deviation_strengthTitle`}
                    x={_x + 20}
                    y={_y + 140}
                    fontSize={16}
                    text={`Отклонение: `}
                    fontStyle={'bold'}
                    fill={'black'}
                />,
                <Text
                    key={`${source.parentKey}_deviation_strengthTitleValue`}
                    x={_x + 150}
                    y={_y + 140}
                    fontSize={15}
                    text={`${parseFloat(source.deviationsList![selectedInfo].deviationValue).toFixed(2)}`}
                    fontStyle={'normal'}
                    fill={'#666666'}
                />,
                <Text
                    key={`${source.parentKey}_deviation_backButton`}
                    x={_x + 65}
                    y={_y + 175}
                    // ref={node => backTextNode = node}
                    // onMouseOver={() => backTextNode.fill('red')}
                    // onMouseLeave={() => backTextNode.fill('blue')}
                    fontSize={15}
                    text={'назад'}
                    fontStyle={'bold'}
                    fill={'blue'}
                    // onClick={() => this.setState({selectedBangIndex: selectedBangIndex === 0 ? selectedBangIndex : selectedBangIndex - 1})}
                />,
                <Text
                    key={`${source.parentKey}_deviation_forwardButton`}
                    x={_x + 130}
                    y={_y + 175}
                    // ref={node => forwardTextNode = node}
                    // onMouseOver={() => forwardTextNode.fill('red')}
                    // onMouseLeave={() => forwardTextNode.fill('blue')}
                    fontSize={15}
                    text={'вперёд'}
                    fontStyle={'bold'}
                    fill={'blue'}
                    // onClick={() => this.setState({selectedBangIndex: selectedBangIndex + 1})}
                />,
            ];
        }
        return [
            <Text
                key={`default`}
                x={0}
                y={0}
                fontSize={16}
                text={` `}
                fontStyle={'bold'}
                fill={'white'}
            />,
        ];
    }
}

export default GlobalsatInfoModal;