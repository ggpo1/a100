import React from 'react';
import IMenuBarElementProps from './../../Models/Components/MenuBarElement/IMenuBarElementProps';
import IMenuBarElementState from './../../Models/Components/MenuBarElement/IMenuBarElementState';

import StillageSize from './../../Models/Enums/StillageSize/StillageSize';
import Orientation from './../../Models/Enums/Orientation';

import stillageBigVertLeft from "../../Assets/compStillageVertLeft.png";
import stillageBigVertRight from "../../Assets/compStillageVertRight.png";
import stillageBigHor from "../../Assets/compStillage.png";
import stillageBigHorTOP from "../../Assets/compStillageTop.png";
import stillageSmallHor from "../../Assets/compStillageSmall.png";
import stillageSmallHorTOP from "../../Assets/compStillageSmallTop.png";
import stillageSmallVertLeft from "../../Assets/compStillageSmallVertLeft.png";
import stillageSmallVertRight from "../../Assets/compStillageSmallVertRight.png";

import AppState from './../../Data/AppState';
import SignaturePosition from './../../Models/Enums/SignaturePosition';
import LayerType from './../../Models/Enums/LayerType';

class MenuBarElement extends React.Component<IMenuBarElementProps, IMenuBarElementState> {
    constructor(props) {
        super(props);
        this.state = {
            stillageSize: StillageSize.NORMAL,
            stillageOrientation: Orientation.HORIZONTAL,
            stillageCaption: false,
            source: this.props.source,
            wallOrientation: Orientation.HORIZONTAL,
        };

        AppState.State = {
            dragItemProps: {
                stillageClicked: false,
                droppedElementType: LayerType.STILLAGES,
                stillageSize: this.state.stillageSize,
                stillageOrientation: this.state.stillageOrientation,
                stillageCaption: SignaturePosition.BOTTOM
            }
        };

        this.mouseDownHandle = this.mouseDownHandle.bind(this);
        this.onClickHandle = this.onClickHandle.bind(this);
    }

    public onClickHandle(type: LayerType) {
        if (type === LayerType.STILLAGES) {
            AppState.State = {
                ...AppState.State,
                ...{ elementClicked: true }
            };
            console.log(AppState.State)
        } else if (type === LayerType.WALLS) {
            AppState.State = {
                ...AppState.State,
                ...{ elementClicked: true }
            };
        }
    }

    public mouseDownHandle(layerType: LayerType) {
        if (layerType === LayerType.STILLAGES) {
            if (this.state.stillageOrientation === Orientation.HORIZONTAL && this.state.stillageCaption) {
                AppState.State = {
                    dragItemProps: {
                        droppedElementType: layerType,
                        stillageSize: this.state.stillageSize,
                        stillageOrientation: this.state.stillageOrientation,
                        stillageCaption: SignaturePosition.BOTTOM
                    }
                }
            } else if (this.state.stillageOrientation === Orientation.HORIZONTAL && !this.state.stillageCaption) {
                AppState.State = {
                    dragItemProps: {
                        droppedElementType: layerType,
                        stillageSize: this.state.stillageSize,
                        stillageOrientation: this.state.stillageOrientation,
                        stillageCaption: SignaturePosition.TOP
                    }
                }
            } else if (this.state.stillageOrientation === Orientation.VERTICAL && this.state.stillageCaption) {
                AppState.State = {
                    dragItemProps: {
                        droppedElementType: layerType,
                        stillageSize: this.state.stillageSize,
                        stillageOrientation: this.state.stillageOrientation,
                        stillageCaption: SignaturePosition.RIGHT
                    }
                }
            } else if (this.state.stillageOrientation === Orientation.VERTICAL && !this.state.stillageCaption) {
                AppState.State = {
                    dragItemProps: {
                        droppedElementType: layerType,
                        stillageSize: this.state.stillageSize,
                        stillageOrientation: this.state.stillageOrientation,
                        stillageCaption: SignaturePosition.LEFT
                    }
                }
            }
        } else if (layerType === LayerType.WALLS) {
            console.log(layerType);
            console.log(this.state.wallOrientation)
            AppState.State = {
                dragItemProps: {
                    droppedElementType: layerType,
                    wallOrientation: this.state.wallOrientation
                }
            }
        }
    }

    render() {
        const { source } = this.state;
        let photo;
        let component;

        if (source.type === LayerType.STILLAGES) {
            if (this.state.stillageSize === StillageSize.NORMAL) {
                if (this.state.stillageOrientation === Orientation.HORIZONTAL) {
                    if (this.state.stillageCaption) {
                        photo = stillageBigHor;
                    } else {
                        photo = stillageBigHorTOP;
                    }
                } else {
                    if (this.state.stillageCaption) {
                        photo = stillageBigVertRight;
                    } else {
                        photo = stillageBigVertLeft;
                    }
                }
            } else {
                if (this.state.stillageOrientation === Orientation.HORIZONTAL) {
                    if (this.state.stillageCaption) {
                        photo = stillageSmallHor
                    } else {
                        photo = stillageSmallHorTOP;
                    }
                } else {
                    if (this.state.stillageCaption) {
                        photo = stillageSmallVertRight;
                    } else {
                        photo = stillageSmallVertLeft;
                    }
                }
            }

            component = (
                <div style={{}} className="comp-title" onClick={() => { this.onClickHandle(LayerType.STILLAGES) }} >
                    <div className="comp-item-title">
                        {source.title}
                    </div>
                    <div className="comp-item-photo">

                        <img onMouseDown={() => this.mouseDownHandle(LayerType.STILLAGES)} draggable style={{ width: '50%', height: '50%', borderRadius: '7px' }} src={photo} title={'Стеллаж'} alt="Стеллаж" />
                    </div>
                    <div className="comp-item-properties">
                        размер
                        <div className="comp-item-selector">
                            <button onClick={() => { this.setState({ ...this.state, ...{ stillageSize: StillageSize.NORMAL } }) }} className="left-button" style={{
                                color: this.state.stillageSize === StillageSize.NORMAL ? 'white' : 'black',
                                background: this.state.stillageSize === StillageSize.NORMAL ? '#00cc00' : 'white'
                            }}>большой</button>
                            <button onClick={() => { this.setState({ ...this.state, ...{ stillageSize: StillageSize.SMALL } }) }} className="right-button" style={{
                                color: this.state.stillageSize === StillageSize.SMALL ? 'white' : 'black',
                                background: this.state.stillageSize === StillageSize.SMALL ? '#00cc00' : 'white'
                            }}>маленький</button>
                        </div>
                        ориентация
                        <div className="comp-item-selector">
                            <button onClick={() => { this.setState({ ...this.state, ...{ stillageOrientation: Orientation.HORIZONTAL } }) }} className="left-button" style={{
                                color: this.state.stillageOrientation === Orientation.HORIZONTAL ? 'white' : 'black',
                                background: this.state.stillageOrientation === Orientation.HORIZONTAL ? '#00cc00' : 'white'
                            }}>горизонтальная</button>
                            <button onClick={() => { this.setState({ ...this.state, ...{ stillageOrientation: Orientation.VERTICAL } }) }} className="right-button" style={{
                                color: this.state.stillageOrientation === Orientation.VERTICAL ? 'white' : 'black',
                                background: this.state.stillageOrientation === Orientation.VERTICAL ? '#00cc00' : 'white'
                            }}>вертикальная</button>
                        </div>
                        нумерация
                        <div className="comp-item-selector">
                            <button onClick={() => { this.setState({ ...this.state, ...{ stillageCaption: false } }) }} className="left-button" style={{
                                color: !this.state.stillageCaption ? 'white' : 'black',
                                background: !this.state.stillageCaption ? '#00cc00' : 'white'
                            }}>{this.state.stillageOrientation === Orientation.HORIZONTAL ? 'сверху' : 'слева'}</button>
                            <button onClick={() => { this.setState({ ...this.state, ...{ stillageCaption: true } }) }} className="right-button" style={{
                                color: this.state.stillageCaption ? 'white' : 'black',
                                background: this.state.stillageCaption ? '#00cc00' : 'white'
                            }}>{this.state.stillageOrientation === Orientation.HORIZONTAL ? 'снизу' : 'справа'}</button>
                        </div>

                    </div>
                </div>

            );
        } else if (source.type === LayerType.WALLS) {
            component = (<div style={{}} className="comp-title" >
                <div onClick={() => { this.onClickHandle(LayerType.WALLS)}}
                     onMouseDown={() => this.mouseDownHandle(LayerType.WALLS)} className="comp-item-title">
                    {source.title}
                </div>
                    <div className="comp-item-properties">
                        ориентация
                        <div className="comp-item-selector">
                            <button onClick={() => { this.setState({ ...this.state, ...{ wallOrientation: Orientation.HORIZONTAL } }) }} className="left-button" style={{
                                color: this.state.wallOrientation === Orientation.HORIZONTAL ? 'white' : 'black',
                                background: this.state.wallOrientation === Orientation.HORIZONTAL ? '#00cc00' : 'white'
                            }}>горизонтальная</button>
                            <button onClick={() => { this.setState({ ...this.state, ...{ wallOrientation: Orientation.VERTICAL } }) }} className="right-button" style={{
                                color: this.state.wallOrientation === Orientation.VERTICAL ? 'white' : 'black',
                                background: this.state.wallOrientation === Orientation.VERTICAL ? '#00cc00' : 'white'
                            }}>вертикальная</button>
                        </div>


                    </div>
                </div>
            );
        }

        return component;
    }
}

export default MenuBarElement;