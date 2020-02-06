import Orientation from './../../Enums/Orientation';
import StillageSize from './../../Enums/StillageSize/StillageSize';
import SignatureItem from './../../ArrayItems/SignatureItem';

interface ISignatureState {
    pmCount: number,
    parentKey: string,
    parentX: number, 
    parentY: number,
    parentOrientation: Orientation,
    parentSize: StillageSize,
    source: SignatureItem,
    parentScale: number,
    isBlockScaling: boolean,
}

export default ISignatureState;
