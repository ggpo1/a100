import VikItem from './VikItem';
import Orientation from '../Enums/Orientation';
import DeviationItem from './DeviationItem';
import SignatureItem from './SignatureItem';

interface ObjectItem {
    id?: number,
    x: number,
    y: number,
    width?: number,
    height?: number,
    photo: any,
    description?: string,
}

export default ObjectItem;
