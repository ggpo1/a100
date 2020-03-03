import Orientation from './../../Enums/Orientation';
import PlaceSignatureItem from './../../ArrayItems/PlaceSignatureItem';
import VikItem from './../../ArrayItems/VikItem';
import StillageItem from "../../ArrayItems/StillageItem";

interface IPlaceSignatureState {
    parentPlaceSignatures: Array<PlaceSignatureItem>,
    parentScale: number,
    pmCount: number,
    parentKey: string,
    parentX: number,
    parentY: number,
    parentOrientation: Orientation,
    parentDefects: Array<VikItem>,
    source: PlaceSignatureItem,
    isBlockScaling: boolean,
    parentSource: StillageItem,
    textElement: JSX.Element
}

export default IPlaceSignatureState;
