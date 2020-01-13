import LayerType from "../../Enums/LayerType";
import StillageItem from "../../ArrayItems/StillageItem";

export default interface IAddCircleProps {
    source: any,
    mapStillages: Array<StillageItem>,
    parentType: LayerType,
}