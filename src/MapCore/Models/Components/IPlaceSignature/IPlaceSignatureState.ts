import Orientation from './../../Enums/Orientation';
import PlaceSignatureItem from './../../ArrayItems/PlaceSignatureItem';
import VikItem from './../../ArrayItems/VikItem';

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
}

export default IPlaceSignatureState;
