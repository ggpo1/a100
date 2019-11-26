import Orientation from './../../Enums/Orientation';
import StillageSize from './../../Enums/StillageSize/StillageSize';
import SignatureItem from './../../ArrayItems/SignatureItem';

interface ISignatureState {
    parentX: number, 
    parentY: number,
    parentOrientation: Orientation,
    parentSize: StillageSize,
    source: SignatureItem,
}

export default ISignatureState;
