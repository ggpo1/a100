import LayerType from "../Enums/LayerType";
import MapStillageType from "../Enums/MapStillageType";
import Orientation from "../Enums/Orientation";

export default interface ElementItem {
    key?: string,
    title?: string,
    stillageType?: MapStillageType,
    type?: LayerType,
    photo: any,
    orientation?: Orientation,
}