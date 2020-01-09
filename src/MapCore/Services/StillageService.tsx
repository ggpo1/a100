import sort from 'fast-sort';
import bs from 'js-binary-search';

import StillageSizeReducer from "../Models/Enums/StillageSize/StillageSizeReducer";
import MapStillageType from "../Models/Enums/MapStillageType";
import Orientation from "../Models/Enums/Orientation";
import SignaturePosition from "../Models/Enums/SignaturePosition";
import StillageSize from "../Models/Enums/StillageSize/StillageSize";
import StillageItem from "../Models/ArrayItems/StillageItem";
import MapSourceLayer from "../Models/MapSourceLayer";
import {Arrow} from "react-konva";
import React from "react";
import Emit from "../Data/Emit";
import Vectors from "../Models/Enums/Vectors";
import LayerType from "../Models/Enums/LayerType";

export default class StillageService {

    public stillageSizeReducer!: StillageSizeReducer;

    public smallPlaceSignatures = [
        {
            place: 1,
            title: '1',
        },
        {
            place: 2,
            title: '2',
        },
    ];

    public bigPlaceSignatures = [
        {
            place: 1,
            title: '1',
        },
        {
            place: 2,
            title: '2',
        },
        {
            place: 3,
            title: '3',
        },
    ];

    constructor() {
        this.stillageSizeReducer = new StillageSizeReducer();
    }

    public getStillageArrows(source: StillageItem): Array<JSX.Element> {
        let arrows: Array<JSX.Element> = [];
        if (source.orientation === Orientation.HORIZONTAL) {
            if (source.signature!.position === SignaturePosition.TOP) {
                return [
                    (
                        <Arrow
                            key={source.key + '_left_arrow'}
                            x={source.x - 30}
                            y={source.y + 5}
                            points={[0, 0, 0, 0]}
                            pointerLength={-20}
                            pointerWidth={-40}
                            fill={'#E0E0E0'}
                            stroke={'#2f00ff'}
                            strokeWidth={0.5}

                            onClick={() => Emit.Emitter.emit('moveShapeByStep', source, LayerType.STILLAGES, Vectors.LEFT)}
                        />
                    ),
                    (
                        <Arrow
                            key={source.key + '_right_arrow'}
                            x={source.x + 105}
                            y={source.y + 5}
                            points={[0, 0, 0, 0]}
                            pointerLength={20}
                            pointerWidth={40}
                            fill={'#E0E0E0'}
                            stroke={'#2f00ff'}
                            strokeWidth={0.5}

                            onClick={() => Emit.Emitter.emit('moveShapeByStep', source, LayerType.STILLAGES, Vectors.RIGHT)}
                        />
                    ),
                    (
                        <Arrow
                            key={source.key + '_top_arrow'}
                            x={source.x + 47}
                            y={source.y - 27}
                            points={[-10, -10, -10, -20]}
                            pointerLength={20}
                            pointerWidth={40}
                            fill={'#E0E0E0'}
                            stroke={'#2f00ff'}
                            strokeWidth={0.5}
                            // onMouseDown={() => Emit.Emitter.emit('moveShapeByStep', source, LayerType.STILLAGES, Vectors.TOP)}
                            onClick={() => Emit.Emitter.emit('moveShapeByStep', source, LayerType.STILLAGES, Vectors.TOP)}ё
                        />
                    ),
                    (
                        <Arrow
                            key={source.key + '_bottom_arrow'}
                            x={source.x + 38}
                            y={source.y + 57}
                            points={[0, -10, 0, 0]}
                            pointerLength={20}
                            pointerWidth={40}
                            fill={'#E0E0E0'}
                            stroke={'#2f00ff'}
                            strokeWidth={0.5}

                            onClick={() => Emit.Emitter.emit('moveShapeByStep', source, LayerType.STILLAGES, Vectors.BOTTOM)}
                        />
                    )
                ];
            } else if (source.signature!.position === SignaturePosition.BOTTOM) {
                return [
                    (
                        <Arrow
                            key={source.key + '_left_arrow'}
                            x={source.x - 30}
                            y={source.y + 20}
                            points={[0, 0, 0, 0]}
                            pointerLength={-20}
                            pointerWidth={-40}
                            fill={'#E0E0E0'}
                            stroke={'#2f00ff'}
                            strokeWidth={0.5}

                            onClick={() => Emit.Emitter.emit('moveShapeByStep', source, LayerType.STILLAGES, Vectors.LEFT)}
                        />
                    ),
                    (
                        <Arrow
                            key={source.key + '_right_arrow'}
                            x={source.x + 105}
                            y={source.y + 20}
                            points={[0, 0, 0, 0]}
                            pointerLength={20}
                            pointerWidth={40}
                            fill={'#E0E0E0'}
                            stroke={'#2f00ff'}
                            strokeWidth={0.5}

                            onClick={() => Emit.Emitter.emit('moveShapeByStep', source, LayerType.STILLAGES, Vectors.RIGHT)}
                        />
                    ),
                    (
                        <Arrow
                            key={source.key + '_top_arrow'}
                            x={source.x + 47}
                            y={source.y - 10}
                            points={[-10, -10, -10, -20]}
                            pointerLength={20}
                            pointerWidth={40}
                            fill={'#E0E0E0'}
                            stroke={'#2f00ff'}
                            strokeWidth={0.5}

                            onClick={() => Emit.Emitter.emit('moveShapeByStep', source, LayerType.STILLAGES, Vectors.TOP)}
                        />
                    ),
                    (
                        <Arrow
                            key={source.key + '_bottom_arrow'}
                            x={source.x + 38}
                            y={source.y + 70}
                            points={[0, -10, 0, 0]}
                            pointerLength={20}
                            pointerWidth={40}
                            fill={'#E0E0E0'}
                            stroke={'#2f00ff'}
                            strokeWidth={0.5}

                            onClick={() => Emit.Emitter.emit('moveShapeByStep', source, LayerType.STILLAGES, Vectors.BOTTOM)}
                        />
                    )
                ];
            }
        } else {
            if (source.signature!.position === SignaturePosition.LEFT) {
                return [
                    (
                        <Arrow
                            key={source.key + '_left_arrow'}
                            x={source.x - 50}
                            y={source.y + 35}
                            points={[0, 0, 0, 0]}
                            pointerLength={-20}
                            pointerWidth={-40}
                            fill={'#E0E0E0'}
                            stroke={'#2f00ff'}
                            strokeWidth={0.5}

                            onClick={() => Emit.Emitter.emit('moveShapeByStep', source, LayerType.STILLAGES, Vectors.LEFT)}
                        />
                    ),
                    (
                        <Arrow
                            key={source.key + '_right_arrow'}
                            x={source.x + 60}
                            y={source.y + 35}
                            points={[0, 0, 0, 0]}
                            pointerLength={20}
                            pointerWidth={40}
                            fill={'#E0E0E0'}
                            stroke={'#2f00ff'}
                            strokeWidth={0.5}

                            onClick={() => Emit.Emitter.emit('moveShapeByStep', source, LayerType.STILLAGES, Vectors.RIGHT)}
                        />
                    ),
                    (
                        <Arrow
                            key={source.key + '_top_arrow'}
                            x={source.x + 15}
                            y={source.y - 10}
                            points={[-10, -10, -10, -20]}
                            pointerLength={20}
                            pointerWidth={40}
                            fill={'#E0E0E0'}
                            stroke={'#2f00ff'}
                            strokeWidth={0.5}

                            onClick={() => Emit.Emitter.emit('moveShapeByStep', source, LayerType.STILLAGES, Vectors.TOP)}
                        />
                    ),
                    (
                        <Arrow
                            key={source.key + '_bottom_arrow'}
                            x={source.x + 7}
                            y={source.y + 105}
                            points={[0, -10, 0, 0]}
                            pointerLength={20}
                            pointerWidth={40}
                            fill={'#E0E0E0'}
                            stroke={'#2f00ff'}
                            strokeWidth={0.5}

                            onClick={() => Emit.Emitter.emit('moveShapeByStep', source, LayerType.STILLAGES, Vectors.BOTTOM)}
                        />
                    )
                ];
            } else if (source.signature!.position === SignaturePosition.RIGHT) {
                return [
                    (
                        <Arrow
                            key={source.key + '_left_arrow'}
                            x={source.x - 35}
                            y={source.y + 35}
                            points={[0, 0, 0, 0]}
                            pointerLength={-20}
                            pointerWidth={-40}
                            fill={'#E0E0E0'}
                            stroke={'#2f00ff'}
                            strokeWidth={0.5}

                            onClick={() => Emit.Emitter.emit('moveShapeByStep', source, LayerType.STILLAGES, Vectors.LEFT)}
                        />
                    ),
                    (
                        <Arrow
                            key={source.key + '_right_arrow'}
                            x={source.x + 75}
                            y={source.y + 35}
                            points={[0, 0, 0, 0]}
                            pointerLength={20}
                            pointerWidth={40}
                            fill={'#E0E0E0'}
                            stroke={'#2f00ff'}
                            strokeWidth={0.5}

                            onClick={() => Emit.Emitter.emit('moveShapeByStep', source, LayerType.STILLAGES, Vectors.RIGHT)}
                        />
                    ),
                    (
                        <Arrow
                            key={source.key + '_top_arrow'}
                            x={source.x + 27}
                            y={source.y - 10}
                            points={[-10, -10, -10, -20]}
                            pointerLength={20}
                            pointerWidth={40}
                            fill={'#E0E0E0'}
                            stroke={'#2f00ff'}
                            strokeWidth={0.5}

                            onClick={() => Emit.Emitter.emit('moveShapeByStep', source, LayerType.STILLAGES, Vectors.TOP)}
                        />
                    ),
                    (
                        <Arrow
                            key={source.key + '_bottom_arrow'}
                            x={source.x + 20}
                            y={source.y + 105}
                            points={[0, -10, 0, 0]}
                            pointerLength={20}
                            pointerWidth={40}
                            fill={'#E0E0E0'}
                            stroke={'#2f00ff'}
                            strokeWidth={0.5}

                            onClick={() => Emit.Emitter.emit('moveShapeByStep', source, LayerType.STILLAGES, Vectors.BOTTOM)}
                        />
                    )
                ];
            }
        }
        return [];
    }

    public getStillageSourceItem(selectedLayer: MapSourceLayer, coords: { x: number, y: number }, type: MapStillageType) {
        let _id = 0; let _key = '';
        sort(selectedLayer.stillages!).asc(e => e.id);
        if (selectedLayer.stillages!.length !== 0) {
            _id = selectedLayer.stillages![selectedLayer.stillages!.length - 1].id;
        }
        _id++;
        _key = selectedLayer.key + '_stillage_' + _id.toString();
        switch (type) {
            case MapStillageType.NORMAL_BOTTOM: {
                return {
                    id: _id,
                    key: _key,
                    x: coords.x,
                    y: coords.y,
                    width: 76,
                    height: 49.5,
                    orientation: Orientation.HORIZONTAL,
                    signature: {
                        title: '1',
                        position: SignaturePosition.BOTTOM,
                    },
                    size: StillageSize.NORMAL,
                    placeSignatures: this.bigPlaceSignatures,
                    viks: []
                };
            }
            case MapStillageType.NORMAL_TOP: {
                return {
                    id: _id,
                    key: _key,
                    x: coords.x,
                    y: coords.y,
                    width: 76,
                    height: 49.5,
                    orientation: Orientation.HORIZONTAL,
                    signature: {
                        title: '1',
                        position: SignaturePosition.TOP,
                    },
                    size: StillageSize.NORMAL,
                    placeSignatures: this.bigPlaceSignatures,
                    viks: []
                };
            }
            case MapStillageType.NORMAL_LEFT_VERT: {
                return {
                    id: _id,
                    key: _key,
                    x: coords.x,
                    y: coords.y,
                    width: 49.5,
                    height: 76,
                    orientation: Orientation.VERTICAL,
                    signature: {
                        title: '1',
                        position: SignaturePosition.LEFT,
                    },
                    size: StillageSize.NORMAL,
                    placeSignatures: this.bigPlaceSignatures,
                    viks: []
                };
            }
            case MapStillageType.NORMAL_RIGHT_VERT: {
                return {
                    id: _id,
                    key: _key,
                    x: coords.x,
                    y: coords.y,
                    width: 49.5,
                    height: 76,
                    orientation: Orientation.VERTICAL,
                    signature: {
                        title: '1',
                        position: SignaturePosition.RIGHT,
                    },
                    size: StillageSize.NORMAL,
                    placeSignatures: this.bigPlaceSignatures,
                    viks: []
                };
            }
            case MapStillageType.SMALL_BOTTOM: {
                return {
                    id: _id,
                    key: _key,
                    x: coords.x,
                    y: coords.y,
                    width: 50,
                    height: 49.5,
                    orientation: Orientation.HORIZONTAL,
                    signature: {
                        title: '1',
                        position: SignaturePosition.BOTTOM,
                    },
                    size: StillageSize.SMALL,
                    placeSignatures: this.smallPlaceSignatures,
                    viks: []
                };
            }
            case MapStillageType.SMALL_TOP: {
                return {
                    id: _id,
                    key: _key,
                    x: coords.x,
                    y: coords.y,
                    width: 50,
                    height: 49.5,
                    orientation: Orientation.HORIZONTAL,
                    signature: {
                        title: '1',
                        position: SignaturePosition.TOP,
                    },
                    size: StillageSize.SMALL,
                    placeSignatures: this.smallPlaceSignatures,
                    viks: []
                };
            }
            case MapStillageType.SMALL_LEFT_VERT: {
                return {
                    id: _id,
                    key: _key,
                    x: coords.x,
                    y: coords.y,
                    width: 49.5,
                    height: 50,
                    orientation: Orientation.VERTICAL,
                    signature: {
                        title: '1',
                        position: SignaturePosition.LEFT,
                    },
                    size: StillageSize.SMALL,
                    placeSignatures: this.smallPlaceSignatures,
                    viks: []
                };
            }
            case MapStillageType.SMALL_RIGHT_VERT: {
                return {
                    id: _id,
                    key: _key,
                    x: coords.x,
                    y: coords.y,
                    width: 49.5,
                    height: 50,
                    orientation: Orientation.VERTICAL,
                    signature: {
                        title: '1',
                        position: SignaturePosition.RIGHT,
                    },
                    size: StillageSize.SMALL,
                    placeSignatures: this.smallPlaceSignatures,
                    viks: []
                };
            }
        }
    }

    public stillageSearchByID(stillagesList: Array<StillageItem>, id: number) {
        return bs.search_in_associative(stillagesList, 'id', id);
    }

    // public getStillageSize() {
    //     let width, height = 0;
    //     if (this.props.source.orientation === Orientation.HORIZONTAL) {
    //         if (this.props.source.size === StillageSize.NORMAL) {
    //             width = 76;
    //             height = 49.5;
    //         } else {
    //             width = 50;
    //             height = 49.5;
    //         }
    //     } else {
    //         if (this.props.source.size === StillageSize.NORMAL) {
    //             width = 49.5;
    //             height = 76;
    //         } else {
    //             width = 49.5;
    //             height = 50;
    //         }
    //     }
    // }

}