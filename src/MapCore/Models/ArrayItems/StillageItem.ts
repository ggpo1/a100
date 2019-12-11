import VikItem from './VikItem';
import Orientation from '../Enums/Orientation';
import DeviationItem from './DeviationItem';
import StillageSize from '../Enums/StillageSize/StillageSize';
import PlaceSignatureItem from './PlaceSignatureItem';
import SignatureItem from './SignatureItem';

interface StillageItem {
    id: number,
    key: string,
    x: number,
    y: number,
    size: StillageSize,
    orientation: Orientation,
    viks?: Array<VikItem>,
    deviations?: Array<DeviationItem>,
    placeSignatures?: Array<PlaceSignatureItem>,
    signature?: SignatureItem,
}

export default StillageItem;
