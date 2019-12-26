import Orientation from './../../Enums/Orientation';
import PlaceSignatureItem from './../../ArrayItems/PlaceSignatureItem';
import VikItem from './../../ArrayItems/VikItem';

interface IPlaceSignatureProps {
    parentKey: string,
    parentX: number,
    parentY: number,
    parentOrientation: Orientation,
    parentDefects: Array<VikItem>,
    source: PlaceSignatureItem,
}

export default IPlaceSignatureProps;
