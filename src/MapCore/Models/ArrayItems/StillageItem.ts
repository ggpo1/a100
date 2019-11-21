import VikItem from '../VikItem';
import Orientation from '../Enums/Orientation';
import DeviationItem from './DeviationItem';

interface StillageItem {
    id?: number,
    title: string,
    x: number,
    y: number,
    orientation: Orientation,
    viks?: Array<VikItem>,
    deviations?: Array<DeviationItem>,
}

export default StillageItem;
