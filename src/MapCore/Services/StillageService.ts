import MapStillageType from "../Models/Enums/MapStillageType";
import Orientation from "../Models/Enums/Orientation";
import SignaturePosition from "../Models/Enums/SignaturePosition";
import StillageSize from "../Models/Enums/StillageSize/StillageSize";
import StillageItem from "../Models/ArrayItems/StillageItem";
import MapSourceUnit from "../Models/MapSourceUnit";
import MapSourceLayer from "../Models/MapSourceLayer";

export default class StillageService {

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

    public getStillageSourceItem(selectedLayer: MapSourceLayer, coords: { x: number, y: number }, type: MapStillageType) {
        let _id = -50; let _key = '';
        for (const el of selectedLayer.stillages!) {
            if (el.id > _id) {
                _id = el.id;
            }
        }
        _id++;
        _key = selectedLayer.key + '_stillage_' + _id.toString();
        this.maxBinarySearch(selectedLayer.stillages!);
        switch (type) {
            case MapStillageType.NORMAL_BOTTOM: {
                return {
                    id: _id,
                    key: _key,
                    x: coords.x,
                    y: coords.y,
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

    public maxBinarySearch(list: Array<StillageItem>) {
        let start = 0;
        let end = list.length - 1;
        let max = -50;

        while (start <= end ) {
            let mid = Math.floor((start + end) / 2);
            if (list[mid].id > max) {
                end = mid - 1;
                max = list[mid].id;
            } else {
                start = mid + 1;
            }
        }
        console.error('BINARY MAX: ' + max);
        return max;
    }

}