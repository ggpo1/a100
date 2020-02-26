import Orientation from './../../Enums/Orientation';
import PlaceSignatureItem from './../../ArrayItems/PlaceSignatureItem';
import VikItem from './../../ArrayItems/VikItem';
import StillageItem from "../../ArrayItems/StillageItem";

interface IPlaceSignatureProps {
    parentPlaceSignatures: Array<PlaceSignatureItem>,
    parentScale: number,
    parentKey: string,
    parentX: number,
    parentY: number,
    parentOrientation: Orientation,
    parentDefects: Array<VikItem>,
    source: PlaceSignatureItem,
    pmCount: number,
    isBlockScaling: boolean,
    parentSource: StillageItem
}

export default IPlaceSignatureProps;
