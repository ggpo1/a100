import VikItem from './../../ArrayItems/VikItem';
import Orientation from './../../Enums/Orientation';

interface IDefectProps {
    parentKey: string,
    parentX: number,
    parentY: number,
    parentOrientation: Orientation,
    source: VikItem,
    isBlockScaling: boolean,
    parentScale: number
}

export default IDefectProps;
