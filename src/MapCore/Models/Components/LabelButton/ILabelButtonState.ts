import WallItem from "../../ArrayItems/WallIem";
import StillageItem from "../../ArrayItems/StillageItem";
import LabelButtonMode from "../../Enums/LabelButtonMode";

export default interface ILabelButtonState {
    sourceKey: string,
    parentX: number,
    parentY: number,
    objectSource: WallItem,
    labelMode: LabelButtonMode,
}