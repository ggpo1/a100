import GlobalsatBang from '../../ArrayItems/GlobalsatBang';
import GlobalsatDeviation from '../../ArrayItems/GlobalsatDeviation';
import GlobalsatInfoType from './../../Enums/GlobalsatInfoType';
import StillageItem from './../../ArrayItems/StillageItem';

export default interface IGlobalsatInfoSource {
    parentKey: string
    type: GlobalsatInfoType,
    bangsList?: Array<GlobalsatBang>,
    deviationsList?: Array<GlobalsatDeviation>,
    stillagesList?: Array<StillageItem>
}