import React from 'react';
import { Circle, Rect, Text } from "react-konva";
import GlobalsatBangProps from "../Models/Components/GlobalsatBang/GlobalsatBangProps";
import GlobalsatBangState from "../Models/Components/GlobalsatBang/GlobalsatBangState";
import Konva from "konva";
import StillageItem from "../Models/ArrayItems/StillageItem";
import Orientation from "../Models/Enums/Orientation";
import GlobalsatBangModel from "../Models/ArrayItems/GlobalsatBang";

let bigRect;
let transRect;
let smallRect;
let closeTextNode;
let backTextNode;
let forwardTextNode;

let animation;

export default class GlobalsatBang extends React.PureComponent<GlobalsatBangProps, GlobalsatBangState> {
    constructor(props: GlobalsatBangProps) {
        super(props);

        let sts: { LOW?: StillageItem, HIGH?: StillageItem } = {};
        try {
            props.stillages.forEach(el => {
                if (el.id === props.source.section1ID) sts.LOW = el;
                if (el.id === props.source.section2ID) sts.HIGH = el;
            });
        } catch { }

        let sectionBangs: Array<GlobalsatBangModel> = [];
        try {
            props.bangs.forEach(el => el.section2ID === sts.HIGH!.id && sectionBangs.push(el));
        } catch { }

        this.state = {
            selectedBangIndex: 0,
            isInfoRect: false,
            parentKey: this.props.parentKey,
            source: this.props.source,
            stillages: this.props.stillages,
            rect: {},
            needStillages: sts,
            bangs: sectionBangs
        };
    }

    bangClickAction = () => {
        console.log(this.state.bangs);
        this.setState({ isInfoRect: true });
    };

    componentDidMount(): void {
        // let amplitude = 1;
        // let period = 1200;
        // try {
        //     [bigRect, transRect, smallRect].forEach(el => {
        //         animation = new Konva.Animation(frame => {
        //             try {
        //                 el.opacity((Math.sin(frame!.time / period) + 1) / 2);
        //             } catch {
        //             }
        //         }, el.getLayer());
        //         // animation.start();
        //     });
        // } catch { }
    }

    render() {
        const { needStillages, parentKey, stillages, source, isInfoRect, bangs, selectedBangIndex } = this.state;

        // let circles: Array<JSX.Element> = [];

        let _x, _y = 0;
        try {
            if (needStillages.LOW!.orientation === Orientation.VERTICAL) {
                if (source.isLeft) {
                    _x = needStillages.HIGH!.x;
                    _y = needStillages.HIGH!.y;
                } else {
                    _x = needStillages.HIGH!.x + 30 * needStillages.HIGH!.scale!;
                    _y = needStillages.HIGH!.y;
                }
            } else {
                if (source.isLeft) {
                    _x = needStillages.HIGH!.x;
                    _y = needStillages.HIGH!.y;
                } else {
                    _x = needStillages.HIGH!.x;
                    _y = needStillages.HIGH!.y + 30 * needStillages.HIGH!.scale!;
                }
            }

            let infoRect;
            if (isInfoRect) {
                infoRect = [
                    <Rect
                        key={`${parentKey}_infoRect`}
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
                        key={`${parentKey}_closeButton`}
                        x={_x + 93}
                        y={_y + 7}
                        ref={node => closeTextNode = node}
                        onMouseOver={() => closeTextNode.fill('red')}
                        onMouseLeave={() => closeTextNode.fill('#BDBDBD')}
                        fontSize={15}
                        text={'закрыть'}
                        fontStyle={'bold'}
                        fill={'#BDBDBD'}
                        onClick={() => this.setState({ isInfoRect: false })}
                    />,
                    <Text
                        key={`${parentKey}_rowTitle`}
                        x={_x + 20}
                        y={_y + 40}
                        fontSize={16}
                        text={`Ряд:`}
                        fontStyle={'bold'}
                        fill={'black'}
                    />,
                    <Text
                        key={`${parentKey}_rowTitleValue`}
                        x={_x + 150}
                        y={_y + 40}
                        fontSize={15}
                        text={bangs[selectedBangIndex].row}
                        fontStyle={'normal'}
                        fill={'#666666'}
                    />,
                    <Text
                        key={`${parentKey}_placeTitle`}
                        x={_x + 20}
                        y={_y + 65}
                        fontSize={16}
                        text={`Место: `}
                        fontStyle={'bold'}
                        fill={'black'}
                    />,
                    <Text
                        key={`${parentKey}_placeTitleValue`}
                        x={_x + 150}
                        y={_y + 65}
                        fontSize={15}
                        text={`${bangs[selectedBangIndex].place2}`}
                        fontStyle={'normal'}
                        fill={'#666666'}
                    />,
                    <Text
                        key={`${parentKey}_dateTitle`}
                        x={_x + 20}
                        y={_y + 90}
                        fontSize={16}
                        text={`Дата: `}
                        fontStyle={'bold'}
                        fill={'black'}
                    />,
                    <Text
                        key={`${parentKey}_dateTitleValue`}
                        x={_x + 150}
                        y={_y + 90}
                        fontSize={15}
                        text={`${bangs[selectedBangIndex].bangDate.split('T')[0]}`}
                        fontStyle={'normal'}
                        fill={'#666666'}
                    />,
                    <Text
                        key={`${parentKey}_timeTitle`}
                        x={_x + 20}
                        y={_y + 115}
                        fontSize={16}
                        text={`Время: `}
                        fontStyle={'bold'}
                        fill={'black'}
                    />,
                    <Text
                        key={`${parentKey}_timeTitleValue`}
                        x={_x + 150}
                        y={_y + 115}
                        fontSize={15}
                        text={`${bangs[selectedBangIndex].bangDate.split('T')[1]}`}
                        fontStyle={'normal'}
                        fill={'#666666'}
                    />,
                    <Text
                        key={`${parentKey}_strengthTitle`}
                        x={_x + 20}
                        y={_y + 140}
                        fontSize={16}
                        text={`Сила: `}
                        fontStyle={'bold'}
                        fill={'black'}
                    />,
                    <Text
                        key={`${parentKey}_strengthTitleValue`}
                        x={_x + 150}
                        y={_y + 140}
                        fontSize={15}
                        text={`${bangs[selectedBangIndex].strength.toFixed(2)}`}
                        fontStyle={'normal'}
                        fill={'#666666'}
                    />,
                    <Text
                        key={`${parentKey}_backButton`}
                        x={_x + 65}
                        y={_y + 175}
                        ref={node => backTextNode = node}
                        onMouseOver={() => backTextNode.fill('red')}
                        onMouseLeave={() => backTextNode.fill('blue')}
                        fontSize={15}
                        text={'назад'}
                        fontStyle={'bold'}
                        fill={'blue'}
                        onClick={() => this.setState({ selectedBangIndex: selectedBangIndex === 0 ? selectedBangIndex : selectedBangIndex - 1 })}
                    />,
                    <Text
                        key={`${parentKey}_forwardButton`}
                        x={_x + 130}
                        y={_y + 175}
                        ref={node => forwardTextNode = node}
                        onMouseOver={() => forwardTextNode.fill('red')}
                        onMouseLeave={() => forwardTextNode.fill('blue')}
                        fontSize={15}
                        text={'вперёд'}
                        fontStyle={'bold'}
                        fill={'blue'}
                        onClick={() => this.setState({ selectedBangIndex: selectedBangIndex + 1 })}
                    />,
                ];
            }

            return [
                <Circle
                    key={`${parentKey}_rect1`}
                    x={_x}
                    y={_y}
                    fill={'#9b2d30'}
                    radius={15}
                    onClick={this.bangClickAction}
                    ref={node => {
                        bigRect = node;
                    }}
                />,
                <Circle
                    key={`${parentKey}_rect2`}
                    x={_x}
                    y={_y}
                    fill={'white'}
                    radius={9}
                    onClick={this.bangClickAction}
                    ref={node => {
                        transRect = node;
                    }}
                />,
                <Circle
                    key={`${parentKey}_rect3`}
                    x={_x}
                    y={_y}
                    fill={'#9b2d30'}
                    radius={3}
                    onClick={this.bangClickAction}
                    ref={node => {
                        smallRect = node;
                    }}
                />,
                infoRect
            ];

        } catch { }



        return [
            <Circle
                key={`${parentKey}_rect2`}
                x={100}
                y={100}
                fill={'white'}
                radius={3}
            />,
        ];

    }
}