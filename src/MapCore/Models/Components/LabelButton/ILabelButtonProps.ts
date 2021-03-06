import LabelButtonMode from "../../Enums/LabelButtonMode";
import WallItem from "../../ArrayItems/WallIem";
import StillageItem from "../../ArrayItems/StillageItem";

export default interface ILabelButtonProps {
    sourceKey: string,
    parentX: number,
    parentY: number,
    objectSource: WallItem,
    labelMode: LabelButtonMode,
}