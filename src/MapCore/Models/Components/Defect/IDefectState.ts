import VikItem from './../../ArrayItems/VikItem';
import Orientation from './../../Enums/Orientation';
import StillageItem from "../../ArrayItems/StillageItem";

interface IDefectState {
    parentKey: string,
    parentX: number,
    parentY: number,
    parentOrientation: Orientation,
    source: VikItem,
    isBlockScaling: boolean,
    parentScale: number,
    parentSource: StillageItem
}

export default IDefectState;
