import GlobalsatDeviation from "../../ArrayItems/GlobalsatDeviation";
import StillageItem from "../../ArrayItems/StillageItem";

export default interface IGlobalsatDeviationState {
    parentKey: string,
    source: GlobalsatDeviation,
    stillages: Array<StillageItem>
    needStillages: { LOW?: StillageItem, HIGH?: StillageItem },
    isInfoRect: boolean,
    deviations: Array<GlobalsatDeviation>
}