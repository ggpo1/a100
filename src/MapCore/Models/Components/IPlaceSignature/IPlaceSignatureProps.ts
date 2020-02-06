import Orientation from './../../Enums/Orientation';
import PlaceSignatureItem from './../../ArrayItems/PlaceSignatureItem';
import VikItem from './../../ArrayItems/VikItem';

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
}

export default IPlaceSignatureProps;
