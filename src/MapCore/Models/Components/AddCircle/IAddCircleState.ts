import LayerType from "../../Enums/LayerType";
import StillageItem from "../../ArrayItems/StillageItem";

export default interface IAddCircleState {
    source: any,
    mapStillages: Array<StillageItem>,
    parentType: LayerType,
}