import Orientation from './../../Enums/Orientation';
import StillageSize from './../../Enums/StillageSize/StillageSize';
import SignatureItem from './../../ArrayItems/SignatureItem';

interface ISignatureProps {
    parentX: number, 
    parentY: number,
    parentOrientation: Orientation,
    parentSize: StillageSize,
    source: SignatureItem,
}

export default ISignatureProps;