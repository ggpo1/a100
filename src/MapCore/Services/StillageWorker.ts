import MapStillageType from "../Models/Enums/MapStillageType";
import Orientation from "../Models/Enums/Orientation";
import SignaturePosition from "../Models/Enums/SignaturePosition";
import StillageSize from "../Models/Enums/StillageSize/StillageSize";

export default class StillageWorker {

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

    public getStillageSourceItem(coords: { x: number, y: number }, type: MapStillageType) {
        switch (type) {
            case MapStillageType.NORMAL_BOTTOM: {
                return {
                    title: '',
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
                    title: '',
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
                    title: '',
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
                    title: '',
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
                    title: '',
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
                    title: '',
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
                    title: '',
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
                    title: '',
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
}