import GlobalsatDeviation from "../../ArrayItems/GlobalsatDeviation";
import StillageItem from "../../ArrayItems/StillageItem";

export default interface IGlobalsatDeviationProps {
    parentKey: string,
    source: GlobalsatDeviation,
    stillages: Array<StillageItem>,
    deviations: Array<GlobalsatDeviation>
}