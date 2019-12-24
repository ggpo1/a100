import sort from 'fast-sort';
import bs from 'js-binary-search';

import StillageSizeReducer from "../Models/Enums/StillageSize/StillageSizeReducer";
import MapStillageType from "../Models/Enums/MapStillageType";
import Orientation from "../Models/Enums/Orientation";
import SignaturePosition from "../Models/Enums/SignaturePosition";
import StillageSize from "../Models/Enums/StillageSize/StillageSize";
import StillageItem from "../Models/ArrayItems/StillageItem";
import MapSourceLayer from "../Models/MapSourceLayer";

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