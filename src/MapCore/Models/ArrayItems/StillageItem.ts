import VikItem from './VikItem';
import Orientation from '../Enums/Orientation';
import DeviationItem from './DeviationItem';
import StillageSize from '../Enums/StillageSize/StillageSize';

interface StillageItem {
    id?: number,
    title: string,
    x: number,
    y: number,
    size: StillageSize,
    orientation: Orientation,
    viks?: Array<VikItem>,
    deviations?: Array<DeviationItem>,
    places?: Array<any> // text for places
}

export default StillageItem;
