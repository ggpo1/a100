import VikItem from './VikItem';
import Orientation from './Enums/Orientation';
import DeviationItem from './DeviationItem';
import SignatureItem from './SignatureItem';

interface StillageItem {
    x: number,
    y: number,
    orientation: Orientation,
    viks: Array<VikItem>,
    deviations: Array<DeviationItem>,
    signatures: Array<SignatureItem>,
}

export default StillageItem;
