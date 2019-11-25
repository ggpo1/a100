import VikItem from './../../ArrayItems/VikItem';
import Orientation from './../../Enums/Orientation';

interface IDefectState {
    parentX: number,
    parentY: number,
    parentOrientation: Orientation,
    source: VikItem,
}

export default IDefectState;
